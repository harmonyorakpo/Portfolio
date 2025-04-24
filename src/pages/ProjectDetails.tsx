import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../components/BackButton";
import { motion } from "framer-motion";

const ProjectDetails = () => {
  // const { id } = useParams();
  const location = useLocation();
  const project = location.state?.project;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(project);

  if (!project) {
    return (
      <div className="p-10 text-red-500">
        Project data not found. Please go back and select a project.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-10"
    >
      <BackButton className="mb-6" />

      <h1 className="text-3xl font-bold mb-16">{project.title}</h1>
      <motion.span
        className="flex items-center justify-center mb-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      >
        {project.image && (
          <img src={project.image} alt={project.title} className="mb-4 w-4/6" />
        )}
      </motion.span>

      <motion.div
        className="flex flex-col mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <span className="text-xl font-semibold mb-3">ABOUT THIS PROJECT</span>
        <span>{project.about}</span>
      </motion.div>

      <motion.div
        className="flex flex-col mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <span className="text-xl font-semibold mb-3">ROLES IN PROJECT</span>
        <ul className="list-disc list-inside text-sm space-y-1">
          {project.roles.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className="flex flex-col mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <span className="text-xl font-semibold mb-3">MY REPONSIBILITIES AND FEATURES IMPLEMENTED</span>
        <ul className="list-disc list-inside text-sm space-y-1">
          {project.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className="flex flex-col mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <span className="text-xl font-semibold mb-3">TECHNICAL SHEET</span>
        <ul className="list-disc list-inside text-sm space-y-1">
          {project.technicalStack.map((techStack, index) => (
            <li key={index}>{techStack}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;