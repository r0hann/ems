import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeAccountReducer(
  state = initialState.employeeAccount,
  action
) {
  switch (action.type) {
    case types.LOAD_USERACCOUNT_SUCCESS:
      return action.employeeAccount;
    case types.CREATE_USERACCOUNT_SUCCESS:
      return [...state, { ...action.employeeAccount }];
    case types.UPDATE_USERACCOUNT_SUCCESS:
      return state.map(account =>
        account.id === action.employeeAccount.id
          ? action.employeeAccount
          : account
      );
    case types.DELETE_USERACCOUNT_OPTMISTIC:
      return state.filter(account => account.id !== action.employeeAccount.id);
    default:
      return state;
  }
}
