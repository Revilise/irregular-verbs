export function random({ min, max }: { min?: number, max: number }): number {
  if (!min) {
    return Math.floor(Math.random() * max);
  }

  return Math.floor(Math.random() * (max - min)) + min;
}
