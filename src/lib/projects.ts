import { projects } from "../data/projects.data";
import type { IProject } from "../model/project.model";

export function parseTitle(title: string) {
  const [name, tag] = title.split(" | ").map((s) => s.trim());
  const words = name.split(" ");
  return {
    name,
    tag,
    lead: words.slice(0, -1).join(" "),
    last: words[words.length - 1],
  };
}

export function stackOf(project: IProject) {
  return project.description.split("|").map((s) => s.trim());
}

export function getProject(id: string | undefined) {
  return projects.find((p) => p.id === id);
}

export function nextProject(id: string) {
  const i = projects.findIndex((p) => p.id === id);
  return projects[(i + 1) % projects.length];
}

export const featuredProjects = projects.filter((p) => p.featured);
