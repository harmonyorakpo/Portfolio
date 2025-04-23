import { useLocation, useParams } from "react-router-dom";
import { IProject } from "../model/project.model";

// const projectData: IProject[] = [
// ];

const ProjectDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const project = location.state?.project as IProject | undefined;

  console.log("Retrieved Project:", project);
  console.log("URL Param ID:", id);

  if (!project) {
    return <div className="text-red-500">Project not found!</div>;
  }

  return (
    <div className="p-8">
     
      {/* <h1 className="text-3xl font-bold">{project.title}</h1> */}
      <p className="text-lg mt-4">{project.description}</p>
    </div>
  );
};

export default ProjectDetails;
