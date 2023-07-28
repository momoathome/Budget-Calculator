/**
 * generates a random number between the specified min and max values, inclusive min and max
 * @param min the minimum value
 * @param max the maximum value
 * @returns a random number between the specified min and max
 */
export function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}
