import * as types from './actionTypes';
import * as employeeService from '../../services/employeeInsuranceService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeInsuranceSuccess(employeeInsurance) {
  return { type: types.LOAD_USERINSURANCE_SUCCESS, employeeInsurance };
}

export function createEmployeeInsuranceSuccess(employeeInsurance) {
  return { type: types.CREATE_USERINSURANCE_SUCCESS, employeeInsurance };
}

export function updateEmployeeInsuranceSuccess(employeeInsurance) {
  return { type: types.UPDATE_USERINSURANCE_SUCCESS, employeeInsurance };
}

export function deleteEmployeeInsuranceOptimistic(employeeInsurance) {
  return { type: types.DELETE_USERINSURANCE_OPTMISTIC, employeeInsurance };
}

export function loadEmployeeInsurance(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeService.getEmployeeInsuranceById(id);
      dispatch(loadEmployeeInsuranceSuccess(data ? data : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveEmployeeInsurance(employeeInsurance, userId) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeService.saveEmployeeInsurance(employeeInsurance, userId);
      employeeInsurance.id
        ? dispatch(updateEmployeeInsuranceSuccess(data.response))
        : dispatch(createEmployeeInsuranceSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployeeInsurance(employeeInsurance) {
  return async function(dispatch) {
    try {
      dispatch(deleteEmployeeInsuranceOptimistic(employeeInsurance));
      return await employeeService.deleteEmployeeInsurance(
        employeeInsurance.user_id,
        employeeInsurance.id
      );
    } catch (error) {
      throw error;
    }
  };
}
