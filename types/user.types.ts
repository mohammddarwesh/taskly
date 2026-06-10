export type User = {
    id: string;
    email: string;
    user_metadata: {
        name?: string;
        job_title?: string;
        avatar_url?: string;
    };
}
