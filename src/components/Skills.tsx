import { motion } from "framer-motion";
import { ISkillCategory } from "../model/project.model";
import SectionHeader from "./SectionHeader";

const skillsData: ISkillCategory[] = [
  {
    title: "Libraries/ Others",
    skills: [
      { name: "RxJs" },
      { name: "NGXS" },
      { name: "Signals" },
      { name: "Angular Material" },
      { name: "Cypress" },
      { name: "Redux" },
      { name: "Tailwind CSS" },
      { name: "Figma" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "SASS/SCSS" },
      { name: "ES6+ Javascript" },
      { name: "Typescript" },
      { name: "MSSQL" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React.js" },
      { name: "Angular" },
      { name: "PrimeFaces" },
    ],
  },
];

const Skills: React.FC = () => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for each category
  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  };

  // Animation variants for each skill item
  const skillVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      } 
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <SectionHeader title="My skills" />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {skillsData.map((category, index) => (
          <motion.div 
            key={index} 
            className="skill-category"
            variants={categoryVariants}
          >
            <motion.h2 
              className="text-lg font-bold mb-5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {category.title}
            </motion.h2>
            <motion.ul 
              className="list-none p-0"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {category.skills.map((skill, skillIndex) => (
                <motion.li
                  key={skillIndex}
                  className="mb-2 text-gray-400 flex items-center"
                  variants={skillVariants}
                  transition={{ delay: skillIndex * 0.05 }}
                  whileHover={{ 
                    x: 5, 
                    color: "#fff",
                    transition: { duration: 0.2 } 
                  }}
                >
                  <span className="mr-2">•</span>
                  {skill.name} {skill.emoji && <span>{skill.emoji}</span>}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Skills;