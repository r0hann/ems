import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeDetailReducer(
  state = initialState.employeeDetail,
  action
) {
  switch (action.type) {
    case types.LOAD_USERDETAIL_SUCCESS:
      return action.employeeDetail;
    case types.CREATE_USERDETAIL_SUCCESS:
      return action.employeeDetail;
    case types.UPDATE_USERDETAIL_SUCCESS:
      return action.employeeDetail;
    case types.DELETE_USERDETAIL_OPTMISTIC:
      return state;
    default:
      return state;
  }
}
