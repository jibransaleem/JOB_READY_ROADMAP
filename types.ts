
export interface Skill {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  timeEstimate: number; // in hours
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  priority: number;
  icon: string;
  skills: Skill[];
  totalTargetHours: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  category: string;
}

export interface UserProgress {
  completedSkills: string[];
  completedProjects: string[];
}
