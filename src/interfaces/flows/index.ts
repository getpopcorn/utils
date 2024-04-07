export type FlowComponentRepresentation = {
  name: string;
  id: string;
  type: FlowComponentType;
  settings: FlowComponentSettings;
  input: FlowComponentInput;
  next: string;
  isPartOfProcess?: string;
};

export type FlowComponentType =
  | 'conditional'
  | 'datasetCreate'
  | 'datasetDelete'
  | 'datasetGet'
  | 'datasetUpdate'
  | 'email'
  | 'event'
  | 'process'
  | 'refine'
  | 'request'
  | 'response'
  | 'start'
  | 'transform'
  | 'wait';

export type FlowComponentSettings = Record<string, any>;

type FlowComponentInput = Record<string, any>;
