export enum ResponseType {
  Success,
  Fail,
}
export interface Response {
  type: ResponseType;
  data: unknown;
}
