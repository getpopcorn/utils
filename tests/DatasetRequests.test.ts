import { test, expect } from 'vitest';

import { DatasetRequests } from '../src/DatasetRequests.js';

import {
  datasetGetResponse,
  validDatasetInput,
  validDatasetHeaders,
  validDatasetConfig
} from '../testdata/dataset.js';

const datasetApiBaseUrl = 'https://www.mockachino.com/6e5778ca-638a-4c';
const datasetId = 'asdf1234';
const id = 'item123';

const refinedInput = [{ headerRef: 'abc123', value: 'something' }];

/**
 * POSITIVE TESTS
 */
test('It should make a Dataset create request', async () => {
  const expected = {
    message: 'OK'
  };

  const result = await new DatasetRequests().create({
    datasetApiBaseUrl,
    datasetId,
    id,
    input: validDatasetInput,
    headers: validDatasetHeaders,
    config: validDatasetConfig
  });

  expect(result).toMatchObject(expected);
});

test('It should make a Dataset create request using the refined input format', async () => {
  const expected = {
    message: 'OK'
  };

  const result = await new DatasetRequests().create({
    datasetApiBaseUrl,
    datasetId,
    id,
    input: refinedInput
  });

  expect(result).toMatchObject(expected);
});

test('It should make a Dataset create request for a specific ID', async () => {
  const expected = {
    message: 'OK'
  };

  const result = await new DatasetRequests().create({
    datasetApiBaseUrl,
    datasetId,
    id: 'item123',
    input: validDatasetInput,
    headers: validDatasetHeaders,
    config: validDatasetConfig
  });

  expect(result).toMatchObject(expected);
});

test('It should make a Dataset create request for a specific ID using the refined input format', async () => {
  const expected = {
    message: 'OK'
  };

  const result = await new DatasetRequests().create({
    datasetApiBaseUrl,
    datasetId,
    id: 'item123',
    input: refinedInput
  });

  expect(result).toMatchObject(expected);
});

test('It should make a Dataset update request', async () => {
  const expected = {
    message: 'OK'
  };

  const result = await new DatasetRequests().update({
    datasetApiBaseUrl,
    datasetId,
    id,
    input: validDatasetInput,
    headers: validDatasetHeaders,
    config: validDatasetConfig
  });

  expect(result).toMatchObject(expected);
});

test('It should make a Dataset update request using the refined input format', async () => {
  const expected = {
    message: 'OK'
  };

  const result = await new DatasetRequests().update({
    datasetApiBaseUrl,
    datasetId,
    id,
    input: validDatasetInput,
    headers: validDatasetHeaders,
    config: validDatasetConfig
  });

  expect(result).toMatchObject(expected);
});

test('It should make a Dataset delete request', async () => {
  const expected = {
    message: 'OK'
  };

  const result = await new DatasetRequests().delete({
    datasetApiBaseUrl,
    datasetId,
    id
  });

  expect(result).toMatchObject(expected);
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
  const expected = false;

  const result = await new DatasetRequests().create({
    datasetApiBaseUrl,
    datasetId,
    id,
    input: { x: 1 },
    headers: validDatasetHeaders,
    config: validDatasetConfig
  });

  expect(result.success).toMatchObject(expected);
});

test('It should not make a Dataset update request if the input does not match the configuration', async () => {
  const expected = false;

  const result = await new DatasetRequests().update({
    datasetApiBaseUrl,
    datasetId,
    id,
    input: { x: 1 },
    headers: validDatasetHeaders,
    config: validDatasetConfig
  });

  expect(result.success).toMatchObject(expected);
});
