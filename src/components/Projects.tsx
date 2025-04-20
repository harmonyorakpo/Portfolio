import React from "react";
import { NewsItem } from "../model/project.model";

const Projects: React.FC = () => {
  const trendingNews: NewsItem[] = [
    {
      newsType: "Devops",
      content:
        "Our team builds secure, automated smart contracts tailored to your needs, eliminating intermediaries and reducing costs.",
      date: "7 October 2024",
    },
    {
      newsType: "Design",
      content:
        "Our team performs comprehensive security audits to uncover vulnerabilities in your blockchain systems and smart contracts. We thoroughly examine code, evaluate potential risks, and deliver actionable insights to protect your project.",
      date: "1 June 2024",
    },
    {
      newsType: "Devops",
      content:
        "Our team builds secure, automated smart contracts tailored to your needs, eliminating intermediaries and reducing costs.",
      date: "14 July 2024",
    },
  ];

  return (
    <div className="flex flex-col mb-32">
      {/* Section Heading */}
      <div className="flex flex-col relative mb-12">
        <div className="text-3xl font-semibold">
          <span>Projects</span>
        </div>
        <div className="absolute top-full mt-1 left-0 w-10 h-1 rounded-xs bg-accent"></div>
      </div>

      {/* News Items */}
      {trendingNews.map((n, i) => (
        <div
          key={i}
          className={`flex justify-between gap-4 rounded-md bg-white stroke-gray-300 stroke-0.78 fill-gray-200 shadow-custom mb-8 cursor-pointer ${
            i % 2 === 0 ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {/* Placeholder for Image/Visual Section */}
          <div
            className={`bg-pink-900 w-full overflow-hidden ${
              i % 2 !== 0 ? "rounded-r-md" : "rounded-l-md"
            }`}
          ></div>

          {/* Content */}
          <div className="flex flex-col p-10 w-full max-w-xl">
            <span className="text-xs text-primary-muted mb-4 text-black">
              {n.newsType.toUpperCase()}
            </span>
            <span className="text-base leading-7 text-black">{n.content}</span>
            <span className="text-primary-muted text-xs mt-2 text-black">{n.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
