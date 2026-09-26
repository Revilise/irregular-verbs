import path from "path";

export const PROJECT_ROOT = path.join(import.meta.dirname, '..', '..', '..');

export const FRONTEND_DIST = path.join(PROJECT_ROOT, "web/dist");

export const PUBLIC_PATH = path.join(PROJECT_ROOT, "api/public");