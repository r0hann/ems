import * as types from './actionTypes';
import * as employeeService from '../../services/employeeLanguageService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeLanguageSuccess(employeeLanguage) {
  return { type: types.LOAD_USERLANGUAGE_SUCCESS, employeeLanguage };
}

export function createEmployeeLanguageSuccess(employeeLanguage) {
  return { type: types.CREATE_USERLANGUAGE_SUCCESS, employeeLanguage };
}

export function updateEmployeeLanguageSuccess(employeeLanguage) {
  return { type: types.UPDATE_USERLANGUAGE_SUCCESS, employeeLanguage };
}

export function deleteEmployeeLanguageOptimistic(employeeLanguage) {
  return { type: types.DELETE_USERLANGUAGE_OPTMISTIC, employeeLanguage };
}

export function loadEmployeeLanguage(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeService.getEmployeeLanguageById(id);
      dispatch(loadEmployeeLanguageSuccess(data ? data : {}));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveEmployeeLanguage(employeeLanguage, userId) {
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeService.saveEmployeeLanguage(employeeLanguage, userId);
      employeeLanguage.id
        ? dispatch(updateEmployeeLanguageSuccess(data.response))
        : dispatch(createEmployeeLanguageSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployeeLanguage(employeeLanguage) {
  return async function(dispatch, getState) {
    try {
      dispatch(deleteEmployeeLanguageOptimistic(employeeLanguage));
      return await employeeService.deleteEmployeeLanguage(
        employeeLanguage.user_id,
        employeeLanguage.id
      );
    } catch (error) {
      throw error;
    }
  };
}
