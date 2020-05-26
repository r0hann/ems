import * as types from './actionTypes';
import * as configService from '../../services/configService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function empRoleSuccess(empRoles) {
  return { type: types.EMP_ROLE_SUCCESS, empRoles };
}

export function empStatusSuccess(empStatuses) {
  return { type: types.EMP_STATUS_SUCCESS, empStatuses };
}

export function accessLinkSuccess(accessLinks) {
  return { type: types.ACCESS_LINK_SUCCESS, accessLinks };
}

export function fiscalYearSuccess(fiscalYears) {
  return { type: types.FISCAL_YEAR_SUCCESS, fiscalYears };
}

export function loadEmployeeRoles() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await configService.getEmployeeRole();
      dispatch(empRoleSuccess(data.response ? JSON.parse(data.response) : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function loadEmployeeStatus() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await configService.getEmployeeStatus();
      dispatch(empStatusSuccess(data.response ? JSON.parse(data.response) : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function loadAccessLinks() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await configService.getAccessLinks();
      dispatch(accessLinkSuccess(data.response ? data.response : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function loadFiscalYears() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await configService.getFiscalYear();
      dispatch(fiscalYearSuccess(data.response ? JSON.parse(data.response) : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}
