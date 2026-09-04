import { parse, stringify } from "@shared/lib/utils/json.ts";
import { BaseStorage } from "./base.ts";
import type { CookieStorageOptions } from "../config";

export class CookieStorage extends BaseStorage {
    static type = "cookie";

    static defaultCfg: { options: CookieStorageOptions } = {
        options: {
            path: "/",
            expires: 30,
            secure: true,
        }
    }

    static get<TValue>(name: string, defaultValue?: TValue): TValue | null | undefined {
        const prefix = `${encodeURIComponent(name)}=`.trim();
        const docCookie = document.cookie;

        const start = docCookie.indexOf(prefix);
        if (start === -1) return null;

        const end = docCookie.indexOf(";", start);
        const value = docCookie.substring(start, end === -1 ? docCookie.length : end);

        const decoded = decodeURIComponent(value).replace(prefix, "");
        return parse(decoded, defaultValue) as TValue;
    }

    static set<TValue>(name: string, payload: TValue, options?: CookieStorageOptions) {
        const prefix = `${encodeURIComponent(name)}=`;
        const value = encodeURIComponent(stringify(payload));

        const optionsString = this.getOptionsString(options || this.defaultCfg.options);
        document.cookie = [prefix + value, optionsString].join(";");
    }

    private static getOptionsString(options: CookieStorageOptions): string {
        const { path, domain, sameSite, secure, expires = 0 } = options;
        const expiresDate = expires instanceof Date ? expires : new Date(Date.now() + expires * 1000 * 60 * 24);

        return [
            path && `Path=${path ?? '/'}`,
            domain && `Domain=${domain}`,
            sameSite && `SameSite=${sameSite}`,
            secure && 'Secure',
            expires && `Expires=${expiresDate.toUTCString()}`
        ].filter(Boolean).join(';');
    }
}