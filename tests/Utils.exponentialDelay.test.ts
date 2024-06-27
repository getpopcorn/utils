import { test, expect } from 'vitest';
import { Utils } from '../src/Utils.js';

const utils = new Utils();

test('It should run an exponentially delayed loop', async () => {
  const results = [];

  const baseDelay = 20;

  for (let index = 1; index <= 5; index++) {
    const timeStart = Date.now();
    await utils.exponentialDelay(index, baseDelay);
    const timeEnd = Date.now();

    const result = timeEnd - timeStart;
    results.push(result);
  }

  expect(checkIfInRange(results, baseDelay).every((result) => result === true)).toBe(true);
});

// Checks if a number is in range to account for jitter or other fluctuations
const checkIfInRange = (results: number[], baseDelay: number) =>
  results.map((result, index) => {
    const expected = Math.pow(2, index + 1) * baseDelay;
    return result >= Math.floor(expected * 0.9) && result <= Math.floor(expected * 1.1);
  });
