import { Condition } from '../index.js';

export type RefineSettings = {
  name: string;
};

export type RefineOptions = {
  config?: RefineConfiguration;
};

export type RefineConfiguration = {
  active: boolean;
  conditions: Condition[];
};

export type RefineFilterResult = {
  [key: string]: any;
}[];
