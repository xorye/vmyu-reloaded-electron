import {
  SEARCH_QUERY_CHANGED,
  SIDE_BAR_CHANGED,
  SearchQueryAction,
  SideBarChangedAction,
  NavState
} from './types';

const initialState: NavState = {
  sideBarOpened: false,
  searchQuery: ''
};

export function navReducer(initialState_?: NavState) {
  return (
    state = initialState_ ? initialState_ : initialState,
    action: SearchQueryAction | SideBarChangedAction
  ): NavState => {
    switch (action.type) {
      case SEARCH_QUERY_CHANGED:
        return {
          sideBarOpened: state.sideBarOpened,
          searchQuery: action.payload
        };
      case SIDE_BAR_CHANGED:
        return {
          sideBarOpened: !state.sideBarOpened,
          searchQuery: state.searchQuery
        };
      default:
        return state;
    }
  };
}
