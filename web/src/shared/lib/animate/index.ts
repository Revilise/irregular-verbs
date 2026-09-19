import {useState} from "react";

type PhaseTypes = "start" | "finish" | "complete";

export function useAnimate({ phases, defaultPhase = "complete" }: {
    phases: { start: string, finish: string, complete: string },
    defaultPhase?: PhaseTypes,
}) {
    const [phase, setPhase] = useState<string>(defaultPhase);

    function start(delay: number = 0) {
        setPhase(phases.start);
        if (delay > 0) setTimeout(finish, delay);
    }

    function finish(delay: number = 0) {
        setPhase(phases.finish);
        if (delay > 0) setTimeout(complete, delay);
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