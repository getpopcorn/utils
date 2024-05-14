import { test, expect } from 'vitest';

import { DatasetRequests } from '../src/DatasetRequests.js';

import { datasetGetResponse } from '../testdata/dataset.js';

const datasetApiBaseUrl = 'https://www.mockachino.com/6e5778ca-638a-4c';
const datasetId = 'asdf1234';
const id = 'abc123';
const input = {
  something: 'my value here'
};
const properties = [
  {
    headerRef: 'abc123',
    headerType: 'short_text',
    value: '{input.something}',
    isRequired: true
  }
];

/**
 * POSITIVE TESTS
 */
test('It should make a Dataset create request', async () => {
  const expected = true;

  const result = await new DatasetRequests().create({
    datasetApiBaseUrl,
    datasetId,
    id,
    input,
    properties
  });

  expect(result).toBe(expected);
});

test('It should make a Dataset create request for a specific ID', async () => {
  const expected = true;

  const result = await new DatasetRequests().create({
    datasetApiBaseUrl,
    datasetId,
    id: '',
    input,
    properties
  });

  expect(result).toBe(expected);
});

test('It should make a Dataset update request', async () => {
  const expected = true;

  const result = await new DatasetRequests().update({
    datasetApiBaseUrl,
    datasetId,
    id,
    input,
    properties
  });

  expect(result).toBe(expected);
});

test('It should make a Dataset delete request', async () => {
  const expected = true;

  const result = await new DatasetRequests().delete({
    datasetApiBaseUrl,
    datasetId,
    id
  });

  expect(result).toBe(expected);
});

test('It should make a Dataset get request', async () => {
  const result = await new DatasetRequests().get({
    datasetApiBaseUrl,
    datasetId
  });

  expect(result).toMatchObject(datasetGetResponse);
});

/**
 * NEGATIVE TESTS
 */
test('It should not make a Dataset create request if the input does not match the configuration', async () => {
  const expected = { success: false, errors: ['Missing value for "{input.something}"'] };

  const result = await new DatasetRequests().create({
    datasetApiBaseUrl,
    datasetId,
    id,
    input: { x: 1 },
    properties
  });

  expect(result).toMatchObject(expected);
});

test('It should not make a Dataset update request if the input does not match the configuration', async () => {
  const expected = { success: false, errors: ['Missing value for "{input.something}"'] };

  const result = await new DatasetRequests().update({
    datasetApiBaseUrl,
    datasetId,
    id,
    input: { x: 1 },
    properties
  });

  expect(result).toMatchObject(expected);
});
