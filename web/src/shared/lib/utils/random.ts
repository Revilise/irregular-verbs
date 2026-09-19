export function random({
  min = 0,
  max,
}: {
  min?: number;
  max: number;
}): number {
  if (!min) {
    return Math.floor(Math.random() * max);
  }

  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomSequence({
  min = 0,
  max,
  count,
}: {
  min?: number;
  max: number;
  count?: number;
}) {
  const length = count ?? max - min + 1;

  const numbers = Array.from({ length }, (_, index) => min + index);

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
}

export function shuffle<T>(array: T[]) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
