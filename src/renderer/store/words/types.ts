import { Word } from '../../types';

export const ADD_WORDS = 'ADD_WORDS';
export const CHANGE_WORDS = 'CHANGE_WORDS';
export const CLEAR_WORDS = 'CLEAR_WORDS';

export const CHANGE_WORDS_VIEW_MODE = 'CHANGE_WORDS_VIEW_MODE';

export enum WordsViewMode {
    Compact, CueCard
}

export interface WordsState {
    words: Word[];
    wordsViewMode: WordsViewMode;
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

export interface ChangeWordsViewAction {
    type: typeof CHANGE_WORDS_VIEW_MODE;
    payload: WordsViewMode;
}
