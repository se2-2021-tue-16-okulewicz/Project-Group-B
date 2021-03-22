export type APIResponse<T> = {
  message: string;
  successful: boolean;
  data: T | null;
};
