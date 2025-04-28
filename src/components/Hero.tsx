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
    visible: (custom) => ({
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
            <div className="text-sm uppercase tracking-widest  font-medium">
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
                  →
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

          <motion.div variants={itemVariants} className="flex gap-4 mt-4">
            <a
              href="https://github.com"
              className="text-2xl hover:text-primary transition-colors"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              className="text-2xl hover:text-primary transition-colors"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="text-2xl hover:text-primary transition-colors"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Right column - Developer image & graphic elements */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="relative order-first lg:order-last aspect-square max-w-md mx-auto"
        >
          <div className="relative z-10 w-72 h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
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
