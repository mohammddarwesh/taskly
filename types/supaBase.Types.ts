export type SupaBaseAuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: {
    id: string;
    email: string;
  };
};

export type SupabaseMember = {
  member_id: string;
  project_id: string;
  user_id: string;
  role: string;
  email: string;
  metadata: {
    name: string;
    email: string;
    sub: string;
    job_title?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
  };
  avatar_url?: string | null;
};
