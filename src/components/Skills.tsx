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

      <div
        className="skills-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >
        {skillsData.map((category, index) => (
          <div key={index} className="skill-category">
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {category.title}
            </h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {category.skills.map((skill, skillIndex) => (
                <li
                  key={skillIndex}
                  style={{
                    marginBottom: "10px",
                    color: "#aaaaaa",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>•</span>
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
