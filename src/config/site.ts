export const site = {
  name: { first: "Harmony", last: "Orakpoyovwuru", initials: "HO" },
  role: "Frontend Engineer",
  // Email lives in lib/email.ts, assembled at runtime so it is never a scrapable
  // plaintext string. Import { getEmail, mailtoHref } from "../lib/email".
  phone: "+49 1551 087 5320",
  location: "Germany",
  timeZone: "Europe/Berlin",
  availability: "Available for new projects",
  cv: { href: "/cv/Harmony_Orakpoyovwuru_cv.pdf", filename: "Harmony Orakpoyovwuru CV.pdf" },

  // Leave a URL empty to hide that link everywhere.
  socials: [
    { label: "GitHub", href: "https://github.com/harmonyorakpo" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/harmony-orakpoyovwuru-1716b117a" },
    { label: "Behance", href: "https://www.behance.net/harmonyorakpo" },
  ],

  hero: {
    kicker: "Angular · React · TypeScript",
  },

  prologue: {
    detail:
      "I'm Harmony, a frontend engineer with over five years of experience building scalable, user-focused web applications. Before diving into development I spent a year as a UI/UX designer and frontend intern — a foundation that still shapes how I approach every interface I build. I'm proficient in both modular and standalone Angular, React and I care about clean, reusable components with a strong focus on accessibility, security, optimization, responsiveness and polished design.",
  },

  interlude: {
    quote: "Good interfaces feel invisible. Great ones feel",
    emphasis: "inevitable.",
  },

  // Drop files into /public/images and point these at them. Empty = labelled placeholder.
  images: {
    portrait: "/images/Harmony.jpg",
    interlude: "/images/interlude-sliver.jpg",
  },
} as const;

export type Site = typeof site;
