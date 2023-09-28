export interface ResponseType {
  st: boolean;
  rs: string | object;
  err: { code: string; desc: string };
}
