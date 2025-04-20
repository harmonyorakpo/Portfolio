// import React from 'react'

const Hero = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `public/cv/Harmony_Orakpoyovwuru_cv.pdf`;
    link.download = "Harmony Orakpoyovwuru CV.pdf";
    link.click();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] text-center">
        <div className="text-2xl">
          I'm{" "}
          <span className="text-4xl text-primary font-medium">
            Harmony Orakpo
          </span>
        </div>
        <div className="text-xl mt-2">
          Frontend Engineer specializing in Angular and React
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleDownload}
            className="bg-primary text-white px-6 py-2 rounded-sm font-medium"
          >
            My Resume
          </button>
          <button className="border border-primary px-6 py-2 rounded-sm font-medium">
            Let's Talk
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
