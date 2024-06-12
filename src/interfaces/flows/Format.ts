import { CurrencyOptions } from '../index.js';

export type FormatOptions = {
  type: FormatType;
  value: ValueType;
  currency: CurrencyOptions;
  dateStyle: DateStyle;
  normalization: NormalizationOptions;
};

export type DateStyle = 'date' | 'iso' | 'unix' | 'utc';

export type NormalizationOptions = {
  schema: Record<string, (string | number | boolean | RegExp)[]>;
  noMatchHandling: 'keep' | 'drop';
};

export type FormatType =
  | 'toBoolean'
  | 'toCamelCase'
  | 'toCurrency'
  | 'toDate'
  | 'toDecimal'
  | 'toInteger'
  | 'toJSON'
  | 'toNormalized'
  | 'toPercent'
  | 'toSlug'
  | 'toSnakeCase'
  | 'toString'
  | 'toTitleCase';

export type ValueType = string | number | Record<string, unknown>;

export type FormatFunction = () => boolean | string | number | unknown | null;
