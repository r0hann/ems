import * as types from './actionTypes';
import * as designationService from '../../services/designationService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadDesignationsSuccess(designations) {
  return { type: types.LOAD_DESIGNATIONS_SUCCESS, designations };
}

export function loadOneDesignationSuccess(designation) {
  return { type: types.LOAD_ONE_DESIGNATION_SUCCESS, designation };
}

export function createDesignationSuccess(designation) {
  return { type: types.CREATE_DESIGNATION_SUCCESS, designation };
}

export function updateDesignationSuccess(designation) {
  return { type: types.UPDATE_DESIGNATION_SUCCESS, designation };
}

export function deleteDesignationOptimistic(designation) {
  return { type: types.DELETE_DESIGNATION_OPTMISTIC, designation };
}

export function loadDesignations() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await designationService.getDesignations();
      dispatch(loadDesignationsSuccess(data.response ? data.response.data : {}));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function loadSingleDesignation(id) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await designationService.getDesignationById(id);

      dispatch(loadOneDesignationSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveDesignation(designation) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      await designationService.saveDesignation(designation);
      designation.id
        ? dispatch(updateDesignationSuccess(designation))
        : dispatch(createDesignationSuccess(designation));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function deleteDesignation(designation) {
  return async function(dispatch) {
    dispatch(deleteDesignationOptimistic(designation));
    return await designationService.deleteDesignation(designation.id);
  };
}
