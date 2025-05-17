import type { AxiosError } from "axios";

export const extractErrorMessage = (error: AxiosError) =>
  (error.response?.data as { message?: string })?.message ?? `${error}`;
