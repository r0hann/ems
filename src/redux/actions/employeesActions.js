import * as types from './actionTypes';
import * as employeeService from '../../services/employeeService';
import * as searchService from '../../services/searchService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadEmployeeSuccess(employees) {
  return { type: types.LOAD_EMPLOYEES_SUCCESS, employees };
}

export function pageDetailSuccess(pageDetail) {
  return { type: types.PAGE_DETAIL_SUCCESS, pageDetail };
}

export function loadSingleEmployeeSuccess(employee) {
  return { type: types.LOAD_ONE_EMPLOYEE_SUCCESS, employee };
}

export function createEmployeeSuccess(employee) {
  return { type: types.CREATE_EMPLOYEE_SUCCESS, employee };
}

export function searchEmployeeSuccess(employees) {
  return { type: types.SEARCH_EMPLOYEES_SUCCESS, employees };
}

export function updateEmployeeSuccess(employee) {
  return { type: types.UPDATE_EMPLOYEE_SUCCESS, employee };
}

export function deleteEmployeeOptimistic(employee) {
  return { type: types.DELETE_EMPLOYEE_OPTMISTIC, employee };
}

export function loadEmployees() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeService.getEmployeesByLimit();
      dispatch(loadEmployeeSuccess(data.response ? data.response.data : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function loadEmployeesByPage(page = 1) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await employeeService.getEmployeesByPage(page);
      const response = { ...data.response };
      if (response) delete response.data;
      dispatch(loadEmployeeSuccess(data.response ? data.response.data : []));
      dispatch(pageDetailSuccess(response ? response : {}));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function getSearchEmployees(searchKey, type) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await searchService.searchData(searchKey, type);
      const response = { ...data.response };
      if (response) delete response.data;
      dispatch(searchEmployeeSuccess(data ? data.response : []));
      dispatch(pageDetailSuccess(response ? response : {}));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function loadSingleEmployee(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await employeeService.getEmployeeById(id);
      dispatch(loadSingleEmployeeSuccess(data));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveEmployee(employee) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const data = await employeeService.saveEmployee(employee);

      employee.id
        ? dispatch(updateEmployeeSuccess(data.response))
        : dispatch(createEmployeeSuccess(data.response));
      return data.response;
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteEmployee(employee) {
  return async function(dispatch) {
    dispatch(deleteEmployeeOptimistic(employee));
    try {
      return await employeeService.deleteEmployee(employee.id);
    } catch (error) {
      throw error;
    }
  };
}
