import { HttpMethod } from '../index.js';

export type RequestInput = {
  endpoint: string;
  method: HttpMethod;
  message?: Record<string, any> | string | undefined | null;
  headers?: Record<string, any>;
};

export type RequestMakeInput = {
  message?: Record<string, any> | string | ArrayBuffer | Uint8Array;
};
