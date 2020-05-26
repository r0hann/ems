import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeInsuranceReducer(
  state = initialState.employeeInsurance,
  action
) {
  switch (action.type) {
    case types.LOAD_USERINSURANCE_SUCCESS:
      return action.employeeInsurance;
    case types.CREATE_USERINSURANCE_SUCCESS:
      return [...state, { ...action.employeeInsurance }];
    case types.UPDATE_USERINSURANCE_SUCCESS:
      return state.map(insurance =>
        insurance.id === action.employeeInsurance.id
          ? action.employeeInsurance
          : insurance
      );
    case types.DELETE_USERINSURANCE_OPTMISTIC:
      return state.filter(
        insurance => insurance.id !== action.employeeInsurance.id
      );
    default:
      return state;
  }
}
