import * as types from './actionTypes';
import * as employeeService from '../../services/employeeIdentitiesService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeIdentitySuccess(employeeIdentity) {
  return { type: types.LOAD_USERIDENTITY_SUCCESS, employeeIdentity };
}

export function createEmployeeIdentitySuccess(employeeIdentity) {
  return { type: types.CREATE_USERIDENTITY_SUCCESS, employeeIdentity };
}
export function updateEmployeeIdentitySuccess(employeeIdentity) {
  return { type: types.UPDATE_USERIDENTITY_SUCCESS, employeeIdentity };
}

export function deleteEmployeeIdentityOptimistic(employeeIdentity) {
  return { type: types.DELETE_USERIDENTITY_OPTMISTIC, employeeIdentity };
}

export function loadEmployeeIdentity(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeService.getEmployeeIdentityById(id);
      dispatch(loadEmployeeIdentitySuccess(data ? data : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response : {}));
      throw error;
    }
  };
}

export function saveEmployeeIdentity(employeeIdentity, userId) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeService.saveEmployeeIdentity(employeeIdentity, userId);
      employeeIdentity.id
        ? dispatch(updateEmployeeIdentitySuccess(data.response))
        : dispatch(createEmployeeIdentitySuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployeeIdentity(employeeIdentity) {
  return async function(dispatch) {
    dispatch(deleteEmployeeIdentityOptimistic(employeeIdentity));
    return await employeeService.deleteEmployeeIdentity(
      employeeIdentity.user_id,
      employeeIdentity.id
    );
  };
}
