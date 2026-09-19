import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@app/style/index.pcss";
import { initClientMsw } from "@shared/lib/msw";

async function bootstrap() {
  await initClientMsw();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void bootstrap();
