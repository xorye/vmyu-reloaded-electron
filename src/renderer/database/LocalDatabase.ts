import { IDatabase } from './IDatabase';
import { Page, Word, Highlight } from '../types';
import axios from 'axios';

export class LocalDatabase implements IDatabase {
  getWordsByUrl(userId: number, url: string): Promise<Word[]> {
    return axios
      .get('http://localhost:3001/getWordsByUrl/', {
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
  // getHighlightsByEncodedUrl
  getHighlightsByEncodedUrl(url: string, userId: number): Promise<Highlight[]> {
    return axios
      .get('http://localhost:3001/getHighlightsByEncodedUrl/', {
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
      .get('http://localhost:3001/addHighlight/', {
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
      .get('http://localhost:3001/getPages/', {
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
            timestamp: new Date(row.timestamp)
          })
        );
        return pages;
      });
  }
  async addPage(userId: number, url: string, title: string): Promise<number> {
    return axios
      .get('http://localhost:3001/addPage/', {
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
      .get('http://localhost:3001/addWord/', {
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
      .get('http://localhost:3001/updateWord/', {
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

  removePage(page: Page): Promise<void> {
    return new Promise<void>(resolve => resolve());
  }
  removeWordFromPage(word: Word, page: Page): Promise<void> {
    return new Promise<void>(resolve => resolve());
  }
}

function addQuotes(str: string): string {
  return `"${str}"`;
}
