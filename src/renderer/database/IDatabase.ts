import { Page, Word } from '../types';

export interface IDatabase {
  getWordsByUrl: (userId: number, url: string) => Promise<Word[]>;
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
