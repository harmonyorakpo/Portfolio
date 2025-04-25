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

  // Add the CSS animation to the document head
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    // Define the keyframes animation
    styleEl.innerHTML = `
      @keyframes smoothBounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
    `;
    // Append to the head of the document
    document.head.appendChild(styleEl);

    // Clean up
    return () => {
      document.head.removeChild(styleEl);
    };
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
      className={`fixed bottom-6 right-6 w-12 h-12 rounded-full border-2 border-gray-50 border-opacity-15 flex items-center justify-center shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } hover:bg-gray-100 hover:bg-opacity-10`}
      style={{
        animation: isVisible ? "smoothBounce 2s infinite ease-in-out" : "none"
      }}
      aria-label="Scroll to top"
    >
      <span className="text-xl">↑</span>
    </button>
  );
};

export default ScrollUpButton;