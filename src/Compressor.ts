import { gzipSync, gunzipSync } from 'zlib';

/**
 * @description The Compressor helps to compress and decompress data
 * in an easy way.
 */
export class Compressor {
  /**
   * @description Compress a string with gzip.
   */
  public compress(input: string, isSilent = true) {
    const compressed = gzipSync(input);

    if (!isSilent)
      console.log(
        `The original string was ${this.size(input)} bytes and the compressed string was ${this.size(compressed.toString())} bytes.`
      );

    return compressed;
  }

  /**
   * @description Decompress a string with gzip.
   */
  public decompress(input: Buffer) {
    //const decompressed = gunzipSync(Buffer.from(input, 'base64')).toString('utf8');
    const decompressed = gunzipSync(input).toString('utf8');

    return decompressed;
  }

  /**
   * @description Get the byte size of a string.
   */
  private size(input: string) {
    return new Blob([input]).size;
  }
}
