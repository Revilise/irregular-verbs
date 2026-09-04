/**
 * Безопасно парсит JSON-строку.
 *
 * @param raw JSON-строка
 * @param defaultValue Значение при ошибке парсинга
 * @returns Распаршенное значение или значение по умолчанию
 */
export function parse<T>(raw: string, defaultValue?: T): T | string | undefined {
    try {
        return JSON.parse(raw) as T;
    }
    catch {
        return defaultValue || raw;
    }
}


/**
 * Преобразует значение в JSON-строку.
 *
 * @param raw Значение для преобразования
 * @returns JSON-строка или исходное значение при ошибке
 */
export function stringify(raw: unknown): string {
    try {
        return JSON.stringify(raw);
    } catch {
        return String(raw);
    }
}