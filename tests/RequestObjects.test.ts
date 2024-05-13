import { test, expect } from 'vitest';

import {
  datasetAddRequestObject,
  datasetDeleteRequestObject,
  datasetGetRequestObject,
  datasetUpdateRequestObject
} from '../src/RequestObjects.js';

const datasetApiBaseUrl = 'https://api.company.com';
const datasetId = 'abc123';
const resourceType = 'item';
const data = {
  a: { b: 'c' }
};
const resourceId = 'qwerty';

test('It should make a Dataset add request', () => {
  const expected = {
    endpoint: 'https://api.company.com/dataset/abc123/item',
    method: 'PUT',
    message: '{"a":{"b":"c"}}'
  };

  const result = datasetAddRequestObject(datasetApiBaseUrl, datasetId, resourceType, data);

  expect(result).toMatchObject(expected);
});

test('It should make a Dataset update request', () => {
  const expected = {
    endpoint: 'https://api.company.com/dataset/abc123/item/qwerty',
    method: 'PATCH',
    message: '{"a":{"b":"c"}}'
  };

  const result = datasetUpdateRequestObject(
    datasetApiBaseUrl,
    datasetId,
    resourceType,
    resourceId,
    data
  );

  expect(result).toMatchObject(expected);
});

test('It should make a Dataset delete request', () => {
  const expected = {
    endpoint: 'https://api.company.com/dataset/abc123/item/qwerty',
    method: 'DELETE'
  };

  const result = datasetDeleteRequestObject(datasetApiBaseUrl, datasetId, resourceType, resourceId);
  expect(result).toMatchObject(expected);
});

test('It should make a Dataset get request', () => {
  const expected = {
    endpoint: 'https://api.company.com/dataset/abc123',
    method: 'GET'
  };

  const result = datasetGetRequestObject(datasetApiBaseUrl, datasetId);

  expect(result).toMatchObject(expected);
});
