import {
  PagesState,
  AddPageAction,
  ADD_PAGE,
  CLEAR_PAGE,
  FETCH_ALL_PAGES_FROM_DATABASE,
  ClearPageAction,
  FetchAllPagesFromDatabaseAction
} from './types';

const initialState: PagesState = {
  pages: []
};

export function pagesReducer(initialState_?: PagesState) {
  return (
    state = initialState_ ? initialState_ : initialState,
    action: AddPageAction | ClearPageAction | FetchAllPagesFromDatabaseAction
  ): PagesState => {
    switch (action.type) {
      case ADD_PAGE:
        return {
          pages: state.pages.concat(action.payload)
        };
      case CLEAR_PAGE:
        return {
          pages: []
        };
      case FETCH_ALL_PAGES_FROM_DATABASE:
        return {
          pages: action.payload
        };
      default:
        return state;
    }
  };
}
