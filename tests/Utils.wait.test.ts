import test from 'ava';

import { Utils } from '../src';

/**
 * POSITIVE TESTS
 */
test('It should wait using a provided value', async (t) => {
  const expected = 1.4;

  const timeStart = Date.now();
  await new Utils().sleep(expected);
  const timeEnd = Date.now();

  const result = roundedResult(timeStart, timeEnd);

  t.is(result, expected);
});

const roundedResult = (timeStart: number, timeEnd: number) =>
  parseFloat((Math.round(timeEnd - timeStart) / 1000).toFixed(1));
