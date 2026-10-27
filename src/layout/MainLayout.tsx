import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppProviders from "../app/AppProviders";
import { useApp } from "../app/context";
import Preloader from "../components/chrome/Preloader";
import CommandPalette from "../components/chrome/CommandPalette";
import Cursor from "../components/chrome/Cursor";
import Footer from "../components/chrome/Footer";
import BackToTop from "../components/chrome/BackToTop";

function Shell() {
  const { ready } = useApp();

  useEffect(() => {
    if (!ready) return;
    const id = window.setTimeout(() => void import("../pages/ProjectDetails"), 1200);
    return () => window.clearTimeout(id);
  }, [ready]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-10 z-110 -translate-y-24 rounded-full bg-signal px-4 py-2 font-mono text-xs text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <Preloader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default function MainLayout() {
  return (
    <AppProviders>
      <Shell />
    </AppProviders>
  );
}
