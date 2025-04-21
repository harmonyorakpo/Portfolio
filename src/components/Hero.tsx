import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Import your background images
import bg1 from '/images/bg1.jpg';
import bg2 from '/images/bg2.jpg';
import bg3 from '/images/bg3.jpg';
import bg4 from '/images/bg4.jpg';
import bg5 from '/images/bg5.jpg';
import bg6 from '/images/bg6.jpg';

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const backgroundGridRef = useRef<HTMLDivElement | null>(null);


  const goldenRatio = 1.618;
  const baseFontSize = 2; // rem
  const titleFontSize = baseFontSize * goldenRatio;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `/cv/Harmony_Orakpoyovwuru_cv.pdf`; 
    link.download = 'Harmony_Orakpoyovwuru_CV.pdf';
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link); 
  };

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const backgroundGrid = backgroundGridRef.current;
  
    if (!backgroundGrid) return;
  
    const backgroundImages = backgroundGrid.children;
  
    // GSAP Animations
    gsap.fromTo(
      title,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
    );
  
    gsap.fromTo(
      subtitle,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
    );
  
    gsap.fromTo(
      backgroundImages,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
    );
  
    gsap.to(scrollIndicator, {
      y: 10,
      duration: 0.8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: 1.5,
    });
  
    const handleKeyDown = (event: KeyboardEvent) => {
      const el = scrollIndicatorRef.current;
      if (event.key === 'Enter' && el && el.classList.contains('hidden')) {
        el.classList.remove('hidden');
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-60px)] text-center overflow-hidden">
      {/* Background Grid */}
      <div
        ref={backgroundGridRef}
        className="absolute inset-0 grid grid-cols-6 md:grid-cols-6  overflow-hidden z-[-1]"
      >
        {[bg1, bg2, bg3, bg4, bg5, bg6].map((bg, index) => (
          <div
            key={index}
            className="w-full h-full bg-cover bg-center transition-all duration-300"
            style={{
              backgroundImage: `url(${bg})`,
              filter: `hue-rotate(${
                (index * 60) % 360
              }deg) grayscale(0.8)`, // Apply color filter
            }}
          />
        ))}
      </div>

      <div className="text-2xl">
        I'm{' '}
        <span
          ref={titleRef}
          className="text-[${titleFontSize}rem] text-primary font-medium inline-block"
          style={{ fontSize: `${titleFontSize}rem` }}
        >
          Harmony Orakpo
        </span>
      </div>
      <div ref={subtitleRef} className="text-xl mt-2">
        Frontend Engineer specializing in Angular and React
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={handleDownload}
          className="bg-primary text-white px-6 py-2 rounded-sm font-medium hover:bg-primary/80 transition-colors duration-200"
        >
          My Resume
        </button>
        <button className="border border-primary px-6 py-2 rounded-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200">
          Let's Talk
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute right-4 bottom-4 text-primary text-2xl animate-bounce hidden flex flex-col items-center"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;