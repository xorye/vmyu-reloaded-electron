import { AddPageAction, ADD_PAGE, ClearPageAction, CLEAR_PAGE, FetchAllPagesFromDatabaseAction, FETCH_ALL_PAGES_FROM_DATABASE, PagesState, RemovePageAction, REMOVE_PAGE } from './types';
import { Page } from '../../types';

const initialState: PagesState = {
  pages: []
};

export function pagesReducer(initialState_?: PagesState) {
  return (
    state = initialState_ ? initialState_ : initialState,
    action: AddPageAction | RemovePageAction | ClearPageAction | FetchAllPagesFromDatabaseAction
  ): PagesState => {
    switch (action.type) {
      case ADD_PAGE:
        return {
          pages: state.pages.concat(action.payload)
        };
      case REMOVE_PAGE:
        return {
          pages: state.pages.filter((page: Page) => {
            return page.title !== action.payload.title || page.url !== action.payload.url;
          })
        }
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
