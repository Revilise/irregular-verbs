import { useEffect, useState } from "react";

type Fetcher<TResult, TPayload> = (options: { signal: AbortSignal, payload: TPayload }) => Promise<TResult>;

type Options<TResult, TPayload> = { defaultValue?: TResult } & (
    [TPayload] extends [undefined] ? { immediately?: boolean } : { immediately: false }
);

type FetchArguments<TPayload> = [TPayload] extends [undefined]
    ? [payload?: TPayload]
    : [payload: TPayload];

type Result<TResult, TPayload> = {
    data: TResult | null,
    error: Error | null,
    isFetching: boolean,
    fetch(...args: FetchArguments<TPayload>): Promise<TResult | void | undefined>,
    reset(): void,
}

export function useClient<TResponse, TPayload = undefined>(fetcher: Fetcher<TResponse, TPayload>, options: Options<TResponse, TPayload>): Result<TResponse, TPayload> {
    const { defaultValue = null, immediately = true } = options;

    const [data, setData] = useState<TResponse | null>(defaultValue);
    const [error, setError] = useState<Error | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(immediately);
    const [controller, setController] = useState<AbortController | null>(new AbortController());

    async function fetch(payload?: TPayload) {
        const controller = new AbortController()

        setIsFetching(true);
        setError(null);
        setController(controller);

        return fetcher({ payload: payload as TPayload, signal: controller.signal })
            .then(resp => {
                if (!controller.signal.aborted) {
                    setData(resp);
                    return resp;
                }
            })
            .catch(error => {
                if (!controller.signal.aborted) {
                    setError(error);
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setIsFetching(false);
                }
            })
    }

    function reset() {
        setData(null);
    }

    useEffect(() => {
        if (immediately) {
            void fetch();
        }
        return () => controller?.abort();
    }, [fetcher]);

    return { fetch, reset, isFetching, error, data };
}
