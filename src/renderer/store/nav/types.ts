export const SIDE_BAR_CHANGED = 'SIDE_BAR_CHANGED';
export const SEARCH_QUERY_CHANGED = 'SEARCH_QUERY_CHANGED';

export interface NavState {
  sideBarOpened: boolean;
  searchQuery: string;
}

export interface SideBarChangedAction {
  type: typeof SIDE_BAR_CHANGED;
  payload: void;
}

export interface SearchQueryAction {
  type: typeof SEARCH_QUERY_CHANGED;
  payload: string;
}