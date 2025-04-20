import { IProject } from "../model/project.model";

const Projects = () => {
  const projects: IProject = [
    {
      title: "New Internet Banking",
      number: "01",
      description: "Angular | Bootstrap | RxJs | Chart.js",
      link: "View Project",
    },
    {
      title: "Account Opening Web Engine",
      number: "02",
      description: "Angular | Tailwind | RxJs | Npmjs",
      link: "View Project",
    },
  ];

  return (
    <div className="flex flex-col mb-24">
      {/* Section Heading */}
      <div className="flex flex-col relative mb-12">
        <div className="text-3xl font-semibold">
          <span>Projects</span>
        </div>
        <div className="absolute top-full mt-1 left-0 w-10 h-1 rounded-xs bg-accent"></div>
      </div>

      {/* new section  */}
      <div>
        <hr className="border-gray-800" />
        <div className="flex flex-row justify-between cursor-pointer hover:bg-gray-800 py-8 rounded-md transition duration-300 ease-in-out">
          {/* first div  */}
          <div className="flex flex-row items-center  w-full">
            <span className="pr-5">
              <hr className="border-gray-700 w-24" />
            </span>
            <span className="pr-5 font-thin">01</span>
            <div className="flex flex-col">
              <span className="font-bold text-xl mb-2">
                New Internet Banking
              </span>
              <span className="text-sm">
                Angular | Bootstrap | RxJs | Chart.js{" "}
              </span>
            </div>
          </div>

          {/* second div  */}
          <div className="w-full flex justify-end items-center text-sm font-bold hover:cursor-pointer">
            View Project
          </div>
        </div>
        <hr className="border-gray-800" />
      </div>
    </div>
  );
};

export default Projects;
