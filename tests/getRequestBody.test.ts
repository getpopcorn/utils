import { test, expect } from 'vitest';

import { getRequestBody } from '../src/infrastructure/getRequestBody.js';
import { Compressor } from '../src/Compressor.js';

const compressor = new Compressor();

test('It should return a string as a string', () => {
  const expected = `"something here"`;

  const result = getRequestBody(expected);

  expect(result).toBe(expected);
});

test('It should return numbers as strings', () => {
  const expected = '123';

  const result = getRequestBody(123);

  expect(result).toBe(expected);
});

test('It should return an object as a stringified object', () => {
  const input = { a: { b: 'c' }, d: [1, 2, 3] };
  const expected = JSON.stringify(input);

  const result = getRequestBody(input);

  expect(result).toBe(expected);
});

test('It should return a stringified object as a stringified object', () => {
  const expected = '{"a":{"b":"c"},"d":[1,2,3]}';

  const result = getRequestBody(expected);

  expect(result).toBe(expected);
});

test('It should return a gzipped input as an Uint8Array', () => {
  const text = 'something here';

  const compressed = compressor.compress(text);
  const body = getRequestBody(compressed) as Uint8Array;
  const decompressed = compressor.decompress(body);

  expect(decompressed).toBe(text);
});

test('It should return null when there is no input', () => {
  const result = getRequestBody(undefined);

  expect(result).toBe(null);
});
