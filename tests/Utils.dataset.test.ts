import { test, expect } from 'vitest';

import { Utils } from '../src/index.js';

import {
  validDatasetInput,
  validDatasetHeaders,
  validDatasetConfig,
  validDatasetPayload
} from '../testdata/dataset.js';

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
