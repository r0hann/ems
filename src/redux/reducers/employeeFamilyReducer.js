import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeFamilyReducer(
  state = initialState.employeeFamily,
  action
) {
  switch (action.type) {
    case types.LOAD_USERFAMILY_SUCCESS:
      return action.employeeFamily;
    case types.CREATE_USERFAMILY_SUCCESS:
      return [...state, { ...action.employeeFamily }];
    case types.UPDATE_USERFAMILY_SUCCESS:
      return state.map(family =>
        family.id === action.employeeFamily.id ? action.employeeFamily : family
      );
    case types.DELETE_USERFAMILY_OPTMISTIC:
      return state.filter(family => family.id !== action.employeeFamily.id);
    default:
      return state;
  }
}
