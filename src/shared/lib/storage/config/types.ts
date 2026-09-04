export type CookieSameSite = 'Strict' | 'Lax' | 'None';

export type CookieStorageOptions = {
    /**
     * Дата истечения cookie.
     * Если передать число — оно трактуется как количество секунд от текущего момента.
     */
    expires?: Date | number;

    /**
     * Путь, на котором cookie будет доступна.
     * Обычно используется `/`.
     */
    path?: string;

    /**
     * Домен, для которого доступна cookie.
     * Например: `.example.com`.
     */
    domain?: string;

    /**
     * Передавать cookie только по HTTPS.
     * Для SameSite=None это обязательно в современных браузерах.
     */
    secure?: boolean;

    /**
     * Ограничение отправки cookie при межсайтовых запросах.
     */
    sameSite?: CookieSameSite;
};