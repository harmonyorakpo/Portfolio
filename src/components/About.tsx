// import React from 'react';

import SectionHeader from "./SectionHeader";

function About() {
  return (
    <>
      <div className="flex flex-col mb-24">
        <SectionHeader title="About Me" />

        <div className="leading-7">
          I'm Harmony, a Frontend Developer with 3+ years of experience building
          scalable, user-focused web applications. Before diving into
          development, I spent a year as a UI/UX designer — a foundation that
          still shapes how I approach every interface I build. I'm proficient in
          both modular and standalone Angular, confident with React, and
          experienced in crafting clean, reusable components with a strong focus
          on accessibility, responsiveness, and polished design.
        </div>
      </div>
    </>
  );
}

export default About;
