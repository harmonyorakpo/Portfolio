import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/cv/Harmony_Orakpoyovwuru_cv.pdf`;
    link.download = "Harmony Orakpoyovwuru CV.pdf";
    link.click();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  const shapeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom : number) => ({
      opacity: 0.7,
      scale: 1,
      transition: {
        delay: 0.5 + custom * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center px-4 sm:px-8 lg:px-16">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-0 left-0 w-full h-full bg-grid-pattern"
        />
        <motion.div
          custom={0}
          variants={shapeVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary opacity-5"
        />
        <motion.div
          custom={1}
          variants={shapeVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-primary opacity-5"
        />
        <motion.div
          custom={2}
          variants={shapeVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-primary opacity-5"
        />
      </div>

      {/* Main content container */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column - Text content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="flex flex-col space-y-6 max-w-lg"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="text-sm text-accent-dark uppercase tracking-widest  font-medium">
              Frontend Engineer
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
              I'm <span className="text-primary">Harmony</span> Orakpoyovwuru
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg opacity-80">
            Crafting exceptional user experiences with Angular and React.
            Transforming ideas into interactive, performant web applications.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="py-4 flex flex-wrap gap-4"
          >
            <button
              onClick={handleDownload}
              className="bg-primary text-white px-8 py-3 rounded-md font-medium hover:scale-105 transition-all shadow-lg shadow-primary/20 group"
            >
              <span className="flex items-center gap-2">
                <span>My Resume</span>
                <span className="group-hover:translate-x-1 transition-transform">
                ↓
                </span>
              </span>
            </button>
            <button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="border-2 border-primary px-8 py-3 rounded-md font-medium hover:bg-primary hover:text-white transition-all group"
            >
              <span className="flex items-center gap-2">
                <span>Let's Talk</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  ↘
                </span>
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right column - Developer image & graphic elements */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="relative order-first lg:order-last aspect-square max-w-md mx-auto hidden sm:block mr-4" 
        >
          <div className="relative z-10 w-72 h-72 rounded-full overflow-hidden border-2 border-primary/20 shadow-xl">
            <img
              src="/images/Harmony.jpg"
              alt="Harmony Orakpoyovwuru"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
