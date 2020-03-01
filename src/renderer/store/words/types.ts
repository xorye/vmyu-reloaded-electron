import { Word } from '../../types';

export const ADD_WORDS = 'ADD_WORDS';
export const CHANGE_WORDS = 'CHANGE_WORDS';
export const CLEAR_WORDS = 'CLEAR_WORDS';

export interface WordsState {
    words: Word[];
}

export interface AddWordsAction {
    type: typeof ADD_WORDS;
    payload: Word[];
}

export interface ChangeWordsAction {
    type: typeof CHANGE_WORDS;
    payload: Word[];
}

export interface ClearWordsAction {
    type: typeof CLEAR_WORDS;
    payload: undefined;
}
