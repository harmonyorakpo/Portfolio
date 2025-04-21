export interface NewsItem {
    newsType: string;
    content: string;
    date: string;
  }
  
  export interface IProject { 
    title: string;
    description: string;
    link: string;
    number: string;
  }

 export interface ISkill {
    name: string;
    emoji?: string; // Optional emoji for special items
  }
  
  export interface ISkillCategory {
    title: string;
    skills: ISkill[];
  }