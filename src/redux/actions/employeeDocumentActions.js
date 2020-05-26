import * as types from './actionTypes';
import * as employeeService from '../../services/employeeDocumentService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeDocumentSuccess(employeeDocument) {
  return { type: types.LOAD_USERDOCUMENT_SUCCESS, employeeDocument };
}

export function createEmployeeDocumentSuccess(employeeDocument) {
  return { type: types.CREATE_USERDOCUMENT_SUCCESS, employeeDocument };
}

export function updateEmployeeDocumentSuccess(employeeDocument) {
  return { type: types.UPDATE_USERDOCUMENT_SUCCESS, employeeDocument };
}

export function deleteEmployeeDocumentOptimistic(employeeDocument) {
  return { type: types.DELETE_USERDOCUMENT_OPTMISTIC, employeeDocument };
}

export function loadEmployeeDocument(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeService.getUserEmployeeDocument(id);
      dispatch(loadEmployeeDocumentSuccess(data ? data : {}));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveEmployeeDocument(employeeDocument, userId) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeService.saveEmployeeDocument(employeeDocument, userId);
      employeeDocument.id
        ? dispatch(updateEmployeeDocumentSuccess(data.response))
        : dispatch(createEmployeeDocumentSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployeeDocument(employeeDocument) {
  return async function(dispatch) {
    dispatch(deleteEmployeeDocumentOptimistic(employeeDocument));
    return await employeeService.deleteEmployeeDocument(
      employeeDocument.user_id,
      employeeDocument.id
    );
  };
}
