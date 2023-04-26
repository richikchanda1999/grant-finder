import { Document } from "langchain/document";

export type Data = {
  blockworkGrants: any[];
};

export type ResponseType = {
  data?: Data;
  error?: unknown;
};

export type FormDataType = {
  title: string;
  tldr: string;
  details: string;
  funding: string;
};

export type GlobalContextType = {
  grants: Data | undefined;
  docs: Document[] | undefined;
  filteredGrants: any[];
  setFilteredGrants: (grants: any[]) => void;
};
