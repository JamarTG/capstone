import { AxiosError } from "axios";

export const extractErrorMessage = (error: AxiosError) => (error.response?.data as { message?: string })?.message ?? `An unexpected error occurred ${error}`;
