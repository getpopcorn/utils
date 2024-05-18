import { Utils } from './Utils.js';
import {
  datasetAddRequestObject,
  datasetDeleteRequestObject,
  datasetGetRequestObject,
  datasetUpdateRequestObject
} from './RequestObjects.js';

import {
  DatasetCreateUpdateOptionsRaw,
  DatasetCreateUpdateOptionsRefined,
  DatasetDeleteOptions,
  DatasetGetOptions
} from './interfaces/DatasetRequests.js';

/**
 * @description Easily make requests to the Dataset API.
 */
export class DatasetRequests {
  utils: Utils;

  constructor() {
    this.utils = new Utils();
  }

  /**
   * @description Get the metadata, headers, and first items from the specified Dataset.
   * @todo Support queries
   *
   * @example
   * dataset.get();
   */
  public async get(options: DatasetGetOptions) {
    const { datasetApiBaseUrl, datasetId } = options;

    return await this.utils.request(datasetGetRequestObject(datasetApiBaseUrl, datasetId));
  }

  /**
   * @description Delete an item from the specified Dataset.
   *
   * @example
   * dataset.delete();
   */
  public async delete(options: DatasetDeleteOptions) {
    const { datasetApiBaseUrl, datasetId, id } = options;

    return await this.utils.request(
      datasetDeleteRequestObject(datasetApiBaseUrl, datasetId, 'item', id)
    );
  }

  /**
   * @description Create an item in the Dataset.
   *
   * @example
   * // Refined format
   * dataset.create({
   *   datasetApiBaseUrl: 'https://api.mycompany.xyz',
   *   datasetId: 'asdf1234',
   *   id: 'item123',
   *   input: [{ headerRef: 'header1', value: 'something' }]
   * });
   *
   * // Raw format
   * dataset.create({
   *   datasetApiBaseUrl: 'https://api.mycompany.xyz',
   *   datasetId: 'asdf1234',
   *   id: 'item123',
   *   // Raw JSON object
   *   input: { ... },
   *   // Dataset Headers object
   *   headers: { ... },
   *   // Mapping configuration object
   *   config: { ... }
   * });
   */
  public async create(options: DatasetCreateUpdateOptionsRefined | DatasetCreateUpdateOptionsRaw) {
    const { datasetApiBaseUrl, datasetId, id, input } = options;

    const resourcePath = id ? `item/${id}` : `item`;

    let payload = input;

    // Handle raw or unrefined JSON input
    // @ts-ignore
    if (options?.headers && options?.config) {
      // @ts-ignore
      const transformed = this.utils.inputToDatasetPayload(input, options.headers, options.config);
      if (!transformed.success) return { success: transformed.success, errors: transformed.errors };
      payload = transformed.payload;
    }

    return await this.utils.request(
      datasetAddRequestObject(datasetApiBaseUrl, datasetId, resourcePath, payload)
    );
  }

  /**
   * @description Update an item in the Dataset.
   *
   * @example
   * // Refined format
   * dataset.update({
   *   datasetApiBaseUrl: 'https://api.mycompany.xyz',
   *   datasetId: 'asdf1234',
   *   id: 'item123',
   *   input: [{ headerRef: 'header1', value: 'something' }]
   * });
   *
   * // Raw format
   * dataset.update({
   *   datasetApiBaseUrl: 'https://api.mycompany.xyz',
   *   datasetId: 'asdf1234',
   *   id: 'item123',
   *   // Raw JSON object
   *   input: { ... },
   *   // Dataset Headers object
   *   headers: { ... },
   *   // Mapping configuration object
   *   config: { ... }
   * });
   */
  public async update(options: DatasetCreateUpdateOptionsRefined | DatasetCreateUpdateOptionsRaw) {
    const { datasetApiBaseUrl, datasetId, id, input } = options;

    let payload = input;

    // Handle raw or unrefined JSON input
    // @ts-ignore
    if (options?.headers && options?.config) {
      // @ts-ignore
      const transformed = this.utils.inputToDatasetPayload(input, options.headers, options.config);
      if (!transformed.success) return { success: transformed.success, errors: transformed.errors };
      payload = transformed.payload;
    }

    return await this.utils.request(
      datasetUpdateRequestObject(datasetApiBaseUrl, datasetId, 'item', id, payload)
    );
  }
}
