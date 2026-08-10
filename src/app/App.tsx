import "@app/style/index.pcss";

import { Layout } from "@shared/ui/layout";
import { Exercise } from "../pages/exercise.tsx"

export default function App() {
  return (
    <Layout>
      <Exercise />
    </Layout>
  );
}
