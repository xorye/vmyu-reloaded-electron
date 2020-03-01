import { SET_CURRENT_URL } from './types';
import { Dispatch } from 'redux';

export const setCurrentUrl = (url: string) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch({
    type: SET_CURRENT_URL,
    payload: { url }
  });
};
