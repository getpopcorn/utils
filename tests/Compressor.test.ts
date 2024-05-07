import { test, expect } from 'vitest';

import { Compressor } from '../src/Compressor.js';

const compressor = new Compressor();

const lorem = 'Lorem ipsum dolor set';
const loremCompressed = Buffer.from([
  31, 139, 8, 0, 0, 0, 0, 0, 0, 19, 243, 201, 47, 74, 205, 85, 200, 44, 40, 46, 205, 85, 72, 201,
  207, 201, 47, 82, 40, 78, 45, 1, 0, 236, 66, 54, 158, 21, 0, 0, 0
]);

test('It should compress a string', () => {
  const result = compressor.compress(lorem);

  expect(result).toStrictEqual(loremCompressed);
});

test('It should decompress a string', () => {
  const input = compressor.compress(lorem);
  const result = compressor.decompress(input);

  expect(result).toStrictEqual(lorem);
});
