export interface ResponseType<T> {
  st: boolean;
  rs?: T;
  err?: { code: string; desc: string };
  accessToken?: string;
  refreshToken?: string;
}
