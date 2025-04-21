import React from "react";

interface SectionHeaderProps {
  title: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="flex flex-col relative mb-12">
      <div className="text-3xl font-semibold">
        <span>{title}</span>
      </div>
      <div className="absolute top-full mt-1 left-0 w-10 h-1 rounded-xs bg-primary"></div>
    </div>
  );
};

export default SectionHeader;
