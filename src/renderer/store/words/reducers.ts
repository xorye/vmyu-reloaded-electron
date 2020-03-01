import {
  WordsState,
  AddWordsAction,
  ADD_WORDS,
  CHANGE_WORDS,
  ChangeWordsAction,
  CLEAR_WORDS,
  ClearWordsAction
} from './types';

const initialState: WordsState = {
  words: []
};

export function wordsReducer(initialState_?: WordsState) {
  return (
    state = initialState_ ? initialState_ : initialState,
    action: AddWordsAction | ChangeWordsAction | ClearWordsAction
  ): WordsState => {
    switch (action.type) {
      case ADD_WORDS:
        return {
          words: state.words.concat(action.payload)
        };
      case CHANGE_WORDS:
        return {
          words: action.payload
        };
      case CLEAR_WORDS:
        return {
          words: []
        };
      default:
        return state;
    }
  };
}
