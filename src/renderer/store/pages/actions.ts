import { Page, USER_ID } from '../../types';
import { ADD_PAGE, CLEAR_PAGE, FETCH_ALL_PAGES_FROM_DATABASE } from './types';
import { Dispatch } from 'redux';
import { IDatabase } from '../../database/IDatabase';
import { getDatabase } from '../../database/getDatabase';

export const addPages = (pages: Page[]) => async (dispatch: Dispatch): Promise<void> => {
    dispatch({
        type: ADD_PAGE,
        payload: pages
    });
};

export const clearPages = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch({
        type: CLEAR_PAGE
    });
};

export const fetchAllPagesFromDatabase = () => async (dispatch: Dispatch): Promise<void> => {
    const database: IDatabase | undefined = getDatabase();
    let pages: Page[];
    if (database) {
        pages = await database.getPages(USER_ID);
    } else {
        pages = [];
    }

    dispatch({
        type: FETCH_ALL_PAGES_FROM_DATABASE,
        payload: pages
    });
};
