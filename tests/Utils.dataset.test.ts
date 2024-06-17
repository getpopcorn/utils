import { test, expect } from 'vitest';

import { Utils } from '../src/index.js';

import { items, itemsStored, headers, headersStored } from '../testdata/datasetDataToObject.js';

import {
  validDatasetInput,
  validDatasetHeaders,
  validDatasetConfig,
  validDatasetPayload,
  datasetStoredResponse
} from '../testdata/dataset.js';
import {
  StoredHeaderRepresentation,
  StoredItemRepresentation
} from '../src/interfaces/DatasetStored.js';
import { Header, Item } from '../src/interfaces/Dataset.js';

/**
 * POSITIVE TESTS
 */
test("It should convert a JSON input to a payload compatible with a Dataset's Headers", () => {
  const { success, errors, payload } = new Utils().inputToDatasetPayload(
    validDatasetInput,
    validDatasetHeaders,
    validDatasetConfig
  );

  expect(success).toBe(true);
  expect(errors).toMatchObject([]);
  expect(payload).toMatchObject(validDatasetPayload);
});

test('It should skip non-existing Headers when converting to a Dataset payload', () => {
  const headers = JSON.parse(JSON.stringify(validDatasetHeaders));
  headers.pop();
  headers.pop();
  headers.pop();
  headers.pop();

  const { success, errors, payload } = new Utils().inputToDatasetPayload(
    validDatasetInput,
    headers,
    validDatasetConfig
  );

  expect(success).toBe(true);
  expect(errors).toMatchObject([]);
  expect(payload).toMatchObject([
    {
      headerRef: 'j2d8y22d',
      value: 'Sam Person'
    }
  ]);
});

test('It should convert stored Dataset data (Items) into a normalized JSON shape', () => {
  const expected = [
    {
      Cancelled: false,
      Name: 'Sam Person',
      Time: '20240301',
      __id__: '01HY8CSNAW56VX19SBYKYT75NX'
    },
    {
      Cancelled: false,
      Name: 'Sam Person',
      Time: '20240301',
      __id__: '01HY8CSMX7DGKA5A8PF6E9YPNQ'
    },
    {
      Cancelled: false,
      Name: 'Sam Person',
      Time: '20240301',
      __id__: '01HY8CSMD5SWV8QPKF7H5DM7RX'
    },
    {
      Cancelled: false,
      Name: 'Sam Person',
      Time: '20240301',
      __id__: '01HY8CS7870QV0AJQ67QBPEH6H'
    }
  ];

  const result = new Utils().datasetDataToObject(
    headersStored as StoredHeaderRepresentation[],
    itemsStored as StoredItemRepresentation[]
  );

  expect(result).toMatchObject(expected);
});

test.only('It should convert unwrapped/full Dataset data (Items) into a normalized JSON shape', () => {
  const expected = [
    {
      Cancelled: false,
      Name: 'Sam Person',
      Time: '20240301',
      __id__: '01HY8CSNAW56VX19SBYKYT75NX'
    },
    {
      Cancelled: false,
      Name: 'Sam Person',
      Time: '20240301',
      __id__: '01HY8CSMX7DGKA5A8PF6E9YPNQ'
    },
    {
      Cancelled: false,
      Name: 'Sam Person',
      Time: '20240301',
      __id__: '01HY8CSMD5SWV8QPKF7H5DM7RX'
    },
    {
      Cancelled: false,
      Name: 'Sam Person',
      Time: '20240301',
      __id__: '01HY8CS7870QV0AJQ67QBPEH6H'
    }
  ];

  const result = new Utils().datasetDataToObject(headers as Header[], items as Item[]);

  expect(result).toMatchObject(expected);
});

test('It should validate the input as a Dataset response', async () => {
  const expected = true;

  const result = new Utils().isDatasetResponse(datasetStoredResponse);

  expect(result).toBe(expected);
});

/**
 * NEGATIVE TESTS
 */
test('It should return errors when missing required Headers', () => {
  const { success, errors, payload } = new Utils().inputToDatasetPayload(
    {
      name: 'Sam Person'
    },
    validDatasetHeaders,
    validDatasetConfig
  );

  expect(success).toBe(false);
  expect(errors).toMatchObject([
    'Missing value for "{input.site.time}"',
    'Missing value for "{input.site.location}"',
    'Missing value for "{input.priority}"'
  ]);
  expect(payload).toMatchObject([]);
});

test('It should invalidate the input if no metadata', async () => {
  const expected = false;

  const input = JSON.parse(JSON.stringify(datasetStoredResponse));
  input.metadata = null;

  const result = new Utils().isDatasetResponse(input);

  expect(result).toBe(expected);
});

test('It should invalidate the input if no headers', async () => {
  const expected = false;

  const input = JSON.parse(JSON.stringify(datasetStoredResponse));
  input.headers = null;

  const result = new Utils().isDatasetResponse(input);

  expect(result).toBe(expected);
});

test('It should invalidate the input if no items', async () => {
  const expected = false;

  const input = JSON.parse(JSON.stringify(datasetStoredResponse));
  input.metadata = null;

  const result = new Utils().isDatasetResponse(input);

  expect(result).toBe(expected);
});
