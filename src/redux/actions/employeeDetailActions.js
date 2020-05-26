import * as types from './actionTypes';
import * as employeeService from '../../services/employeeService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeDetailSuccess(employeeDetail) {
  return { type: types.LOAD_USERDETAIL_SUCCESS, employeeDetail };
}

export function createEmployeeDetailSuccess(employeeDetail) {
  return { type: types.CREATE_USERDETAIL_SUCCESS, employeeDetail };
}

export function updateEmployeeDetailSuccess(employeeDetail) {
  return { type: types.UPDATE_USERDETAIL_SUCCESS, employeeDetail };
}

export function deleteEmployeeDetailOptimistic(employeeDetail) {
  return { type: types.DELETE_USERDETAIL_OPTMISTIC, employeeDetail };
}

export function loadEmployeeDetail(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeService.getEmployeeDetailById(id);
      dispatch(loadEmployeeDetailSuccess(data ? data : null));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveEmployeeDetail(employeeDetail) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeService.saveEmployeeDetail(employeeDetail);
      employeeDetail.id
        ? dispatch(updateEmployeeDetailSuccess(data.response))
        : dispatch(createEmployeeDetailSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployeeDetail(employeeDetail) {
  return async function(dispatch) {
    dispatch(deleteEmployeeDetailOptimistic(employeeDetail));
    return await employeeService.deleteEmployeeDetail(
      employeeDetail.user_id,
      employeeDetail.id
    );
  };
}
