import { statusConfig } from "@/features/tasks/utils/statusConfig";
import { TaskStatus } from "../types/statistics.types";

export const getStatusHexColor = (statusKey: string): string => {
    const config = statusConfig[statusKey as TaskStatus];
    if (!config?.dotColor) return "#6b7280";
    const match = config.dotColor.match(/#[A-Fa-f0-9]+/);
    return match ? match[0] : "#6b7280";
};

export const getStatusStyles = (statusKey: string) => {
    return statusConfig[statusKey as TaskStatus] || statusConfig.TO_DO;
};