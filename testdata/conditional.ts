import { ConditionalConfiguration } from '../src/interfaces/flows/Conditional.js';

export const validConditionalConfig: ConditionalConfiguration[] = [
  {
    name: 'Guests with allergies',
    type: 'conditional',
    active: true,
    conditions: [
      {
        field: 'allergies',
        condition: 'is',
        expected: 'true',
        active: true
      }
    ],
    next: 'abcd1234'
  }
];

export const validConditionalComplexConfig: ConditionalConfiguration[] = [
  {
    name: 'Guests with allergies who love games',
    type: 'conditional',
    active: true,
    conditions: [
      {
        field: 'allergies',
        condition: 'is',
        expected: 'true',
        active: true
      },
      {
        field: 'randomFacts.lovesGames',
        condition: 'is',
        expected: 'true',
        active: true
      }
    ],
    next: 'transform1'
  },
  {
    name: 'Guests without allergies who love games',
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
    next: 'transform2'
  }
];

export const validConditionalComplexInput = [
  {
    email: 'sam.person@random.xyz',
    allergies: true,
    randomFacts: { lovesGames: true }
  },
  {
    email: 'dat.person@random.xyz',
    allergies: false,
    randomFacts: { lovesGames: true }
  },
  {
    email: 'hoo.person@random.xyz',
    allergies: false,
    randomFacts: { lovesGames: false }
  }
];

export const validConditionalComplexExpected = {
  next: 'transform2',
  input: {
    email: 'dat.person@random.xyz',
    allergies: false,
    randomFacts: { lovesGames: true }
  }
};
