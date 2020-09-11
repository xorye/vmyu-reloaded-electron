import { CHANGE_VIEW, ViewEnum } from './types';
import { Dispatch } from 'redux';

export const changeView = (newView: ViewEnum) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch({
    type: CHANGE_VIEW,
    payload: newView
  });
};