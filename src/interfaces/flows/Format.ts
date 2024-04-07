import { CurrencyOptions } from '..';

export type FormatOptions = {
  type: FormatType;
  value: ValueType;
  currency: CurrencyOptions;
  dateStyle: DateStyle;
};

export type DateStyle = 'date' | 'iso' | 'unix' | 'utc';

export type FormatType =
  | 'toBoolean'
  | 'toCamelCase'
  | 'toCurrency'
  | 'toDate'
  | 'toDecimal'
  | 'toInteger'
  | 'toJSON'
  | 'toPercent'
  | 'toSlug'
  | 'toSnakeCase'
  | 'toString'
  | 'toTitleCase';

export type ValueType = string | number | Record<string, unknown>;

export type FormatFunction = () => boolean | string | number | null;
