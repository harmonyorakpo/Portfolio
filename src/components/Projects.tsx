import { memo } from "react";
import { motion, Variants } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";
import { projects } from "../data/projects.data";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
};

const Projects = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col mb-24 px-4 sm:px-6 md:px-12 lg:px-24 max-w-screen-xl mx-auto"
    >
      <SectionHeader title="Projects" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col"
      >
        <hr className="border-gray-900" />

        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={item}
            className="flex flex-col w-full"
          >
            <Link
              to={`/projects/${project.id}`}
              state={{ project }}
              className="block hover:bg-gray-900 rounded-md transition duration-300 ease-in-out w-full"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex flex-col md:flex-row justify-between py-6 px-2 sm:px-4 md:px-6 lg:px-8 cursor-pointer gap-4"
              >
                <div className="flex flex-row items-start md:items-center w-full gap-4">
                  <span className="font-thin text-gray-500">{project.id}</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg sm:text-xl text-white mb-1">
                      {project.title}
                    </span>
                    <span className="text-sm text-gray-300">
                      {project.description}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-start md:justify-end text-sm font-semibold text-gray-400 hover:text-primary w-auto md:w-full">
                  {project.link}
                </div>
              </motion.div>
            </Link>
            <hr className="border-gray-900" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
});

Projects.displayName = "Projects";

export default Projects;
