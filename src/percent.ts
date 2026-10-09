/**
 * What share of `whole` the `part` is, as a percentage rounded to one decimal
 * place. Signs are ignored, so a category's spend can be compared with the
 * total spend directly. A zero whole is 0%, not NaN.
 */
export function percentOf(part: number, whole: number): number {
  if (whole === 0) {
    return 0;
  }
  return Math.round((Math.abs(part) / Math.abs(whole)) * 1000) / 10;
}
