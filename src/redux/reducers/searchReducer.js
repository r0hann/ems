import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function searchReducer(state = initialState.searchResult, action) {
  switch (action.type) {
    case types.SEARCH_DATA_SUCCESS:
      return action.searchResult;

    default:
      return [];
  }
}
