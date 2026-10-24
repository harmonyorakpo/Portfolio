import { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route
        path="projects/:id"
        element={
          <Suspense fallback={<div className="min-h-svh" />}>
            <ProjectDetails />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
