import { gzipSync } from 'zlib';

import { DatasetHeaderType, Field, Header, Headers, Item } from './interfaces/Dataset.js';
import {
  StoredFieldRepresentation,
  StoredHeaderRepresentation,
  StoredHeadersRepresentation,
  StoredItemRepresentation
} from './interfaces/DatasetStored.js';

/**
 * @description Helps both deflating - reducing the byte size of objects - and
 * inflating them, i.e. making them human-readable again. This only applies to
 * the known "outer shell" of Items and Headers, not other things.
 */
export class ItemOptimizer {
  /**
   * @description Converts the storage-optimized format to the more readable format we want to use in the front end.
   */
  public inflateHeaders(data: StoredHeadersRepresentation) {
    const inflate = (header: StoredHeaderRepresentation) => ({
      id: header.i,
      type: header.t as DatasetHeaderType,
      isRequired: header.r,
      name: header.n,
      position: header.p,
      lastChangedBy: header.l
    });

    const inflatedHeaders =
      data?.h?.map((header: StoredHeaderRepresentation) => inflate(header)) || [];

    return {
      updatedAt: data?.u,
      headers: inflatedHeaders
    } as Headers;
  }

  /**
   * @description Converts the readable format to the storage-optimized format.
   */
  public deflateHeaders(data: Headers) {
    const deflate = (header: Header) => ({
      i: header.id,
      t: header.type,
      r: header.isRequired,
      n: header.name,
      p: header.position,
      l: header.lastChangedBy
    });

    const headers = data?.headers?.map((header: Header) => deflate(header)) || [];

    return {
      u: data?.updatedAt,
      h: headers
    } as StoredHeadersRepresentation;
  }

  /**
   * @description Make an object human-readable again.
   */
  public inflateItem(data: StoredItemRepresentation) {
    const inflate = (field: StoredFieldRepresentation) => ({
      headerRef: field.h,
      value: field.v
    });

    const inflatedFields = data?.f?.map((field: StoredFieldRepresentation) => inflate(field)) || [];

    return {
      id: data.i,
      fields: inflatedFields
    } as Item;
  }

  /**
   * @description Make an Item into a storage-optimized version.
   */
  public deflateItem(data: Item) {
    const inflate = (field: Field) => ({
      h: field.headerRef,
      v: field.value
    });

    const deflatedFields = data?.fields?.map((field: Field) => inflate(field)) || [];

    return {
      i: data.id,
      f: deflatedFields
    } as StoredItemRepresentation;
  }

  /**
   * @description Compress a string with gzip.
   */
  public compress(input: string) {
    const bytes = (str: string) => new Blob([str]).size;

    const compressed = gzipSync(input);

    console.log(
      `The original string was ${bytes(input)} bytes and the compressed string was ${bytes(compressed.toString())} bytes.`
    );

    return compressed;
  }
}
