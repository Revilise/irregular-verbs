import "@app/style/index.pcss";

import { Layout } from "@shared/ui/layout";
import {ExercisePage} from "../pages/exercise.tsx";

export default function App() {
  return (
    <Layout>
      <ExercisePage />
    </Layout>
  );
}
