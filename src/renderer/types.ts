export interface Word {
    wordString: string;
    definitions: string[];
    id?: number;
    timestamp?: Date;
}

export interface Page {
    url: string;
    title: string;
    wordCount: number;
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

export type WordWithContext = Word & { pageUrl: string; pageTitle: string };

export interface PageWordInfoCache {
    url: string;
    title: string;
    words: Word[];
}

export type SimilarityResult = { word: WordWithContext, similarity: number };

export interface CommonWordsResult {
    word: string,
    similarityResults: SimilarityResult[]
};

export const USER_ID: number = 1;