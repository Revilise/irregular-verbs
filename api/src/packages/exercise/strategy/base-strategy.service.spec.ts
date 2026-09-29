import { afterEach, describe, expect, it, vi } from 'vitest';
import { BaseExerciseStrategy } from './base-strategy.service.js';

const dictionary = {
  id: 'go',
  v1: 'go',
  v2: 'went',
  v3: 'gone',
  ipa: '/ɡəʊ/',
  options: [],
};

describe('BaseExerciseStrategy.getForm', () => {
  afterEach(() => vi.restoreAllMocks());

  it.each([0, 1, 2])('preserves form numbers when excluding V%s', (excluded) => {
    const strategy = new BaseExerciseStrategy();
    const random = vi.spyOn(Math, 'random');
    const selected = [0, 0.99].map((value) => {
      random.mockReturnValue(value);
      return strategy.getForm(dictionary, excluded);
    });

    expect(selected.map((form) => form.version)).not.toContain(excluded);
    expect(new Set(selected.map((form) => form.version)).size).toBe(2);
    for (const form of selected) {
      expect(form.value).toBe([dictionary.v1, dictionary.v2, dictionary.v3][form.version]);
    }
  });
});
