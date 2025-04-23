import { useLocation } from "react-router-dom";

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
      <h1 className="text-3xl font-bold mb-16">{project.title}</h1>
      <span className="flex items-center justify-center mb-12">
        <img src={project.image} alt={project.title} className="mb-4 w-4/6" />
      </span>

<div className="flex flex-col" >

    <span className="text-3xl font-semibold mb-6" >ABOUT THIS PROJECT</span>
    <span>{project.about}</span>
</div>

      <p className="text-lg text-gray-300 mb-6">{project.description}</p>
      {/* <a
        href="#"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
      >
        {project.link}
      </a> */}
    </div>
  );
};

export default ProjectDetails;
