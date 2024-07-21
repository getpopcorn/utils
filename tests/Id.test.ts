import { test, expect, describe } from 'vitest';

import { Id } from '../src/Id.js';

const id = new Id();

describe('Alphanumeric IDs', () => {
  test('It should get a "safe" alpha-numeric ID', () => {
    const result = id.create('safe');

    const isAlphaNumeric = /^[a-zA-Z0-9]+$/i.test(result);

    expect(isAlphaNumeric).toBe(true);
    expect(result.length).toBe(16);
  });

  test('It should get a "safe" alpha-numeric ID containing only numbers and lower-case characters', () => {
    const result = id.create('safe', 16, true);

    const isAlphaNumeric = /^[a-z0-9]+$/i.test(result);
    const noCapitalLetters = /^[^A-Z]+$/.test(result);

    expect(isAlphaNumeric).toBe(true);
    expect(result.length).toBe(16);
    expect(noCapitalLetters).toBe(true);
  });
});

describe('Short IDs', () => {
  test('It should get a short ID', () => {
    const result = id.create('short');
    expect(result.length).toBe(8);
  });

  test('It should get a short ID with a custom length', () => {
    const result = id.create('short', 12);
    expect(result.length).toBe(12);
  });
});

describe('Long IDs', () => {
  test('It should get a long ID', () => {
    const result = id.create('long');
    expect(result.length).toBe(12);
  });

  test('It should get a long ID with a custom length', () => {
    const result = id.create('long', 20);
    expect(result.length).toBe(20);
  });
});

describe('ULIDs', () => {
  test('It should get an ULID', () => {
    const result = id.create('ulid');

    const isUlid = /^[0-9A-HJKMNP-TV-Z]{26}$/i.test(result);

    expect(isUlid).toBe(true);
    expect(result.length).toBe(26);
  });
});

describe('Error handling', () => {
  test('It should get an empty string for input that does not match a valid type', () => {
    // @ts-ignore
    const result = id.create('does_not_exist');
    expect(result).toBe('');
  });
});
