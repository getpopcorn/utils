export type ProcessSettings = {
  repeats: boolean;
  count?: number | null;
};

export type ProcessInput = {
  startInput: unknown;
  queue: ProcessFunction[];
  repeats: boolean;
  count: number | null | undefined;
};

export type ProcessFunction = {
  // eslint-disable-next-line
  fn: Function;
  input: string | null | undefined;
};
