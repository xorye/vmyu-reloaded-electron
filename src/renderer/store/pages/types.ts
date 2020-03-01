import { Page } from '../../types';

export const ADD_PAGE = 'ADD_PAGE';
export const CLEAR_PAGE = 'CLEAR_PAGE';
export const FETCH_ALL_PAGES_FROM_DATABASE = 'FETCH_ALL_PAGES_FROM_DATABASE';

export interface PagesState {
    pages: Page[];
}

export interface AddPageAction {
    type: typeof ADD_PAGE;
    payload: Page;
}

export interface ClearPageAction {
    type: typeof CLEAR_PAGE;
    payload: undefined;
}

export interface FetchAllPagesFromDatabaseAction {
    type: typeof FETCH_ALL_PAGES_FROM_DATABASE;
    payload: Page[];
}
