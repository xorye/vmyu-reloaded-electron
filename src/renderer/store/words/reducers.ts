import {
  WordsState,
  AddWordsAction,
  ADD_WORDS,
  CHANGE_WORDS,
  ChangeWordsAction,
  CLEAR_WORDS,
  ClearWordsAction,
  WordsViewMode,
  CHANGE_WORDS_VIEW_MODE,
  ChangeWordsViewAction
} from './types';

const initialState: WordsState = {
  words: [],
  wordsViewMode: WordsViewMode.Compact
};

export function wordsReducer(initialState_?: WordsState) {
  return (
    state = initialState_ ? initialState_ : initialState,
    action: AddWordsAction | ChangeWordsAction | ClearWordsAction | ChangeWordsViewAction
  ): WordsState => {
    switch (action.type) {
      case ADD_WORDS:
        return {
          words: state.words.concat(action.payload),
          wordsViewMode: state.wordsViewMode
        };
      case CHANGE_WORDS:
        return {
          words: action.payload,
          wordsViewMode: state.wordsViewMode
        };
      case CLEAR_WORDS:
        return {
          words: [],
          wordsViewMode: state.wordsViewMode
        };
      case CHANGE_WORDS_VIEW_MODE:
        return {
          words: state.words,
          wordsViewMode: action.payload
        }
      default:
        return state;
    }
  };
}
