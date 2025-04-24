import { useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";

const ProjectDetails = () => {
  // const { id } = useParams();
  const location = useLocation();
  const project = location.state?.project;

  console.log(project);

  if (!project) {
    return (
      <div className="p-10 text-red-500">
        Project data not found. Please go back and select a project.
      </div>
    );
  }

  return (
    <div className="p-10">


      <BackButton className="mb-6" />

      <h1 className="text-3xl font-bold mb-16">{project.title}</h1>
      <span className="flex items-center justify-center mb-12">
        <img src={project.image} alt={project.title} className="mb-4 w-4/6" />
      </span>

      <div className="flex flex-col mb-10">
        <span className="text-xl font-semibold mb-3">ABOUT THIS PROJECT</span>
        <span>{project.about}</span>
      </div>

      <div className="flex flex-col mb-10">
        <span className="text-xl font-semibold mb-3">ROLES IN PROJECT</span>
        <ul className="list-disc list-inside text-sm space-y-1">
          {project.roles.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col mb-10">
        <span className="text-xl font-semibold mb-3">MY REPONSIBILITIES AND FEATURES IMPLEMENTED</span>
        <ul className="list-disc list-inside text-sm space-y-1">
          {project.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col mb-10">
        <span className="text-xl font-semibold mb-3">TECHNICAL SHEET</span>
        <ul className="list-disc list-inside text-sm space-y-1">
          {project.technicalStack.map((techStack, index) => (
            <li key={index}>{techStack}</li>
          ))}
        </ul>
      </div>


    </div>
  );
};

export default ProjectDetails;
