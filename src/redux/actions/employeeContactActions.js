import * as types from './actionTypes';
import * as employeeContactService from '../../services/employeeContactService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeContactSuccess(employeeContact) {
  return { type: types.LOAD_USERCONTACT_SUCCESS, employeeContact };
}

export function createEmployeeContactSuccess(employeeContact) {
  return { type: types.CREATE_USERCONTACT_SUCCESS, employeeContact };
}

export function updateEmployeeContactSuccess(employeeContact) {
  return { type: types.UPDATE_USERCONTACT_SUCCESS, employeeContact };
}

export function deleteEmployeeContactOptimistic(employeeContact) {
  return { type: types.DELETE_USERCONTACT_OPTMISTIC, employeeContact };
}

export function loadEmployeeContact(userId) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeContactService.getUserEmployeeContact(userId);
      dispatch(loadEmployeeContactSuccess(data ? data : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response : {}));
      throw error;
    }
  };
}

export function saveEmployeeContact(employeeContact, userId) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeContactService.saveEmployeeContact(
        employeeContact,
        userId
      );
      employeeContact.id
        ? dispatch(updateEmployeeContactSuccess(data.response))
        : dispatch(createEmployeeContactSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployeeContact(employeeContact) {
  return async function(dispatch) {
    dispatch(deleteEmployeeContactOptimistic(employeeContact));
    return await employeeContactService.deleteEmployeeContact(
      employeeContact.user_id,
      employeeContact.id
    );
  };
}
