import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useApp } from "../app/context";
import { ScrollTrigger } from "../lib/gsap";
import { useScrollFx } from "../hooks/useScrollFx";
import Hero from "../components/sections/Hero";
import Prologue from "../components/sections/Prologue";
import FeaturedWork from "../components/sections/FeaturedWork";
import Archive from "../components/sections/Archive";
import Capabilities from "../components/sections/Capabilities";
import Interlude from "../components/sections/Interlude";
import UnderTheHood from "../components/sections/UnderTheHood";
import Contact from "../components/sections/Contact";

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const { ready, scrollTo } = useApp();
  const { hash } = useLocation();

  useScrollFx(root, "paper");

  useEffect(() => {
    if (!ready || !hash) return;
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      scrollTo(hash, { immediate: true });
    });
    return () => cancelAnimationFrame(id);
  }, [ready, hash, scrollTo]);

  return (
    <div ref={root}>
      <Hero />
      <Prologue />
      <FeaturedWork />
      <Archive />
      <Capabilities />
      <Interlude />
      <UnderTheHood />
      <Contact />
    </div>
  );
}
