import { motion } from "framer-motion";

const Hero = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/cv/Harmony_Orakpoyovwuru_cv.pdf`;
    link.download = "Harmony Orakpoyovwuru CV.pdf";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] text-center overflow-hidden px-4 sm:px-8 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg sm:text-xl md:text-2xl"
      >
        I'm{" "}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-2xl sm:text-3xl md:text-5xl text-primary font-medium inline-block"
        >
          Harmony Orakpoyovwuru
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="text-base sm:text-lg md:text-xl mt-2 max-w-2xl"
      >
        Frontend Engineer specializing in Angular and React
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-8 flex flex-wrap justify-center gap-4"
      >
        <button
          onClick={handleDownload}
          className="bg-primary text-white px-6 py-2 rounded-sm font-medium hover:scale-105 transition-transform"
        >
          My Resume
        </button>
        <button
          onClick={() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="border border-primary px-6 py-2 rounded-sm font-medium hover:bg-primary hover:text-white transition-all"
        >
          Let's Talk
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;
