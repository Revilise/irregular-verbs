import { create } from "zustand/react";
import { CookieStorage } from "@shared/lib/storage";
import { merge } from "@shared/lib/utils/objects.ts";
import { type ScoreStore, type ScoreValue, config } from "../config";

export const useScoreStore = create<ScoreStore>((set) => {
    const cookie = CookieStorage.get<ScoreValue>(config.cookieName, config.defaultValue) ?? {};
    const score = merge(cookie, config.defaultValue) as ScoreValue;

    return {
        ...score,
        increment: (isCorrect: boolean) => set(state => ({
            right: isCorrect ? state.right + 1 : state.right,
            total: state.total + 1,
        }))
    }
})