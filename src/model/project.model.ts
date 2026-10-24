export interface IProject {
  title: string;
  description: string;
  link: string;
  id: string;
  about?: string;
  roles?: string[];
  responsibilities?: string[];
  technicalStack?: string[];
  image?: string;
  gallery?: string[];
  featured?: boolean;
  url?: string;
}
