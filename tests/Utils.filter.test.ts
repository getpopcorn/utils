import test from 'ava';

import { Utils } from '../src/Utils';

import { RefineConfiguration } from '../src/interfaces/flows/Refine';

import {
  validRefineInput,
  validRefineContentInput,
  validRefineBasicInput,
  validRefineConfig,
  validRefineConfigMultipleConditions
} from '../testdata/refine';

/**
 * POSITIVE TESTS
 */
test('It should run an "is false" filter', (t) => {
  const expected = [validRefineInput[0], validRefineInput[2]];

  const { conditions } = validRefineConfig('cancelled', 'is', 'false') as RefineConfiguration;

  const result = new Utils().filter(validRefineInput, conditions);

  t.deepEqual(result, expected);
});

test('It should run an "is true" filter', (t) => {
  const expected = [validRefineInput[1]];

  const { conditions } = validRefineConfig('cancelled', 'is', 'true') as RefineConfiguration;

  const result = new Utils().filter(validRefineInput, conditions);

  t.deepEqual(result, expected);
});

test('It should run an "exists" filter', (t) => {
  const expected = [validRefineInput[1]];

  const input: Record<string, any>[] = JSON.parse(JSON.stringify(validRefineInput)); // Ensures it does not mutate state
  delete input[0].time;
  delete input[2];

  const { conditions } = validRefineConfig('time', 'exists', 'true') as RefineConfiguration;

  const result = new Utils().filter(input, conditions);

  t.deepEqual(result, expected);
});

test('It should run a "not exists" filter', (t) => {
  const expected = [validRefineInput[0]];

  const input: Record<string, any>[] = validRefineInput;
  delete input[0].time;

  const { conditions } = validRefineConfig('time', 'exists', 'false') as RefineConfiguration;

  const result = new Utils().filter(input, conditions);

  t.deepEqual(result, expected);
});

test('It should run a "less than" filter', (t) => {
  const expected = [
    {
      reservations: 3
    }
  ];

  const { conditions } = validRefineConfig('reservations', 'lessThan', '5') as RefineConfiguration;

  const result = new Utils().filter(validRefineBasicInput, conditions);

  t.deepEqual(result, expected);
});

test('It should run a "less than or equal" filter', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should run a "more than" filter', (t) => {
  const expected = [
    {
      reservations: 8
    }
  ];

  const { conditions } = validRefineConfig('reservations', 'moreThan', '3') as RefineConfiguration;

  const result = new Utils().filter(validRefineBasicInput, conditions);

  t.deepEqual(result, expected);
});

test('It should run a "more than or equal" filter', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should run a "contains" filter', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should run an "includes" filter', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should run a "startsWith" filter', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should run a "endsWith" filter', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should handle multiple conditions', (t) => {
  const expected = [validRefineInput[2]];

  const result = new Utils().filter(
    validRefineInput,
    validRefineConfigMultipleConditions.conditions
  );

  t.deepEqual(result, expected);
});