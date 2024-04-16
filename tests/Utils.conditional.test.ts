import { test } from 'node:test';
import assert from 'node:assert';

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
test('It should determine a positive condition', () => {
  const expected = {
    'Guests with allergies': [
      {
        email: 'sam.person@random.xyz',
        allergies: true
      }
    ],
    default: [
      {
        email: 'dat.person@random.xyz',
        allergies: false
      }
    ]
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

  assert.deepStrictEqual(result, expected);
});

test('It should determine a negative condition', () => {
  const expected = {
    'Guests with no allergies': [
      {
        email: 'dat.person@random.xyz',
        allergies: false
      }
    ],
    default: [
      {
        email: 'sam.person@random.xyz',
        allergies: true
      }
    ]
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
      ]
    }
  ];

  const result = new Utils().getConditionals(input, config);

  assert.deepStrictEqual(result, expected);
});

test('It should determine multiple conditions', () => {
  const expected = {
    'Guests with no allergies and who love games': [
      {
        email: 'dat.person@random.xyz',
        allergies: false,
        randomFacts: { lovesGames: true }
      }
    ],
    default: [
      {
        email: 'sam.person@random.xyz',
        allergies: true
      }
    ]
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
      ]
    }
  ];

  const result = new Utils().getConditionals(input, config);

  assert.deepStrictEqual(result, expected);
});

test('It should determine multiple conditional configurations', () => {
  const result = new Utils().getConditionals(
    validConditionalComplexInput,
    validConditionalComplexConfig
  );

  assert.deepStrictEqual(result, validConditionalComplexExpected);
});
