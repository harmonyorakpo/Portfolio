import { useState, useEffect, useCallback, memo } from "react";

const ScrollUpButton = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 500);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 w-12 h-12 rounded-full border-2 border-gray-50 border-opacity-15 flex items-center justify-center shadow-lg transition-opacity duration-300 hover:bg-gray-100 hover:bg-opacity-10 ${
        isVisible ? "opacity-100 animate-bounce-smooth" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <span className="text-xl">↑</span>
    </button>
  );
});

ScrollUpButton.displayName = "ScrollUpButton";

export default ScrollUpButton;
