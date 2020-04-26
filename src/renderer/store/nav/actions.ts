import { SEARCH_QUERY_CHANGED, SIDE_BAR_CHANGED } from './types';
import { Dispatch } from 'redux';

export const sideBarChanged = () => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch({
    type: SIDE_BAR_CHANGED,
    payload: undefined
  });
};

export const searchQueryChanged = (str: string) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch({
    type: SEARCH_QUERY_CHANGED,
    payload: str
  });
};