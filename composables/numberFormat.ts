/**
 * formats a Number to a String with language-sensitive Thousands separator
 * @param number the number to be formatted
 * @returns String with language-sensitive thousands separator
 */
export function numberFormat(number: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number)
}
