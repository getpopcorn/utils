import { test, expect } from 'vitest';

import { ConditionalConfiguration } from '../src/interfaces/flows/Conditional.js';

import { Utils } from '../src/index.js';

import {
  validConditionalComplexConfig,
  validConditionalComplexExpected,
  validConditionalComplexInput,
  validConditionalConfig
} from '../testdata/conditional.js';

/**
 * POSITIVE TESTS
 */
test('It should determine a positive condition with a single item', () => {
  const expected = {
    next: 'abcd1234',
    input: { email: 'sam.person@random.xyz', allergies: true }
  };

  const input = [
    {
      email: 'sam.person@random.xyz',
      allergies: true
    }
  ];

  const result = new Utils().getConditionals(input, validConditionalConfig);

  expect(result).toMatchObject(expected);
});

test('It should determine a positive condition with multiple items, using only the last match', () => {
  const expected = {
    next: 'abcd1234',
    input: { email: 'dat.person@random.xyz', allergies: true }
  };

  const input = [
    {
      email: 'sam.person@random.xyz',
      allergies: true
    },
    {
      email: 'dat.person@random.xyz',
      allergies: true
    }
  ];

  const result = new Utils().getConditionals(input, validConditionalConfig);

  expect(result).toMatchObject(expected);
});

test('It should determine a positive condition', () => {
  const expected = {
    next: 'abcd1234',
    input: { email: 'sam.person@random.xyz', allergies: true }
  };

  const input = [
    {
      email: 'sam.person@random.xyz',
      allergies: true
    },
    {
      email: 'dat.person@random.xyz',
      allergies: false
    }
  ];

  const result = new Utils().getConditionals(input, validConditionalConfig);

  expect(result).toMatchObject(expected);
});

test('It should determine a negative condition', () => {
  const expected = {
    next: '',
    input: { email: 'dat.person@random.xyz', allergies: false }
  };

  const input = [
    {
      email: 'sam.person@random.xyz',
      allergies: true
    },
    {
      email: 'dat.person@random.xyz',
      allergies: false
    }
  ];

  const config: ConditionalConfiguration[] = [
    {
      name: 'Guests with no allergies',
      type: 'conditional',
      active: true,
      conditions: [
        {
          field: 'allergies',
          condition: 'is',
          expected: 'false',
          active: true
        }
      ],
      next: ''
    }
  ];

  const result = new Utils().getConditionals(input, config);

  expect(result).toMatchObject(expected);
});

test('It should determine multiple conditions', () => {
  const expected = {
    next: '',
    input: {
      email: 'dat.person@random.xyz',
      allergies: false,
      randomFacts: { lovesGames: true }
    }
  };

  const input = [
    {
      email: 'sam.person@random.xyz',
      allergies: true
    },
    {
      email: 'dat.person@random.xyz',
      allergies: false,
      randomFacts: { lovesGames: true }
    }
  ];

  const config: ConditionalConfiguration[] = [
    {
      name: 'Guests with no allergies and who love games',
      type: 'conditional',
      active: true,
      conditions: [
        {
          field: 'allergies',
          condition: 'is',
          expected: 'false',
          active: true
        },
        {
          field: 'randomFacts.lovesGames',
          condition: 'is',
          expected: 'true',
          active: true
        }
      ],
      next: ''
    }
  ];

  const result = new Utils().getConditionals(input, config);

  expect(result).toMatchObject(expected);
});

test('It should determine multiple conditional configurations', () => {
  const result = new Utils().getConditionals(
    validConditionalComplexInput,
    validConditionalComplexConfig
  );

  expect(result).toMatchObject(validConditionalComplexExpected);
});
