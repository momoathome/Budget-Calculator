/**
 * formats a Number to a String with language-sensitive Thousands separator
 * @param {number} number the number to be formatted
 * @returns String with language-sensitive thousands separator
 */
export function numberFormat(number: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number)
}

/**
 * Parse a localized number to a float.
 * @param {string} stringNumber - the localized number
 * @param {string} locale - [optional] the locale that the number is represented in. Omit this parameter to use the current locale.
 */
export function parseLocaleNumber(stringNumber: string, locale?: string): number {
  const thousandSeparator = Intl.NumberFormat(locale).format(11111).replace(/\p{Number}/gu, '')
  const decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/\p{Number}/gu, '')

  return Number.parseFloat(stringNumber
    .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
    .replace(new RegExp(`\\${decimalSeparator}`), '.'),
  )
}
