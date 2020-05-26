import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function pageDetailReducer(state = initialState.pageDetail, action) {
  switch (action.type) {
    case types.PAGE_DETAIL_SUCCESS:
      return action.pageDetail;
    default:
      return state;
  }
}
