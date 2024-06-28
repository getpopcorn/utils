/**
 * @description TODO
 */
export function getRequestBody(message: unknown): string | ArrayBuffer | Uint8Array | null {
  if (message) {
    if (message instanceof ArrayBuffer || message instanceof Uint8Array) return message;
    if (typeof message === 'object') return JSON.stringify(message);
    if (typeof message === 'string') return message;
    if (typeof message === 'number') return message.toString();
  }

  return null;
}
