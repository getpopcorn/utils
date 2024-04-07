import { ConditionalConfiguration } from '../src/interfaces/flows/Conditional';

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
    ]
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
    ]
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
    ]
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
  'Guests with allergies who love games': [
    {
      allergies: true,
      email: 'sam.person@random.xyz',
      randomFacts: { lovesGames: true }
    }
  ],
  'Guests without allergies who love games': [
    {
      allergies: false,
      email: 'dat.person@random.xyz',
      randomFacts: { lovesGames: true }
    }
  ],
  default: [
    {
      allergies: false,
      email: 'hoo.person@random.xyz',
      randomFacts: { lovesGames: false }
    }
  ]
};
