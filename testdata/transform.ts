import {
  TransformConfiguration,
  TransformOptions,
  TransformSettings
} from '../src/interfaces/flows/Transform.js';

export const validTransformSettings: TransformSettings = {
  nonExistingValueHandling: 'drop',
  currency: {
    symbol: 'USD',
    locale: 'en-US',
    precision: 4
  },
  dateStyle: 'utc'
};

export const validTransformComplexInput = {
  email: 'sam.person@random.xyz',
  cancelled: 0,
  money: 765390.3,
  date: 1711394294000,
  camelCase: 'camel case',
  number: '23.12839719273',
  slug: 'some article about bulldozers',
  snake_case: 'snakes in a case',
  TitleCase: 'a grand history',
  json: '{"abc": 123}'
};

export const validTransformComplexExpected = {
  TitleCase: 'A Grand History',
  camelCase: 'camelCase',
  cancelled: false,
  date: '2024-03-25',
  decimal: 23.128,
  email: 'sam.person@random.xyz',
  integer: 23,
  json: { abc: 123 },
  money: '765 390,3 €',
  percent: '23.128%',
  slug: 'some-article-about-bulldozers',
  snake_case: 'snakes_in_a_case'
};

export const validTransformInputMissingField: TransformOptions = {
  config: {
    active: true,
    fields: [
      {
        field: 'thisShouldNotExist',
        value: 'deeper.down',
        type: 'toString',
        active: true
      }
    ]
  }
};

export const complexConfig: TransformConfiguration = {
  active: true,
  fields: [
    {
      field: 'email',
      value: 'email',
      type: 'toString',
      active: true
    },
    {
      field: 'cancelled',
      value: 'cancelled',
      type: 'toBoolean',
      active: true
    },
    {
      field: 'money',
      value: 'money',
      type: 'toCurrency',
      active: true
    },
    {
      field: 'date',
      value: 'date',
      type: 'toDate',
      active: true
    },
    {
      field: 'camelCase',
      value: 'camelCase',
      type: 'toCamelCase',
      active: true
    },
    {
      field: 'decimal',
      value: 'number',
      type: 'toDecimal',
      active: true
    },
    {
      field: 'integer',
      value: 'number',
      type: 'toInteger',
      active: true
    },
    {
      field: 'percent',
      value: 'number',
      type: 'toPercent',
      active: true
    },
    {
      field: 'slug',
      value: 'slug',
      type: 'toSlug',
      active: true
    },
    {
      field: 'snake_case',
      value: 'snake_case',
      type: 'toSnakeCase',
      active: true
    },
    {
      field: 'TitleCase',
      value: 'TitleCase',
      type: 'toTitleCase',
      active: true
    },
    {
      field: 'json',
      value: 'json',
      type: 'toJSON',
      active: true
    }
  ]
};
