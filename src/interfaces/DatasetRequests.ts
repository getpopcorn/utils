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
    properties: Record<string, any>[];
  };
