import { CurrencyOptions } from '..';
import { DateStyle, FormatType } from './Format';

export type TransformOptions = {
  config?: TransformConfiguration;
  settings?: TransformSettings;
};

export type TransformConfiguration = {
  active: boolean;
  fields: TransformOperation[];
};

export type TransformOperation = {
  field: string;
  value: string;
  type: FormatType | 'keep' | 'drop';
  active: boolean;
};

export type TransformSettings = {
  nonExistingValueHandling: NullValueHandlingOptions;
  currency: CurrencyOptions;
  dateStyle: DateStyle;
};

type NullValueHandlingOptions = 'drop' | 'null' | 'undefined' | 'empty' | 'error';

export type TransformResult = {
  [key: string]: any;
};
