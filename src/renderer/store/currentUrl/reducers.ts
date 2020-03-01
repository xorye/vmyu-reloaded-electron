import { CurrentUrlState, SetCurrentUrlAction, SET_CURRENT_URL } from './types';

const initialState: CurrentUrlState = { url: 'www.google.com' };

export function currentUrlReducer(initialState_?: CurrentUrlState) {
  return (
    state = initialState_ ? initialState_ : initialState,
    action: SetCurrentUrlAction
  ): CurrentUrlState => {
    switch (action.type) {
      case SET_CURRENT_URL:
        return {
          url: action.payload.url
        };
      default:
        return state;
    }
  };
}
