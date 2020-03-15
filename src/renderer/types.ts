export interface Word {
    wordString: string;
    definitions: string[];
    id?: number;
    timestamp?: Date;
}

export interface Page {
    url: string;
    title: string;
    id?: number;
    timestamp?: Date;
}

export interface Highlight {
    startOffset: number;
    endOffset: number;
    id?: number;
    pageId: number;
    wordId: number;
    highlightedText: string;
    timestamp?: Date;
}

export type WordWithContext = Word & { url: string; title: string };

export interface PageWordInfoCache {
    url: string;
    title: string;
    words: Word[];
}
export const USER_ID: number = 1;
