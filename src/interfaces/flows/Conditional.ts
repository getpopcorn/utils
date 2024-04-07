import { Condition } from '..';

export type ConditionalResult = {
  [key: string]: Record<string, any>[];
  default: Record<string, any>[];
};

export type ConditionalConfiguration = {
  conditions: Condition[];
  name: string;
  type: string;
  active: boolean;
};
