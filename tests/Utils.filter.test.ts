import { test, expect } from 'vitest';

import { Utils } from '../src/Utils.js';

import { RefineConfiguration } from '../src/interfaces/flows/Refine.js';

import {
  validRefineInput,
  validRefineContentInput,
  validRefineBasicInput,
  validRefineConfig,
  validRefineConfigMultipleConditions
} from '../testdata/refine.js';

/**
 * POSITIVE TESTS
 */
test('It should run an "is false" filter', () => {
  const expected = [validRefineInput[0], validRefineInput[2]];

  const { conditions } = validRefineConfig('cancelled', 'is', 'false') as RefineConfiguration;

  const result = new Utils().filter(validRefineInput, conditions);

  expect(result).toMatchObject(expected);
});

test('It should run an "is true" filter', () => {
  const expected = [validRefineInput[1]];

  const { conditions } = validRefineConfig('cancelled', 'is', 'true') as RefineConfiguration;

  const result = new Utils().filter(validRefineInput, conditions);

  expect(result).toMatchObject(expected);
});

test('It should run an "exists" filter', () => {
  const expected = [validRefineInput[1]];

  const input: Record<string, any>[] = JSON.parse(JSON.stringify(validRefineInput)); // Ensures it does not mutate state
  delete input[0].time;
  delete input[2];

  const { conditions } = validRefineConfig('time', 'exists', 'true') as RefineConfiguration;

  const result = new Utils().filter(input, conditions);

  expect(result).toMatchObject(expected);
});

test('It should run a "not exists" filter', () => {
  const expected = [validRefineInput[0]];

  const input: Record<string, any>[] = validRefineInput;
  delete input[0].time;

  const { conditions } = validRefineConfig('time', 'exists', 'false') as RefineConfiguration;

  const result = new Utils().filter(input, conditions);

  expect(result).toMatchObject(expected);
});

test('It should run a "less than" filter', () => {
  const expected = [
    {
      reservations: 3
    }
  ];

  const { conditions } = validRefineConfig('reservations', 'lessThan', '5') as RefineConfiguration;

  const result = new Utils().filter(validRefineBasicInput, conditions);

  expect(result).toMatchObject(expected);
});

test('It should run a "less than or equal" filter', () => {
  const expected = [
    {
      reservations: 3
    }
  ];

  const { conditions } = validRefineConfig(
    'reservations',
    'lessThanOrEqual',
    '5'
  ) as RefineConfiguration;

  const result = new Utils().filter(validRefineBasicInput, conditions);

  expect(result).toMatchObject(expected);
});

test('It should run a "more than" filter', () => {
  const expected = [
    {
      reservations: 8
    }
  ];

  const { conditions } = validRefineConfig('reservations', 'moreThan', '3') as RefineConfiguration;

  const result = new Utils().filter(validRefineBasicInput, conditions);

  expect(result).toMatchObject(expected);
});

test('It should run a "more than or equal" filter', () => {
  const expected = [
    {
      reservations: 8
    },
    {
      reservations: 3
    }
  ];

  const { conditions } = validRefineConfig(
    'reservations',
    'moreThanOrEqual',
    '3'
  ) as RefineConfiguration;

  const result = new Utils().filter(validRefineBasicInput, conditions);

  expect(result).toMatchObject(expected);
});

test('It should run a "contains" filter', () => {
  const expected = [
    {
      name: 'Sam Person'
    },
    {
      name: 'Dat Person'
    }
  ];

  const { conditions } = validRefineConfig('name', 'contains', 'Person') as RefineConfiguration;

  const result = new Utils().filter(expected, conditions);

  expect(result).toMatchObject(expected);
});

test('It should run an "includes" filter', () => {
  const input = [
    {
      books: ['Sherlock Holmes', 'Genji Monogatari']
    },
    {
      books: ['The Fall of the House of Usher', 'Moomin']
    }
  ];

  const expected = [input[0]];

  const { conditions } = validRefineConfig(
    'books',
    'includes',
    'Genji Monogatari'
  ) as RefineConfiguration;

  const result = new Utils().filter(input, conditions);

  expect(result).toMatchObject(expected);
});

test('It should run a "startsWith" filter', () => {
  const expected = [
    {
      content: 'It was a dark and rainy night...'
    }
  ];

  const { conditions } = validRefineConfig(
    'content',
    'startsWith',
    'It was'
  ) as RefineConfiguration;

  const result = new Utils().filter(validRefineContentInput, conditions);

  expect(result).toMatchObject(expected);
});

test('It should run a "endsWith" filter', () => {
  const expected = [
    {
      content: 'Vincent had had enough. It was time to close things up.'
    }
  ];

  const { conditions } = validRefineConfig(
    'content',
    'endsWith',
    'close things up.'
  ) as RefineConfiguration;

  const result = new Utils().filter(validRefineContentInput, conditions);

  expect(result).toMatchObject(expected);
});

test('It should handle multiple conditions', () => {
  const expected = [validRefineInput[2]];

  const result = new Utils().filter(
    validRefineInput,
    validRefineConfigMultipleConditions.conditions
  );

  expect(result).toMatchObject(expected);
});
