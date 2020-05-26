import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function singleEmployeeReducer(
  state = initialState.employee,
  action
) {
  switch (action.type) {
    case types.LOAD_ONE_EMPLOYEE_SUCCESS:
      return action.employee;
    default:
      return state;
  }
}
