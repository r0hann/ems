import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function departmentReducer(
  state = initialState.departments,
  action
) {
  switch (action.type) {
    case types.LOAD_DEPARTMENTS_SUCCESS:
      return action.departments;
    case types.CREATE_DEPARTMENT_SUCCESS:
      return [...state, { ...action.department }];
    case types.UPDATE_DEPARTMENT_SUCCESS:
      return state.map(department =>
        department.id === action.department.id ? action.department : department
      );
    case types.DELETE_DEPARTMENT_OPTMISTIC:
      return state.filter(department => department.id !== action.department.id);
    default:
      return state;
  }
}
