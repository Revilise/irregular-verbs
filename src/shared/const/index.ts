/**
 * Состояние “отвечен/ещё ввод” в раунде упражнения.
 * (Вместо `enum`: в проекте включён `erasableSyntaxOnly`.)
 */
export const AnswerPhaseStatus = {
  Idle: "idle",
  Answered: "answered",
} as const;

export type AnswerPhaseStatusValue =
  (typeof AnswerPhaseStatus)[keyof typeof AnswerPhaseStatus];
