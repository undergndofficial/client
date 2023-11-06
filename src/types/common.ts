export interface ResponseType<T> {
  st: boolean;
  rs?: T;
  err?: { code: string; desc: string };
  accessToken?: string;
  refreshToken?: string;
}

export type SelectOptionType = { label: string; value: string } | null;
