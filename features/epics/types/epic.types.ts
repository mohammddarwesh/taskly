export interface User {
  sub: string;
  name: string;
  email: string;
  department?: string;
}

export interface Epic {
  id: string;
  epic_id: string;
  title: string;
  description?: string;
  deadline?: string | null;
  created_at: string;
  created_by: User;
  assignee_id?: string | null;
  assignee?: User | null;
  project_id: string;
}
