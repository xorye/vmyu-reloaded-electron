export const CHANGE_VIEW = 'CHANGE_VIEW';

export interface CurrentViewState {
  view: ViewEnum;
}

export interface ChangeViewAction {
  type: typeof CHANGE_VIEW;
  payload: ViewEnum;
}

export enum ViewEnum {
  WORDS,
  PAGES
}
