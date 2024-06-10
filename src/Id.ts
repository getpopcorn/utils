import { nanoid } from 'nanoid';
import { ulid } from 'ulidx';

import { IdType } from './interfaces/Id.js';

/**
 * @description Handles the generation of IDs with our common formats.
 */
export class Id {
  /**
   * @description Creates a new ID using our common formats.
   *
   * @see
   * https://www.npmjs.com/package/nanoid
   * https://www.npmjs.com/package/ulidx
   *
   * @example
   * const id = new Id();
   *
   * const shortId = id.create('short'); // 8-character NanoID
   * const longId = id.create('long'); // 12-character NanoID
   * const ulid = id.create('ulid'); // ULID
   */
  public create(idType: IdType): string {
    if (idType === 'short') return nanoid(8);
    if (idType === 'long') return nanoid(12);
    if (idType === 'ulid') return ulid();

    console.warn(`Trying to generate an ID for non-matching type "${idType}"!`);

    return '';
  }
}
