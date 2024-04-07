import { Condition } from '..';

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
