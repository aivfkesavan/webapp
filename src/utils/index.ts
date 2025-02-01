
export const delay = (ms: number = 1000) => new Promise(res => setTimeout(res, ms))

export function generateNumberArray(n: number): number[] {
  if (n <= 0) throw new Error("Input must be a positive integer.")
  return Array.from({ length: n }, (_, i) => i + 1)
}

export function getRandNumber(min: number = 20, max: number = 70): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
