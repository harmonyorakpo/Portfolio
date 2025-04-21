import { IProject } from "../model/project.model";
import SectionHeader from "./SectionHeader";

const Projects = () => {
  const projects: IProject[] = [
    {
      title: "My Portfolio",
      number: "01",
      description: "React | Typescript | Tailwind",
      link: "View Project",
    },
    {
      title: "New Internet Banking",
      number: "02",
      description: "Angular 19 | Bootstrap | RxJs | Chart.js | Npmjs",
      link: "View Project",
    },
    {
      title: "Account Opening Web Engine",
      number: "03",
      description: "Angular 14 | Tailwind | RxJs | Npmjs",
      link: "View Project",
    },
    {
      title: "API Management Portal",
      number: "04",
      description: "Angular 14 | Tailwind | RxJs | Npmjs",
      link: "View Project",
    },
    {
      title: "Propertly",
      number: "05",
      description: "Angular 19 | Tailwind | RxJs | Npmjs | Signals",
      link: "View Project",
    },
    {
      title: "Nurse Ready Admin Portal",
      number: "06",
      description: "Angular 14 | Primefaces | RxJs ",
      link: "View Project",
    },
    {
      title: "Touchstone Exam Portal",
      number: "07",
      description: "Angular 19 | Primefaces | RxJs | NgXS | Signals",
      link: "View Project",
    },
  ];

  return (
    <div className="flex flex-col mb-24">
      <SectionHeader title="Projects" />

      {/* Project List */}
      {projects.map((project, index) => (
        <div key={index}>
          <hr className="border-gray-800" />
          <div className="flex flex-row justify-between cursor-pointer hover:bg-gray-800 py-8 rounded-md transition duration-300 ease-in-out">
            {/* Left Section */}
            <div className="flex flex-row items-center w-full">
              <span className="pr-5">
                <hr className="border-gray-700 w-24" />
              </span>
              <span className="pr-5 font-thin">{project.number}</span>
              <div className="flex flex-col">
                <span className="font-bold text-xl mb-2">{project.title}</span>
                <span className="text-sm">{project.description}</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full flex justify-end items-center text-sm font-semibold pr-5 hover:text-primary">
              {project.link}
            </div>
          </div>
          <hr className="border-gray-800" />
        </div>
      ))}
    </div>
  );
};

export default Projects;
