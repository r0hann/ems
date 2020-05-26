import * as types from './actionTypes';
import * as employeeService from '../../services/employeeServicesService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeServicesSuccess(employeeServices) {
  return { type: types.LOAD_USERSERVICE_SUCCESS, employeeServices };
}

export function createEmployeeServicesSuccess(employeeServices) {
  return { type: types.CREATE_USERSERVICE_SUCCESS, employeeServices };
}

export function updateEmployeeServicesSuccess(employeeServices) {
  return { type: types.UPDATE_USERSERVICE_SUCCESS, employeeServices };
}

export function deleteEmployeeServicesOptimistic(employeeServices) {
  return { type: types.DELETE_USERSERVICE_OPTMISTIC, employeeServices };
}

export function loadEmployeeServices(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeService.getEmployeeServicesById(id);
      dispatch(loadEmployeeServicesSuccess(data ? data : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveEmployeeServices(employeeServices, userId) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeService.saveEmployeeServices(employeeServices, userId);
      employeeServices.id
        ? dispatch(updateEmployeeServicesSuccess(data.response))
        : dispatch(createEmployeeServicesSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployeServices(employeeServices) {
  return async function(dispatch) {
    dispatch(deleteEmployeeServicesOptimistic(employeeServices));
    return await employeeService.deleteEmployeeServices(
      employeeServices.user_id,
      employeeServices.id
    );
  };
}
