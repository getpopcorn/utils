import { gzipSync, gunzipSync } from 'zlib';

/**
 * @description The Compressor helps to compress and decompress data
 * in an easy way.
 */
export class Compressor {
  private readonly isSilent;

  constructor(isSilent = true) {
    this.isSilent = isSilent;
  }

  /**
   * @description Compress a string with gzip.
   */
  public compress(input: string) {
    const compressed = gzipSync(input);

    if (!this.isSilent)
      console.log(
        `The original string was ${this.size(input)} bytes and the compressed string is ${this.size(compressed.toString())} bytes.`
      );

    return compressed;
  }

  /**
   * @description Decompress a string with gzip.
   */
  public decompress(input: Buffer | ArrayBuffer | Uint8Array) {
    const decompressed = gunzipSync(input).toString('utf8');

    if (!this.isSilent)
      console.log(
        `The original string was ${this.size(input)} bytes and the decompressed string is ${this.size(decompressed)} bytes.`
      );

    return decompressed;
  }

  /**
   * @description Get the byte size of a string.
   */
  private size(input: string | Buffer | ArrayBuffer | Uint8Array) {
    return new Blob([input]).size;
  }
}
