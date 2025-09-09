export type Term = {
  id: number;
  original: string;
  russian: string;
  description: string;
  aliases: string[];
  video?: string;
};

export type NestedTerms = {
  id: number;
  terms: Term[];
};
