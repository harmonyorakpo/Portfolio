import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../components/BackButton";
import { motion } from "framer-motion";
import ViewProject from "../components/ViewProject";

const ProjectDetails = () => {
  const location = useLocation();
  const project = location.state?.project;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="p-4 md:p-10 text-red-500 text-center">
        Project data not found. Please go back and select a project.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="px-4 md:px-8 lg:px-20 py-8 max-w-5xl mx-auto"
    >
      <BackButton className="mb-6" />
      <h1 className="text-2xl md:text-3xl font-bold mb-12 text-center">
        {project.title}
      </h1>
      <motion.span
        className="flex items-center justify-center mb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full max-w-3xl rounded-lg"
          />
        )}
      </motion.span>
      <Section title="ABOUT THIS PROJECT">
        <span className="text-sm sm:text-base">{project.about}</span>
      </Section>
      <Section title="ROLES IN PROJECT">
        <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
          {project.roles.map((role: string, index: number) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      </Section>
      <Section title="MY RESPONSIBILITIES AND FEATURES IMPLEMENTED">
        <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
          {project.responsibilities.map(
            (responsibility: string, index: number) => (
              <li key={index}>{responsibility}</li>
            )
          )}
        </ul>
      </Section>
      <Section title="TECHNICAL SHEET">
        <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
          {project.technicalStack.map((techStack: string, index: number) => (
            <li key={index}>{techStack}</li>
          ))}
        </ul>
      </Section>
      {project.url && <ViewProject url={project.url} />}
    </motion.div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    className="flex flex-col mb-10"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <span className="text-lg sm:text-xl font-semibold mb-3">{title}</span>
    {children}
  </motion.div>
);

export default ProjectDetails;
