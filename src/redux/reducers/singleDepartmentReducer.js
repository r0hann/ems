import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function singleDepartmentReducer(
  state = initialState.department,
  action
) {
  switch (action.type) {
    case types.LOAD_ONE_DEPARTMENT_SUCCESS:
      return action.department;
    default:
      return state;
  }
}
