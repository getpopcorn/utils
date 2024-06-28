/**
 * @description Check if a string input can be unwrapped as a JSON object.
 */
export function isJson(str: string): Record<string, unknown> | boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
