export type ApiError = {
    code: number;
    msg: string;
    error_code: string;
};

export function isApiError(error: unknown): error is ApiError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'msg' in error &&
        'code' in error
    );
}