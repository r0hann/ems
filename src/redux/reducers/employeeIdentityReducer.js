import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeIdentityReducer(
  state = initialState.employeeIdentity,
  action
) {
  switch (action.type) {
    case types.LOAD_USERIDENTITY_SUCCESS:
      return action.employeeIdentity;
    case types.CREATE_USERIDENTITY_SUCCESS:
      return [...state, { ...action.employeeIdentity }];
    case types.UPDATE_USERIDENTITY_SUCCESS:
      return state.map(identity =>
        identity.id === action.employeeIdentity.id
          ? action.employeeIdentity
          : identity
      );
    case types.DELETE_USERIDENTITY_OPTMISTIC:
      return state.filter(
        identity => identity.id !== action.employeeIdentity.id
      );
    default:
      return state;
  }
}
