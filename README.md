# Irregular Words

NestJS API в `api/`, React/Vite в `web/`. Nx управляет сборкой и запуском;
у приложений остаются собственные `package.json` и lock-файлы.

## Установка

Используйте Node.js 24 LTS.

```sh
npm ci
npm run setup
```

## Запуск

### Docker

Запуск через Docker Compose из корня проекта:

```sh
docker compose up -d --build
```

Приложение доступно на http://localhost:3000. Для другого внешнего порта:
`PORT=3001 docker compose up -d --build`.
Адрес API фронтенда задаётся при сборке через `VITE_API` (по умолчанию `/api`).
Просмотр логов: `docker compose logs -f app`. Остановка: `docker compose down`.

Сборка и запуск без Compose:

Из корня проекта:

```sh
docker build -t irregular-words .
docker run --rm -p 3000:3000 irregular-words
```

Приложение доступно на http://localhost:3000. Образ включает API, фронтенд
и публичный словарь; сервер запускается от пользователя `node`.
Локальные `.env` не включаются в образ. Адрес API для фронтенда можно задать
при сборке: `docker build --build-arg VITE_API=/api -t irregular-words .`.
Для другого порта сервера: `docker run --rm -e PORT=3001 -p 3001:3001 irregular-words`.

### Локально

```sh
npm start
```

Nx сначала собирает API и web, затем запускает API. Сервер отдаёт готовый
`web/dist` на http://localhost:3000, API доступен по `/api`, публичные файлы —
по `/public`. Порт можно изменить: `PORT=3001 npm start`.

Эквивалентная команда: `npx nx run api:serve`.

```sh
npm run build       # Только сборка обоих приложений
npm run build:start # Сборка обоих приложений, затем запуск сервера с фронтендом
npm run start:dev   # Сборка web, затем API с перезапуском при изменениях
```

В `start:dev` web собирается один раз. После изменения фронтенда выполните
`npx nx build web` и обновите страницу либо перезапустите команду.

По умолчанию фронтенд обращается к `/api` на том же сервере. `VITE_API` в
окружении или `web/.env` переопределяет адрес во время сборки. Для совместного
запуска задайте `VITE_API=/api` или удалите это переопределение.

Сборки кешируются локально в `.nx/`. Для принудительной пересборки:
`npm run build -- --skip-nx-cache`.

Старый клиентский модуль `web/src/feature/_exercise` исключён из TypeScript-сборки:
он использует удалённый локальный словарь; актуальный модуль — `widgets/exercise`.
