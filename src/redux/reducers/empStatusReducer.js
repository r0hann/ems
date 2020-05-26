import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function empStatusReducer(state = initialState.empStatuses, action) {
  switch (action.type) {
    case types.EMP_STATUS_SUCCESS:
      return action.empStatuses;

    default:
      return state;
  }
}
