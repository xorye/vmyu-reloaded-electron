import { ipcRenderer } from 'electron';
import { IDatabase } from './database/IDatabase';
import { ViewEnum } from './store/currentView/types';
import store, { StoreInterface } from './store/store';
import { getDatabase } from './database/getDatabase';
import { Page, USER_ID, Word } from './types';
import { FETCH_ALL_PAGES_FROM_DATABASE } from './store/pages/types';
import { CHANGE_WORDS } from './store/words/types';

ipcRenderer.on('REFRESH', async (event: any, data: any) => {
    const state: StoreInterface = store.getState();
    const database: IDatabase | undefined = getDatabase();
    if (state.currentView.view === ViewEnum.WORDS) {
        let words: Word[];
        if (database) {
            words = await database.getWordsByUrl(USER_ID, state.currentUrl.url!);
        } else {
            words = [];
        }
        store.dispatch({
            type: CHANGE_WORDS,
            payload: words
        });
    } else if (state.currentView.view === ViewEnum.PAGES) {
        let pages: Page[];
        if (database) {
            pages = await database.getPages(USER_ID);
        } else {
            pages = [];
        }
        store.dispatch({
            type: FETCH_ALL_PAGES_FROM_DATABASE,
            payload: pages
        });
    }
});
