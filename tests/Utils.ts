import { test, expect } from 'vitest';

import { Utils } from '../src/Utils.js';

test('It should get a referenced value (variable format)', async () => {
  const expected = 123;

  const result = await new Utils().getReferencedValue('{input.a.b.c}', {
    a: { b: { c: expected } }
  });

  expect(result).toBe(expected);
});

test('It should get a referenced value (literal format)', async () => {
  const expected = '9000';

  const result = await new Utils().getReferencedValue(expected, { x: 123 });

  expect(result).toBe(expected);
});
