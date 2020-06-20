import { IDatabase } from './IDatabase';
import { Page, Word, Highlight, CommonWordsResult } from '../types';
import axios from 'axios';

const URL = 'http://localhost:3001';

export class LocalDatabase implements IDatabase {
  getWordsByUrl(userId: number, url: string): Promise<Word[]> {
    return axios
      .get(`${URL}/getWordsByUrl/`, {
        params: {
          url: encodeURIComponent(url),
          userId
        }
      })
      .then(results => {
        const rows = results.data;
        const words: Word[] = [];
        rows.forEach((row: any) =>
          words.push({
            wordString: row.wordString,
            definitions: row.definitions,
            id: row.id,
            timestamp: new Date(row.timestamp)
          })
        );
        return words;
      });
  }

  getHighlightsByEncodedUrl(url: string, userId: number): Promise<Highlight[]> {
    return axios
      .get(`${URL}/getHighlightsByEncodedUrl/`, {
        params: {
          userId,
          url
        }
      })
      .then(results => {
        const rows = results.data;
        // const highlights: Highlight[] = [];
        // rows.forEach((row: any) =>
        // highlights.push({
        //     wordString: row.wordString,
        //     definitions: row.definitions,
        //     id: row.id
        //   })
        // );
        return rows;
      });
  }
  addHighlight(
    userId: number,
    pageId: number,
    wordId: number,
    highlightedText: string,
    startOffset: number,
    endOffset: number
  ): Promise<{ startOffset: number; endOffset: number }> {
    return axios
      .get(`${URL}/addHighlight/`, {
        params: {
          userId,
          pageId,
          wordId,
          highlightedText,
          startOffset,
          endOffset
        }
      })
      .then(results => {
        return {
          startOffset: results.data.startOffset,
          endOffset: results.data.endOffset
        };
      });
  }
  getPages(userId: number): Promise<Page[]> {
    return axios
      .get(`${URL}/getPages/`, {
        params: {
          userId
        }
      })
      .then(results => {
        const rows = results.data;
        const pages: Page[] = [];

        rows.forEach((row: any) =>
          pages.push({
            url: row.url,
            title: row.title,
            id: row.id,
            wordCount: row.wordCount,
            timestamp: new Date(row.timestamp)
          })
        );
        return pages;
      });
  }
  async addPage(userId: number, url: string, title: string): Promise<number> {
    return axios
      .get(`${URL}/addPage/`, {
        params: {
          userId,
          url: encodeURIComponent(url),
          title: encodeURIComponent(title)
        }
      })
      .then(results => {
        return results.data.id;
      });
  }

  addWord(
    userId: number,
    pageId: number,
    word: string,
    definitions: string[]
  ): Promise<number> {
    const definitionString: string = definitions.join(';');
    return axios
      .get(`${URL}/addWord/`, {
        params: {
          userId,
          pageId,
          word: encodeURIComponent(word),
          definitions: encodeURIComponent(definitionString)
        }
      })
      .then(results => {
        return results.data.id;
      });
  }

  updateWord(
    userId: number,
    wordId: number,
    word: string,
    definitions: string[]
  ): Promise<number> {
    const definitionString: string = definitions.join(';');
    return axios
      .get(`${URL}/updateWord/`, {
        params: {
          userId,
          wordId,
          word: encodeURIComponent(word),
          definitions: encodeURIComponent(definitionString)
        }
      })
      .then(results => {
        return results.data.id;
      });
  }
  removePage(userId: number, page: Page): Promise<number> {
    return axios
      .delete(`${URL}/deletePage/`, {
        params: {
          userId,
          url: encodeURIComponent(page.url),
          title: page.title
        }
      })
      .then(results => {
        return results.data.id;
      });
  }
  commonWords(userId: number, words: string[], pageUrl: string, similarityConstant?: number): Promise<CommonWordsResult[]> {
    return axios
      .post(`${URL}/commonWords/`, {
        userId,
        words,
        pageUrl,
        similarityConstant
      });
  }
  removeWordFromPage(word: Word, page: Page): Promise<void> {
    return new Promise<void>(resolve => resolve());
  }
}