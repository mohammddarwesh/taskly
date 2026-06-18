export interface Epic {
  id: string;
  title: string;
  description?: string;
  assignee_id?: string | null;
  deadline?: string | null; 
  project_id: string;
  created_at: string;
}