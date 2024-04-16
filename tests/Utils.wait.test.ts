import { test } from 'node:test';
import assert from 'node:assert';

import { Utils } from '../src/index.js';

/**
 * POSITIVE TESTS
 */
test('It should wait using a provided value', async () => {
  const expected = 1.4;

  const timeStart = Date.now();
  await new Utils().sleep(expected);
  const timeEnd = Date.now();

  const result = roundedResult(timeStart, timeEnd);

  assert.strictEqual(result, expected);
});

const roundedResult = (timeStart: number, timeEnd: number) =>
  parseFloat((Math.round(timeEnd - timeStart) / 1000).toFixed(1));
