export const SET_CURRENT_URL = 'SET_CURRENT_URL';

export interface CurrentUrlState {
  url: string | undefined;
}

export interface SetCurrentUrlAction {
  type: typeof SET_CURRENT_URL;
  payload: CurrentUrlState;
}
