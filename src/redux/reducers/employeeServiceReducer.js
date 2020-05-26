import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeServicesReducer(
  state = initialState.employeeServices,
  action
) {
  switch (action.type) {
    case types.LOAD_USERSERVICE_SUCCESS:
      return action.employeeServices;
    case types.CREATE_USERSERVICE_SUCCESS:
      return [...state, { ...action.employeeServices }];
    case types.UPDATE_USERSERVICE_SUCCESS:
      return state.map(services =>
        services.id === action.employeeServices.id
          ? action.employeeServices
          : services
      );
    case types.DELETE_USERSERVICE_OPTMISTIC:
      return state.filter(
        services => services.id !== action.employeeServices.id
      );
    default:
      return state;
  }
}
