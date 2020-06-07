import {
  SEARCH_QUERY_CHANGED,
  SIDE_BAR_CHANGED,
  SearchQueryAction,
  SideBarChangedAction,
  NavState
} from './types';
import { ViewEnum } from '../currentView/types';
import { View } from '../../components/View';

const initialState: NavState = {
  sideBarOpened: false,
  wordSearchQuery: '',
  pageSearchQuery: ''
};

export function navReducer(initialState_?: NavState) {
  return (
    state = initialState_ ? initialState_ : initialState,
    action: SearchQueryAction | SideBarChangedAction
  ): NavState => {
    switch (action.type) {
      case SEARCH_QUERY_CHANGED:
        const view: ViewEnum = action.view;
        return {
          sideBarOpened: state.sideBarOpened,
          wordSearchQuery: view === ViewEnum.WORDS ? action.payload : state.wordSearchQuery,
          pageSearchQuery: view === ViewEnum.PAGES ? action.payload : state.pageSearchQuery
        };
      case SIDE_BAR_CHANGED:
        return {
          sideBarOpened: !state.sideBarOpened,
          wordSearchQuery: state.wordSearchQuery,
          pageSearchQuery: state.pageSearchQuery
        };
      default:
        return state;
    }
  };
}
