import { IDatabase } from './IDatabase';
import { Page, Word } from '../types';
import axios from 'axios';

export class LocalDatabase implements IDatabase {
    getWordsByUrl(userId: number, url: string): Promise<Word[]> {
        return axios
            .get('http://localhost:3001/getWordsByUrl/', {
                params: {
                    url: `"${url}"`,
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
                    url: addQuotes(url),
                    title: addQuotes(title)
                }
            })
            .then(results => {
                return results.data.id;
            });
    }

    addWord(userId: number, pageId: number, word: string, definitions: string[]): Promise<number> {
        const definitionString: string = definitions.join(';');
        return axios
            .get('http://localhost:3001/addWord/', {
                params: {
                    userId,
                    pageId,
                    word: addQuotes(word),
                    definitions: addQuotes(definitionString)
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
                    word: addQuotes(word),
                    definitions: addQuotes(definitionString)
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
