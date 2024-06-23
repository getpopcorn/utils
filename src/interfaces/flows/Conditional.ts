import { Condition } from '../index.js';

export type ConditionalResult = {
  next: string;
  input: Record<string, any> | Record<string, any>[];
};

export type ConditionalConfiguration = {
  conditions: Condition[];
  name: string;
  type: string;
  active: boolean;
  next: string;
};
