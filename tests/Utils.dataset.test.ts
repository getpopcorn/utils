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

  const input = JSON.parse(JSON.stringify(validDatasetInput));
  delete input.appointment.priority;

  const { success } = new Utils().inputMatchesDatasetConfig(validDatasetInput, validDatasetConfig);

  expect(success).toBe(expected);
});

test('It should return a Dataset payload (create/update) from a valid input and Dataset configuration', () => {
  const expected = [
    { headerRef: 'j2d8y22d', value: 'Sam Person' },
    { headerRef: 'kjhf298y', value: '10:00' },
    { headerRef: 'f2oifh9q', value: 'Central' },
    { headerRef: 'fb1891g2', value: 2 },
    { headerRef: 'mbhwf8ax', value: 46 }
  ];

  const result = new Utils().inputToDatasetPayload(validDatasetInput, validDatasetConfig);

  expect(result).toMatchObject(expected);
});

test('It should not handle incomplete configs', () => {
  const expected = [{ headerRef: 'kjhf298y', value: '10:00' }];

  const config = [
    {
      headerRef: 'j2d8y22d'
    },
    {
      headerRef: 'kjhf298y',
      headerType: 'short_text',
      value: '{input.appointment.time}',
      isRequired: true
    }
  ];

  const result = new Utils().inputToDatasetPayload(validDatasetInput, config);

  expect(result).toMatchObject(expected);
});

test('It should handle non-existing keys', () => {
  const expected = [{ headerRef: 'kjhf298y', value: '__KEY_NOT_FOUND__' }];

  const config = [
    {
      headerRef: 'kjhf298y',
      headerType: 'short_text',
      value: '{input.a.b.c.xyz}',
      isRequired: true
    }
  ];

  const result = new Utils().inputToDatasetPayload(validDatasetInput, config);

  expect(result).toMatchObject(expected);
});

/**
 * NEGATIVE TESTS
 */
test('It should return false for an input that does not match a Dataset configuration', () => {
  const expected = false;

  const input = JSON.parse(JSON.stringify(validDatasetInput));
  delete input.name;

  const { success } = new Utils().inputMatchesDatasetConfig(input, validDatasetConfig);

  expect(success).toBe(expected);
});

test('It should return false for an input that does not have correct header types for a Dataset configuration', () => {
  const expected = false;

  const input = JSON.parse(JSON.stringify(validDatasetInput));
  input.appointment.priority = '2';

  const { success } = new Utils().inputMatchesDatasetConfig(input, validDatasetConfig);

  expect(success).toBe(expected);
});
