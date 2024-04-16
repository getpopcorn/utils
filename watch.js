import fs from 'fs';
import { exec } from 'child_process';
import { dirname, join } from 'path';

function runTests(fileName) {
  exec(
    `c8 -reporter=lcov node --loader ts-node/esm --test ./tests/*${fileName}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      if (stdout) console.log(`stdout: ${stdout}`);
      if (stderr) console.error(`stderr: ${stderr}`);
    }
  );
}

function watchDirectory(directoryPath) {
  fs.watch(directoryPath, { recursive: true }, (eventType, fileName) => {
    if (fileName) {
      console.log(`File changed: ${fileName}, Change type: ${eventType}`);
      runTests(fileName);
    }
  });
}

const testsDir = join(dirname(import.meta.url).slice(7), 'tests');

console.log(`Watching for file changes in ${testsDir}`);
watchDirectory(testsDir);
