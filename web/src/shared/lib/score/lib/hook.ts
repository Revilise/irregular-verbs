import { useEffect } from "react";
import { CookieStorage } from "@shared/lib/storage";
import { useScoreStore } from "../model";
import { config } from "../config";

export function useScore() {
  const { increment, total, right } = useScoreStore();

  function update(isCorrect: boolean) {
    increment(isCorrect);
  }

  useEffect(() => {
    CookieStorage.set(config.cookieName, { total, right });
  }, [total, right]);

  return {
    updateScore: update,
    score: { total, right },
  };
}
