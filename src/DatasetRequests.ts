import { Utils } from './Utils.js';
import {
  datasetAddRequestObject,
  datasetDeleteRequestObject,
  datasetGetRequestObject,
  datasetUpdateRequestObject
} from './RequestObjects.js';

import {
  DatasetCreateUpdateOptions,
  DatasetDeleteOptions,
  DatasetGetOptions
} from './interfaces/DatasetRequests.js';

/**
 * @description TODO
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
   * dataset.create(input);
   */
  public async create(options: DatasetCreateUpdateOptions) {
    const { datasetApiBaseUrl, datasetId, id, input, headers } = options;

    const resourcePath = id ? `item/${id}` : `item`;

    const { success, errors } = this.utils.inputMatchesDatasetConfig(input, headers);
    if (!success) return { success, errors };

    return await this.utils.request(
      datasetAddRequestObject(datasetApiBaseUrl, datasetId, resourcePath, input)
    );
  }

  /**
   * @description Update an item in the Dataset.
   * The deletion is based on the `itemId` set in the settings.
   *
   * @example
   * dataset.update(input);
   */
  public async update(options: DatasetCreateUpdateOptions) {
    const { datasetApiBaseUrl, datasetId, id, input, headers } = options;

    const { success, errors } = this.utils.inputMatchesDatasetConfig(input, headers);
    if (!success) return { success, errors };

    return await this.utils.request(
      datasetUpdateRequestObject(datasetApiBaseUrl, datasetId, 'item', id, input)
    );
  }
}
