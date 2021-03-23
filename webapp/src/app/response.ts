export type APIResponse<T> = {
  message: string;
  successful: boolean;
  data: T | null;
};

export type RequestResponse<T> = {
  code: number;
  response: APIResponse<T>;
};
