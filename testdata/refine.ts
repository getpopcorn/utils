import { RefineConfiguration } from '../src/interfaces/flows/Refine';

export const validRefineInput = [
  {
    contact_email: 'sam.person@random.xyz',
    preferences: {
      allergies: false
    },
    cancelled: false,
    time: '20240307_1700'
  },
  {
    contact_email: 'dat.person@random.xyz',
    preferences: {
      allergies: false
    },
    cancelled: true,
    time: '20240307_1700'
  },
  {
    contact_email: 'hoo.person@random.xyz',
    preferences: {
      allergies: true
    },
    cancelled: false,
    time: '20240307_1700'
  }
];

export const validRefineBasicInput = [
  {
    reservations: 8
  },
  {
    reservations: 3
  }
];

export const validRefineContentInput = [
  {
    content: 'It was a dark and rainy night...'
  },
  {
    content: 'Vincent had had enough. It was time to close things up.'
  }
];

export const validRefineConfigMultipleConditions: RefineConfiguration = {
  active: true,
  conditions: [
    {
      field: 'cancelled',
      condition: 'is',
      expected: 'false',
      active: true
    },
    {
      field: 'preferences.allergies',
      condition: 'is',
      expected: 'true',
      active: true
    }
  ]
};

export const validRefineConfig = (
  field: string,
  condition: string,
  expected: string,
  active = true
) => ({
  active: true,
  conditions: [
    {
      field,
      condition,
      expected,
      active
    }
  ]
});
