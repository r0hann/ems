import * as types from './actionTypes';
import * as employeeAccountService from '../../services/employeeAccountService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeAccountSuccess(employeeAccount) {
  return { type: types.LOAD_USERACCOUNT_SUCCESS, employeeAccount };
}

export function createEmployeeAccountSuccess(employeeAccount) {
  return { type: types.CREATE_USERACCOUNT_SUCCESS, employeeAccount };
}
export function updateEmployeeAccountSuccess(employeeAccount) {
  return { type: types.UPDATE_USERACCOUNT_SUCCESS, employeeAccount };
}

export function deleteEmployeeAccountOptimistic(employeeAccount) {
  return { type: types.DELETE_USERACCOUNT_OPTMISTIC, employeeAccount };
}

export function loadEmployeeAccount(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeAccountService.getEmployeeAllAccounts(id);
      dispatch(loadEmployeeAccountSuccess(data ? data : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveEmployeeAccount(employeeAccount, userId) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeAccountService.saveEmployeeAccount(
        employeeAccount,
        userId
      );
      employeeAccount.id
        ? dispatch(updateEmployeeAccountSuccess(data.response))
        : dispatch(createEmployeeAccountSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployeeAccount(employeeAccount) {
  return async function(dispatch) {
    dispatch(deleteEmployeeAccountOptimistic(employeeAccount));
    return await employeeAccountService.deleteEmployeeAccount(
      employeeAccount.user_id,
      employeeAccount.id
    );
  };
}
