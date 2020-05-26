import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function apiErrorReducer(state = initialState.apiError, action) {
  switch (action.type) {
    case types.BEGIN_API_CALL:
      return {};
    case types.API_CALL_ERROR:
      return action.apiError;
    default:
      return {};
  }
}
