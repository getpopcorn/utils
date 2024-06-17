import { test, expect } from 'vitest';

import { Id } from '../src/Id.js';

const id = new Id();

test('It should get a "safe" alpha-numeric ID', () => {
  const result = id.create('safe');

  const isAlphaNumeric = /^[a-z0-9]+$/i.test(result);

  expect(isAlphaNumeric).toBe(true);
  expect(result.length).toBe(12);
});

test('It should get a short ID', () => {
  const result = id.create('short');

  expect(result.length).toBe(8);
});

test('It should get a long ID', () => {
  const result = id.create('long');

  expect(result.length).toBe(12);
});

test('It should get an ULID', () => {
  const result = id.create('ulid');

  const isUlid = /^[0-9A-HJKMNP-TV-Z]{26}$/i.test(result);

  expect(isUlid).toBe(true);
  expect(result.length).toBe(26);
});

test('It should get an empty string for input that does not match a valid type', () => {
  // @ts-ignore
  const result = id.create('does_not_exist');

  expect(result).toBe('');
});
