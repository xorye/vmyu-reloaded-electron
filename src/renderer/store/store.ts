import { combineReducers } from 'redux';
import { wordsReducer } from './words/reducers';
import { pagesReducer } from './pages/reducers';
import { currentUrlReducer } from './currentUrl/reducers';
import { currentViewReducer } from './currentView/reducers';
import { navReducer } from './nav/reducers';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as _ from 'lodash';
import { WordsState } from './words/types';
import { PagesState } from './pages/types';
import { CurrentUrlState } from './currentUrl/types';
import { CurrentViewState } from './currentView/types';
import { NavState } from './nav/types';

const middleware = [thunk];

export interface StoreInterface {
  wordsStore: WordsState;
  currentUrl: CurrentUrlState;
  currentView: CurrentViewState;
  pagesStore: PagesState;
  navStore: NavState
}

export const loadState = (): StoreInterface | undefined => {
  // turn off loading for now

  try {
    const serializedState: string | null = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState).state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: { state: StoreInterface }): void => {
  try {
    const slimState = {
      state: {
        currentUrl: state.state.currentUrl,
        currentView: state.state.currentView
      }
    };
    const serializedState: string = JSON.stringify(slimState);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};
const prevState: StoreInterface | undefined = loadState();

const rootReducer = combineReducers<StoreInterface>({
  wordsStore: wordsReducer(),
  pagesStore: pagesReducer(),
  currentUrl: currentUrlReducer(prevState ? prevState.currentUrl : undefined),
  currentView: currentViewReducer(prevState ? prevState.currentView : undefined),
  navStore: navReducer()
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(
  _.throttle(() => {
    saveState({
      state: store.getState()
    });
  }, 1000)
);

export default store;
