import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeQualificationReducer(
  state = initialState.employeeQualification,
  action
) {
  switch (action.type) {
    case types.LOAD_USERQUALIFICATION_SUCCESS:
      return action.employeeQualification;
    case types.CREATE_USERQUALIFICATION_SUCCESS:
      return [...state, { ...action.employeeQualification }];
    case types.UPDATE_USERQUALIFICATION_SUCCESS:
      return state.map(qualification =>
        qualification.id === action.employeeQualification.id
          ? action.employeeQualification
          : qualification
      );
    case types.DELETE_USERQUALIFICATION_OPTMISTIC:
      return state.filter(
        qualification => qualification.id !== action.employeeQualification.id
      );
    default:
      return state;
  }
}
