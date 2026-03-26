import { ExternalLink } from "lucide-react";

interface ViewProjectProps {
  url: string;
}

const ViewProject = ({ url }: ViewProjectProps) => {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="flex justify-end w-full">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 text-xs border border-white p-2 rounded-sm hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out"
      >
        <span>View Project</span>
        <ExternalLink size={14} />
      </button>
    </div>
  );
};

export default ViewProject;
