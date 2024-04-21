import { readdirSync, watch } from 'fs';
import { dirname, join } from 'path';
import { exec } from 'child_process';

const testsDir = join(dirname(import.meta.url).slice(7), 'tests');
const isWatchMode = process.argv[2];

function runTest(fileName) {
  const c8Options = `npx c8 --report=false --clean=false`;
  return new Promise((resolve, reject) => {
    exec(
      `NODE_ENV=test ${c8Options} node --loader ts-node/esm --test "${fileName}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(stdout);
          console.error(error);
          return;
        }

        if (isWatchMode) console.log(stdout);
        if (stderr) console.error(stderr);
        resolve();
      }
    );
  });
}

function report() {
  exec(`npx c8 -reporter=lcov report`, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  });
}

async function watchDirectory(directoryPath) {
  console.log(`Watching for file changes in ${testsDir}`);

  watch(directoryPath, { recursive: true }, async (eventType, fileName) => {
    if (fileName) {
      console.log(`File changed: ${fileName}`);
      await runTest(`./tests/${fileName}`);
    }
  });
}

function findTestFiles(directory) {
  const testFilesPattern = new RegExp(/(.*).test.(js|ts)/gi);
  const fileList = [];

  function recurse(currentPath) {
    const entries = readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentPath, entry.name);
      if (entry.isDirectory()) recurse(fullPath);
      else if (entry.isFile() && fullPath.match(testFilesPattern))
        fileList.push(fullPath.replace(process.cwd(), ''));
    }
  }

  recurse(directory);

  return fileList;
}

async function main() {
  try {
    if (isWatchMode) await watchDirectory(testsDir);
    else {
      const files = findTestFiles(testsDir);
      Promise.all(files.map((fileName) => runTest(`.${fileName}`)))
        .then(() => report())
        .catch((error) => {
          console.error('Error running tests:', error);
          report();
        });
    }
  } catch (error) {
    console.error(error);
  }
}

main();
