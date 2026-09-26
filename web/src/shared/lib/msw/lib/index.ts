import {delay, http, HttpHandler, HttpResponse} from "msw";
import {API_URL} from "@shared/const";

export function createMockHandler({ url, method, resp, delay: delaySec = 0 }: {
    url: `/${string}`,
    method: keyof typeof http,
    resp: object,
    delay?: number
}): HttpHandler {
    const requestUrl = `${API_URL.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

    return http[method](requestUrl, async () => {
        if (delaySec > 0) await delay(delaySec);
        return HttpResponse.json(resp);
    });
}
