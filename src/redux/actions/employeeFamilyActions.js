import * as types from './actionTypes';
import * as employeeService from '../../services/employeeFamilyService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeFamilySuccess(employeeFamily) {
  return { type: types.LOAD_USERFAMILY_SUCCESS, employeeFamily };
}

export function createEmployeeFamilySuccess(employeeFamily) {
  return { type: types.CREATE_USERFAMILY_SUCCESS, employeeFamily };
}
export function updateEmployeeFamilySuccess(employeeFamily) {
  return { type: types.UPDATE_USERFAMILY_SUCCESS, employeeFamily };
}

export function deleteEmployeeFamilyOptimistic(employeeFamily) {
  return { type: types.DELETE_USERFAMILY_OPTMISTIC, employeeFamily };
}

export function loadEmployeeFamily(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeService.getEmployeeFamilyById(id);
      dispatch(loadEmployeeFamilySuccess(data ? data : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response : {}));
      throw error;
    }
  };
}

export function saveEmployeeFamily(employeeFamily, userId) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeService.saveEmployeeFamily(employeeFamily, userId);
      employeeFamily.id
        ? dispatch(updateEmployeeFamilySuccess(data.response))
        : dispatch(createEmployeeFamilySuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployeeFamily(employeeFamily) {
  return async function(dispatch) {
    dispatch(deleteEmployeeFamilyOptimistic(employeeFamily));
    return await employeeService.deleteEmployeeFamily(
      employeeFamily.user_id,
      employeeFamily.id
    );
  };
}
