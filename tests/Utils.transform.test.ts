import test from 'ava';

import { Utils } from '../src';

import { TransformConfiguration } from '../src/interfaces/flows/Transform';

import {
  validTransformComplexExpected,
  validTransformComplexInput,
  complexConfig,
  validTransformInputMissingField,
  validTransformSettings
} from '../testdata/transform';

/**
 * POSITIVE TESTS
 */
test('It should leave the original object unchanged if there is an empty list of transformed fields', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should leave the original object unchanged for unaffected values', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should transform an object and skip inactive operations', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should not do anything with non-existing fields', (t) => {
  const expected = {
    something: 123
  };

  const result = new Utils().transform(
    expected,
    validTransformInputMissingField.config as any,
    validTransformSettings
  );

  t.deepEqual(result, expected);
});

test('It should transform an object and format fields', (t) => {
  const expected = validTransformComplexExpected;

  const result = new Utils().transform(
    validTransformComplexInput,
    complexConfig,
    // TODO: Should get this from defaults - either in the test or in the function
    {
      nonExistingValueHandling: 'drop',
      currency: {
        symbol: 'EUR',
        locale: 'sv-SE',
        precision: 8
      },
      dateStyle: 'date'
    }
  );

  t.deepEqual(result, expected);
});

test('It should transform an array of objects and format fields', (t) => {
  const expected = [validTransformComplexExpected, validTransformComplexExpected];

  const result = new Utils().transform(
    [validTransformComplexInput, validTransformComplexInput],
    complexConfig,
    // TODO: Should get this from defaults - either in the test or in the function
    {
      nonExistingValueHandling: 'drop',
      currency: {
        symbol: 'EUR',
        locale: 'sv-SE',
        precision: 8
      },
      dateStyle: 'date'
    }
  );

  t.deepEqual(result, expected);
});
