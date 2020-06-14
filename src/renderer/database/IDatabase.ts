import { Page, Word, Highlight, CommonWordsResult } from '../types';

export interface IDatabase {
  getWordsByUrl: (userId: number, url: string) => Promise<Word[]>;
  getHighlightsByEncodedUrl: (
    url: string,
    pageId: number
  ) => Promise<Highlight[]>;
  addHighlight: (
    userId: number,
    pageId: number,
    wordId: number,
    highlightedText: string,
    startOffset: number,
    endOffset: number
  ) => Promise<{ startOffset: number; endOffset: number }>;
  getPages: (userId: number) => Promise<Page[]>;
  addPage: (userId: number, url: string, title: string) => Promise<number>;
  removePage: (userId: number, page: Page) => Promise<number>;
  addWord: (
    userId: number,
    pageId: number,
    word: string,
    definitions: string[]
  ) => Promise<number>;
  updateWord: (
    userId: number,
    wordId: number,
    word: string,
    definitions: string[]
  ) => Promise<number>;
  commonWords: (userId: number, words: string[], pageUrl: string, similarityConstant?: number) => Promise<CommonWordsResult[]>;
  removeWordFromPage: (word: Word, page: Page) => Promise<void>;
}
