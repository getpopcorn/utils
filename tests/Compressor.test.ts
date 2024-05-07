import { test, expect, vi } from 'vitest';

import { Compressor } from '../src/Compressor.js';

const compressor = new Compressor();

const lorem = 'Lorem ipsum dolor set';

test('It should compress and decompress a string back', () => {
  const compressed = compressor.compress(lorem);
  const result = compressor.decompress(compressed);

  expect(result).toStrictEqual(lorem);
});

test('It should set the "isSilent" setting', () => {
  const compressor = new Compressor(false);
  const logSpy = vi.spyOn(console, 'log');

  compressor.compress(lorem);
  compressor.decompress(compressor.compress(lorem));

  expect(logSpy).toHaveBeenCalled();
});
