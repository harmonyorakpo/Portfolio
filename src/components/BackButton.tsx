import { useNavigate } from "react-router-dom";
import {  ChevronLeft } from "lucide-react";
import React from "react";

interface BackButtonProps {
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label = "Back", className }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center justify-center gap-1 text-lg font-mdium ${className}`}
    >
      <ChevronLeft  size={20} />
      {label}
    </button>
  );
};

export default BackButton;
