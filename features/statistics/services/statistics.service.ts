import { apiClient } from "@/libs/api-client";
import { CalendarStatsResponse, ProjectTaskCount } from "../types/statistics.types";

type StatsParams = {
    p_start_date: string;
    p_end_date: string;
    p_project_id: string | null;
    p_status: string | null;
};

export const getTasksCalendarStats = async (params: StatsParams): Promise<CalendarStatsResponse> => {
    return apiClient<CalendarStatsResponse>('/api/statistics/calendar', {
        method: 'POST',
        body: params,
    });
};

type ProjectsCountParams = {
    p_start_date: string;
    p_end_date: string;
};

export const getTasksCountPerProject = async (params: ProjectsCountParams): Promise<ProjectTaskCount[]> => {
    return apiClient<ProjectTaskCount[]>('/api/statistics/projects', {
        method: 'POST',
        body: params,
    });
};