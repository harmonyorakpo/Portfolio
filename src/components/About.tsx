import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-24 px-4 sm:px-6 md:px-12 lg:px-24 max-w-screen-xl mx-auto"
    >
      <SectionHeader title="About Me" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="leading-relaxed text-base sm:text-lg"
      >
        I'm Harmony, a Frontend Developer with 4 years of experience building
        scalable, user-focused web applications. Before diving into
        development, I spent a year as a UI/UX designer — a foundation that
        still shapes how I approach every interface I build. I'm proficient in
        both modular and standalone Angular, confident with React, and
        experienced in crafting clean, reusable components with a strong focus
        on accessibility, responsiveness, and polished design.
      </motion.div>
    </motion.div>
  );
}

export default About;
