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
   * You may set an explicit `length` for the ID, or use the defaults provided.
   * Note that `length` is not applicable to ULIDs.
   *
   * Optionally, `onlyLowerCase` may be passed which for alphanumeric
   * IDs will return a string that only uses numbers and lower-case letters.
   *
   * @see
   * https://www.npmjs.com/package/nanoid
   * https://www.npmjs.com/package/ulidx
   *
   * @example
   * const id = new Id();
   *
   * const id = new Id().create('safe'); // 16-character alphanumeric ID
   * const shortId = id.create('short'); // 8-character NanoID
   * const longId = id.create('long'); // 12-character NanoID
   * const ulid = id.create('ulid'); // ULID
   */
  public create(idType: IdType, length?: number, onlyLowerCase?: boolean): string {
    if (idType === 'safe') return this.alphaNumericId(length || 16, onlyLowerCase);
    if (idType === 'short') return nanoid(length || 8);
    if (idType === 'long') return nanoid(length || 12);
    if (idType === 'ulid') return ulid();

    console.warn(`Trying to generate an ID for non-matching type "${idType}"!`);

    return '';
  }

  /**
   * @description Generates a "safe" ID, using only alphanumeric characters.
   */
  private alphaNumericId(length = 16, onlyLowerCase = false) {
    const characters = onlyLowerCase
      ? `abcdefghijklmnopqrstuvwxyz0123456789`
      : `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }
}
