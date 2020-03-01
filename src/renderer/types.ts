export interface Word {
  wordString: string;
  definitions: string[];
  id?: number;
}

export interface Page {
  url: string;
  title: string;
  id?: number;
}

export type WordWithContext = Word & { url: string; title: string };

export interface PageWordInfoCache {
  url: string;
  title: string;
  words: Word[];
}
export const USER_ID: number = 1;
