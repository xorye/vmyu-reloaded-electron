import { Word, USER_ID } from '../../types';
import { ADD_WORDS, CHANGE_WORDS, CLEAR_WORDS } from './types';
import { Dispatch } from 'redux';
import { getDatabase } from '../../database/getDatabase';
import { IDatabase } from '../../database/IDatabase';

export const addWords = (words: Word[]) => async (dispatch: Dispatch): Promise<void> => {
    dispatch({
        type: ADD_WORDS,
        payload: words
    });
};

export const changeWordsByUrl = (url: string) => async (dispatch: Dispatch): Promise<void> => {
    const database: IDatabase | undefined = getDatabase();
    let words: Word[];
    if (database) {
        words = await database.getWordsByUrl(USER_ID, url);
    } else {
        words = [];
    }

    dispatch({
        type: CHANGE_WORDS,
        payload: words
    });
};

export const clearWords = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch({
        type: CLEAR_WORDS
    });
};
