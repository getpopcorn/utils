import { Header } from './Dataset.js';

type DatasetOptionsBase = {
  datasetApiBaseUrl: string;
  datasetId: string;
};

export type DatasetGetOptions = DatasetOptionsBase;

export type DatasetDeleteOptions = DatasetOptionsBase & {
  id: string;
};

export type DatasetCreateUpdateOptions = DatasetOptionsBase &
  DatasetDeleteOptions & {
    input: Record<string, any>;
    headers: Header[];
    config: Record<string, any>;
  };
