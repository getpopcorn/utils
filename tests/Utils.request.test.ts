import { test, expect } from 'vitest';

import { Utils } from '../src/Utils.js';

test('It should handle errors', async () => {
  const expected = {
    popcorn_error:
      'Not OK: Status code is "404" at URL "https://www.mockachino.com/6e5778ca-638a-4c/error" (using method "GET")'
  };

  const result = await new Utils().request({
    endpoint: 'https://www.mockachino.com/6e5778ca-638a-4c/error',
    method: 'GET'
  });

  expect(result).toMatchObject(expected);
});
