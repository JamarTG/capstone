import type { AxiosError } from "axios";

export default (error: AxiosError) =>
  (error.response?.data as { message?: string })?.message ?? `${error}`;
