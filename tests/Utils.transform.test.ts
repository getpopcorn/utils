import { test, expect } from 'vitest';
import { Validator } from '@getpopcorn/validator';

import { Utils } from '../src/index.js';

import { TransformConfiguration } from '../src/interfaces/flows/Transform.js';

import {
  validTransformComplexExpected,
  validTransformComplexInput,
  complexConfig,
  validTransformInputMissingField,
  validTransformSettings
} from '../testdata/transform.js';

/**
 * POSITIVE TESTS
 */
test('It should leave the original object unchanged if there is an empty list of transformed fields', () => {
  const expected = {
    preferences: {
      allergies: false
    },
    time: '17:00'
  };

  const input = expected;

  const config: TransformConfiguration = {
    active: true,
    fields: []
  };

  const result = new Utils().transform(input, config, validTransformSettings);

  expect(result).toMatchObject(expected);
});

test('It should leave the original object unchanged for unaffected values', () => {
  const expected = {
    daysToBonus: 123,
    preferences: {
      allergies: false
    },
    hasWindowSeat: true
  };

  const input = {
    settings: {
      daysToBonus: 123
    },
    preferences: {
      allergies: false,
      windowSeat: true
    },
    doodad: 'foo'
  };

  const config: TransformConfiguration = {
    active: true,
    fields: [
      {
        field: 'hasWindowSeat',
        value: 'preferences.windowSeat',
        type: 'keep',
        active: true
      },
      {
        field: 'daysToBonus',
        value: 'settings.daysToBonus',
        type: 'keep',
        active: true
      },
      {
        field: 'doodad_thing',
        value: 'doodad',
        type: 'drop',
        active: true
      }
    ]
  };

  const result = new Utils().transform(input, config, validTransformSettings);

  expect(result).toMatchObject(expected);
});

test('It should transform an object and skip inactive operations', () => {
  const expected = {
    allergies: false,
    cancelled: false,
    email: 'sam.person@random.xyz'
  };

  const input = {
    contact_email: 'sam.person@random.xyz',
    preferences: {
      allergies: false
    },
    cancelled: false,
    time: '17:00'
  };

  const config: TransformConfiguration = {
    active: true,
    fields: [
      {
        field: 'email',
        value: 'contact_email',
        type: 'keep',
        active: true
      },
      {
        field: 'allergies',
        value: 'preferences.allergies',
        type: 'keep',
        active: true
      },
      {
        field: 'cancelled',
        value: 'cancelled',
        type: 'keep',
        active: false
      },
      {
        field: 'time',
        value: 'time',
        type: 'drop',
        active: true
      }
    ]
  };

  const result = new Utils().transform(input, config, validTransformSettings);

  expect(result).toMatchObject(expected);
});

test('It should not do anything with non-existing fields', () => {
  const expected = {
    something: 123
  };

  const result = new Utils().transform(
    expected,
    validTransformInputMissingField.config as any,
    validTransformSettings
  );

  expect(result).toMatchObject(expected);
});

test('It should transform an object and format fields', () => {
  const expected = validTransformComplexExpected;

  let settings = new Validator().getDefaults('transform');
  settings = {
    ...settings,
    normalization: {
      schema: {
        'Is employee': ['true', true, /^emp/i],
        Contractor: ['false', false, /^cont/i]
      },
      noMatchHandling: 'keep'
    }
  };

  const result = new Utils().transform(
    validTransformComplexInput,
    complexConfig,
    // @ts-ignore
    settings
  );

  expect(result).toMatchObject(expected);
});

test('It should transform an array of objects and format fields', () => {
  const expected = [validTransformComplexExpected, validTransformComplexExpected];

  let settings = new Validator().getDefaults('transform');
  settings = {
    ...settings,
    normalization: {
      schema: {
        'Is employee': ['true', true, /^emp/i],
        Contractor: ['false', false, /^cont/i]
      },
      noMatchHandling: 'keep'
    }
  };

  const result = new Utils().transform(
    [validTransformComplexInput, validTransformComplexInput],
    complexConfig,
    // @ts-ignore
    settings
  );

  expect(result).toMatchObject(expected);
});
