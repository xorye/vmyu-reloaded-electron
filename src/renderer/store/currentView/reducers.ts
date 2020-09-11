import {
  CHANGE_VIEW,
  ChangeViewAction,
  CurrentViewState,
  ViewEnum
} from './types';

const initialState: CurrentViewState = {
  view: ViewEnum.PAGES
};

export function currentViewReducer(initialState_?: CurrentViewState) {
  return (
    state = initialState_ ? initialState_ : initialState,
    action: ChangeViewAction
  ): CurrentViewState => {
    switch (action.type) {
      case CHANGE_VIEW:
        return {
          view: action.payload
        };
      default:
        return state;
    }
  };
}