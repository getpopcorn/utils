import test from 'ava';

import { Utils } from '../src';

import { ConditionalConfiguration } from '../src/interfaces/flows/Conditional';

import {
  validConditionalComplexConfig,
  validConditionalComplexExpected,
  validConditionalComplexInput,
  validConditionalConfig
} from '../testdata/conditional';

/**
 * POSITIVE TESTS
 */
test('It should determine a positive condition', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should determine a negative condition', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should determine multiple conditions', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should determine multiple conditional configurations', (t) => {
  const result = new Utils().getConditionals(
    validConditionalComplexInput,
    validConditionalComplexConfig
  );

  t.deepEqual(result, validConditionalComplexExpected);
});
