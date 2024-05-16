import { test, expect } from 'vitest';

import { Utils } from '../src/index.js';

import { validDatasetInput, validDatasetConfig } from '../testdata/dataset.js';

/**
 * POSITIVE TESTS
 */
test('It should return true for an input that matches a Dataset configuration', () => {
  const expected = true;

  const { success } = new Utils().inputMatchesDatasetConfig(validDatasetInput, validDatasetConfig);

  expect(success).toBe(expected);
});

test('It should return true for an input that is missing optional properties, but otherwise matches a Dataset configuration', () => {
  const expected = true;

  let input = JSON.parse(JSON.stringify(validDatasetInput));
  input = input.splice(0, input.length - 1);

  const { success } = new Utils().inputMatchesDatasetConfig(input, validDatasetConfig);

  expect(success).toBe(expected);
});

/**
 * NEGATIVE TESTS
 */
test('It should return false for an input that is missing required properties', () => {
  const expected = false;

  let input = JSON.parse(JSON.stringify(validDatasetInput));
  input = input.splice(0, input.length - 2);

  const { success } = new Utils().inputMatchesDatasetConfig(input, validDatasetConfig);

  expect(success).toBe(expected);
});
