// import React from 'react'

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
      { name: "Angular 2+" },
      { name: "Angular 19" },
      { name: "PrimeFaces" },
    ],
  },

];

const Skills: React.FC<ISkillCategory[]> = () => {
  return (
    <>
      <SectionHeader title="My skills" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsData.map((category, index) => (
          <div key={index} className="skill-category">
            <h2 className="text-lg font-bold mb-5">
              {category.title}
            </h2>
            <ul className="list-none p-0">
              {category.skills.map((skill, skillIndex) => (
                <li
                  key={skillIndex}
                  className="mb-2 text-gray-400 flex items-center"
                >
                  <span className="mr-2">•</span>
                  {skill.name} {skill.emoji && <span>{skill.emoji}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Skills;
