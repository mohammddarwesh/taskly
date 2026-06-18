export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string | null;
}
