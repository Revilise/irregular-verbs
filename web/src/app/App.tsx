import { lazy, Suspense } from "react";
import { Layout } from "@shared/ui/layout";

const ExercisePage = lazy(() => import("../pages/exercise.tsx"));

export default function App() {
  return (
    <Layout>
      <Suspense>
        <ExercisePage />
      </Suspense>
    </Layout>
  );
}
