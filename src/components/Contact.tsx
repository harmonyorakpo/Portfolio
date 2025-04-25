import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-4 sm:px-6 md:px-8 lg:px-16" // Responsive padding
    >
      <SectionHeader title="Get In Touch" />

      <div className="flex flex-col space-y-4 text-sm md:text-lg mb-12">
        <div>
          <span className="font-semibold">Email:</span>{' '}
          <a
            href="mailto:harmonyorakpo@gmail.com"
            className="underline text-primary hover:text-primary-dark transition-colors duration-200"
          >
            harmonyorakpo@gmail.com
          </a>
        </div>

        <div>
          <span className="font-semibold">Phone:</span>{' '}
          <span>+234 706 291 2340</span>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;
