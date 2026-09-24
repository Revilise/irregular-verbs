import {useState} from "react";

type PhaseTypes = "start" | "finish" | "complete";

export function useAnimate({ phases, defaultPhase = "complete" }: {
    phases: { start: string, finish: string, complete: string },
    defaultPhase?: PhaseTypes,
}) {
    const [phase, setPhase] = useState<string>(defaultPhase);

    function start(delay: number = 0): Promise<void> {
        setPhase(phases.start);
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    function finish(delay: number = 0) {
      setPhase(phases.finish);
      return new Promise(resolve => setTimeout(resolve, delay));
    }

    function complete() {
        setPhase(phases.complete);
    }

    return {
        phase: phase,
        start,
        finish,
        complete
    }
}