import * as types from './actionTypes';
import * as employeeService from '../../services/employeeeServiceDetailService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeServiceDetailSuccess(employeeServiceDetail) {
  return { type: types.LOAD_USERSERVICEDETAIL_SUCCESS, employeeServiceDetail };
}

export function createEmployeeServiceDetailSuccess(employeeServiceDetail) {
  return {
    type: types.CREATE_USERSERVICEDETAIL_SUCCESS,
    employeeServiceDetail
  };
}
export function updateEmployeeServiceDetailSuccess(employeeServiceDetail) {
  return {
    type: types.UPDATE_USERSERVICEDETAIL_SUCCESS,
    employeeServiceDetail
  };
}

export function deleteEmployeeServiceDetailOptimistic(employeeServiceDetail) {
  return {
    type: types.DELETE_USERSERVICEDETAIL_OPTMISTIC,
    employeeServiceDetail
  };
}

export function loadEmployeeServiceDetail(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeService.getEmployeeServiceDetailById(id);
      dispatch(loadEmployeeServiceDetailSuccess(data ? data : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveEmployeeServiceDetail(employeeServiceDetail, userId) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeService.saveEmployeeServiceDetail(
        employeeServiceDetail,
        userId
      );
      employeeServiceDetail.id
        ? dispatch(updateEmployeeServiceDetailSuccess(data.response))
        : dispatch(createEmployeeServiceDetailSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployeeServiceDetail(employeeServiceDetail) {
  return async function(dispatch) {
    dispatch(deleteEmployeeServiceDetailOptimistic(employeeServiceDetail));
    return await employeeService.deleteEmployeeServiceDetail(
      employeeServiceDetail.user_id,
      employeeServiceDetail.id
    );
  };
}
