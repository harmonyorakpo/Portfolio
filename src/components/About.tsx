// import React from 'react';

function About() {
  return (
    <>
      <div className="flex flex-col mb-24">
        {/* Section Heading */}
        <div className="flex flex-col relative mb-12">
          <div className="text-3xl font-semibold">
            <span>About me</span>
          </div>
          <div className="absolute top-full mt-1 left-0 w-10 h-1 rounded-xs bg-primary"></div>
        </div>

        <div className="leading-7" >
        I'm Harmony, a Frontend Developer with 3+ years of experience building scalable, user-focused web applications. Before diving into development, I spent a year as a UI/UX designer — a foundation that still shapes how I approach every interface I build. I'm proficient in both modular and standalone Angular, confident with React, and experienced in crafting clean, reusable components with a strong focus on accessibility, responsiveness, and polished design.
        </div>
      </div>
    </>
  );
}

export default About;
