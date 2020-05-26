import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function empRolesReducer(state = initialState.empRoles, action) {
  switch (action.type) {
    case types.EMP_ROLE_SUCCESS:
      return action.empRoles;

    default:
      return state;
  }
}
