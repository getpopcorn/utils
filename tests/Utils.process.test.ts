import { test, expect } from 'vitest';

import { Utils } from '../src/index.js';

/**
 * POSITIVE TESTS
 */

test('It should add and run a set of functions from the process queue', async () => {
  const expected = [false];

  const processFunction1 = () => true;
  const processFunction2 = () => false;

  const result = await new Utils().runProcess({
    startInput: '',
    queue: [
      { fn: processFunction1, input: '' },
      { fn: processFunction2, input: '' }
    ],
    repeats: false,
    count: undefined
  });

  expect(result).toMatchObject(expected);
});

test('It should add and run a set of functions from the process queue, using the count style', async () => {
  const expected = [true, true, true, true, true];

  const processFunction1 = () => true;

  const result = await new Utils().runProcess({
    startInput: '',
    queue: [{ fn: processFunction1, input: '' }],
    repeats: true,
    count: 5
  });
  expect(result).toMatchObject(expected);
});
