import * as types from './actionTypes';
import * as departmentService from '../../services/departmentService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadDepartmentsSuccess(departments) {
  return { type: types.LOAD_DEPARTMENTS_SUCCESS, departments };
}

export function loadSingleDepartmentsSuccess(department) {
  return { type: types.LOAD_ONE_DEPARTMENT_SUCCESS, department };
}

export function createDepartmentSuccess(department) {
  return { type: types.CREATE_DEPARTMENT_SUCCESS, department };
}

export function updateDepartmentSuccess(department) {
  return { type: types.UPDATE_DEPARTMENT_SUCCESS, department };
}

export function loadDepartmentOnForm(department) {
  return { type: types.LOAD_DEPARTMENT_ONFORM, department };
}

export function deleteDepartmentOptimistic(department) {
  return { type: types.DELETE_DEPARTMENT_OPTMISTIC, department };
}

export function loadDepartments() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await departmentService.getDepartments();

      dispatch(loadDepartmentsSuccess(data.response ? data.response.data : {}));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function loadSingleDepartment(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await departmentService.getDepartmentDetailById(id);
      dispatch(loadSingleDepartmentsSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveDepartment(department) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      await departmentService.saveDepartment(department);
      department.id
        ? dispatch(updateDepartmentSuccess(department))
        : dispatch(createDepartmentSuccess(department));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteDepartment(department) {
  return async function(dispatch) {
    dispatch(deleteDepartmentOptimistic(department));
    return await departmentService.deleteDepartment(department.id);
  };
}
