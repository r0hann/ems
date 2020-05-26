import * as types from './actionTypes';
import * as employeeService from '../../services/employeeQualificationService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeQualificationSuccess(employeeQualification) {
  return { type: types.LOAD_USERQUALIFICATION_SUCCESS, employeeQualification };
}

export function createEmployeeQualificationSuccess(employeeQualification) {
  return {
    type: types.CREATE_USERQUALIFICATION_SUCCESS,
    employeeQualification
  };
}

export function updateEmployeeQualificationSuccess(employeeQualification) {
  return {
    type: types.UPDATE_USERQUALIFICATION_SUCCESS,
    employeeQualification
  };
}

export function deleteEmployeeQualificationOptimistic(employeeQualification) {
  return {
    type: types.DELETE_USERQUALIFICATION_OPTMISTIC,
    employeeQualification
  };
}

export function loadEmployeeQualification(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeService.getEmployeeQualificationById(id);
      dispatch(loadEmployeeQualificationSuccess(data ? data : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveEmployeeQualification(employeeQualification, userId) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeService.saveEmployeeQualification(
        employeeQualification,
        userId
      );
      employeeQualification.id
        ? dispatch(updateEmployeeQualificationSuccess(data.response))
        : dispatch(createEmployeeQualificationSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployeeQualification(employeeQualification) {
  return async function(dispatch) {
    dispatch(deleteEmployeeQualificationOptimistic(employeeQualification));
    return await employeeService.deleteEmployeeQualification(
      employeeQualification.user_id,
      employeeQualification.id
    );
  };
}
