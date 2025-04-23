import { IProject } from "../model/project.model";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects: IProject[] = [
    {
      title: "My Portfolio",
      id: "01",
      description: "React | Typescript | Tailwind",
      link: "View Project",
      about: "This is my portfolio website where I showcase my projects and skills.",
      roles:['UI/UX Designer', 'Frontend Developer'],
      responsibility:"Designed and developed the portfolio website using React and Tailwind CSS.",
      technicalStack: [
        "React",
        "Typescript",
        "Tailwind CSS",
        "JavaScript",
        "HTML",
        "CSS",
      ],
      image: "/images/AOWE.png",
    },
    {
      title: "Store Paddy",
      id: "02",
      description: "React | Typescript | Tailwind | Redux",
      link: "View Project",
    },
    {
      title: "New Internet Banking",
      id: "03",
      description: "Angular 19 | Bootstrap | RxJs | Chart.js | Npmjs",
      link: "View Project",
    },
    {
      title: "Account Opening Web Engine",
      id: "04",
      description: "Angular 14 | Tailwind | RxJs | Npmjs",
      link: "View Project",
    },
    {
      title: "API Management Portal",
      id: "05",
      description: "Angular 14 | Tailwind | RxJs | Npmjs",
      link: "View Project",
    },
    {
      title: "Nurse Ready Admin Portal",
      id: "06",
      description: "Angular 14 | Primefaces | RxJs ",
      link: "View Project",
    },
    {
      title: "Touchstone Exam Portal",
      id: "07",
      description: "Angular 19 | Primefaces | RxJs | NgXS | Signals",
      link: "View Project",
    },
  ];

  return (
    <div className="flex flex-col mb-24">
      <SectionHeader title="Projects" />

      {projects.map((project, index) => (
        <div key={index}>
          <hr className="border-gray-900" />
          <Link
            to={`/projects/${project.id}`}
            state= {{project}}
            className="w-full block hover:bg-gray-900 rounded-md transition duration-300 ease-in-out"
          >
            <div className="flex flex-row justify-between cursor-pointer py-8">
              <div className="flex flex-row items-center w-full">
                <span className="pr-5">
                  <hr className="border-gray-800 w-24" />
                </span>
                <span className="pr-5 font-thin">{project.id}</span>
                <div className="flex flex-col">
                  <span className="font-bold text-xl mb-2">{project.title}</span>
                  <span className="text-sm">{project.description}</span>
                </div>
              </div>

              <div className="w-full flex justify-end items-center text-sm font-semibold pr-5 hover:text-primary">
                {project.link}
              </div>
            </div>
          </Link>
          <hr className="border-gray-900" />
        </div>
      ))}
    </div>
  );
};

export default Projects;
