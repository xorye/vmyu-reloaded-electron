import { Page, Word, Highlight } from '../types';

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
  removePage: (page: Page) => Promise<void>;
  removeWordFromPage: (word: Word, page: Page) => Promise<void>;
}
