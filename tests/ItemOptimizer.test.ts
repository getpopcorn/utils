import { test, expect } from 'vitest';

import { ItemOptimizer } from '../src/ItemOptimizer.js';

import headers from '../testdata/headers.json';
import storedHeaders from '../testdata/headers-stored.json';
import item from '../testdata/item.json';
import storedItem from '../testdata/item-stored.json';

const itemOptimizer = new ItemOptimizer();

test('It should inflate Headers', () => {
  const expected = headers;

  const result = itemOptimizer.inflateHeaders(storedHeaders as any);

  expect(result).toMatchObject(expected);
});

test('It should deflate Headers', () => {
  const expected = storedHeaders;

  const result = itemOptimizer.deflateHeaders(headers as any);

  expect(result).toMatchObject(expected);
});

test('It should inflate an Item', () => {
  const expected = item;

  const result = itemOptimizer.inflateItem(storedItem as any);

  expect(result).toMatchObject(expected);
});

test('It should deflate an Item', () => {
  const expected = storedItem;

  const result = itemOptimizer.deflateItem(item as any);

  expect(result).toMatchObject(expected);
});
