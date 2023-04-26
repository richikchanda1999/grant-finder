export type Data = {
  blockworkGrants: any[];
};

export type ResponseType = {
  data?: Data;
  error?: unknown;
};

export type FormDataType = {
  title: string
  tldr: string
  details: string
  funding: string
}