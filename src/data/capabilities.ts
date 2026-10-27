export interface Capability {
  title: string;
  emphasis: string;
  summary: string;
  tools: string[];
}

export const capabilities: Capability[] = [
  {
    title: "Component",
    emphasis: "architecture",
    summary: "Modular and standalone Angular, React, and reusable component libraries built to scale with the product.",
    tools: ["Angular", "React", "PrimeNG", "PrimeFaces", "Angular Material"],
  },
  {
    title: "State &",
    emphasis: "data flow",
    summary: "Predictable state and reactive data pipelines across large, multi-module applications.",
    tools: ["RxJs", "NGXS", "Angular Signals", "Redux", "REST", "GraphQL"],
  },
  {
    title: "Interface",
    emphasis: "design",
    summary: "A year as a UI/UX designer means I can take a feature from Figma frame to production component.",
    tools: ["Figma", "Tailwind CSS", "SCSS", "Accessibility"],
  },
  {
    title: "Secure",
    emphasis: "frontends",
    summary: "Banking-grade flows: OTP authorisation, role-based route guards and validated, masked inputs.",
    tools: ["OAuth", "OTP flows", "Route guards", "ngx-mask"],
  },
  {
    title: "Quality &",
    emphasis: "performance",
    summary: "Lazy loading, virtual scrolling, framework migrations and end-to-end tests that keep things fast.",
    tools: ["Cypress", "Lazy loading", "Virtual scrolling", "Angular 8 → 19"],
  },
];
