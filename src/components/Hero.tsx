// import React from 'react'
import { motion } from "framer-motion";

const Hero = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/cv/Harmony_Orakpoyovwuru_cv.pdf`; // `public/` is automatically served
    link.download = "Harmony Orakpoyovwuru CV.pdf";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-2xl"
      >
        I'm{" "}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-4xl text-primary font-medium inline-block"
        >
          Harmony Orakpo
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="text-xl mt-2"
      >
        Frontend Engineer specializing in Angular and React
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-8 flex gap-4"
      >
        <button
          onClick={handleDownload}
          className="bg-primary text-white px-6 py-2 rounded-sm font-medium hover:scale-105 transition-transform"
        >
          My Resume
        </button>
        <button className="border border-primary px-6 py-2 rounded-sm font-medium hover:bg-primary hover:text-white transition-all">
          Let's Talk
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;
