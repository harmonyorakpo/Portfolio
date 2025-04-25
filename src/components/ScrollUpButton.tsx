import { useState, useEffect } from "react";

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {  // Adjust the scroll value as needed
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
    onClick={scrollToTop}
    className={`fixed bottom-6 right-6 w-12 h-12 rounded-full border-2 border-gray-50 border-opacity-15 flex items-center justify-center shadow-lg ${isVisible ? "block" : "hidden"} animate-bounce`}
    aria-label="Scroll to top"
  >
    ↑
  </button>
  
  );
};

export default ScrollUpButton;
