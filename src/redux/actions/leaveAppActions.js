import * as types from './actionTypes';
import * as leaveAppService from '../../services/leaveApplicationService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadLeaveAppsSuccess(leaveApps) {
  return { type: types.LOAD_LEAVEAPPLICATIONS_SUCCESS, leaveApps };
}

export function leaveAppResponseSuccess(leaveAppResponses) {
  return { type: types.RESPONSE_LEAVEAPP_SUCCESS, leaveAppResponses };
}

export function loadUserLeaveAppSuccess(leaveApps) {
  return { type: types.LOAD_USER_LEAVEAPPLICATIONS_SUCCESS, leaveApps };
}

export function loadObjLeaveAppSuccess(leaveApp) {
  return { type: types.LOAD_OBJ_LEAVEAPP_SUCCESS, leaveApp };
}

export function leaveAppSuccess(leaveApp) {
  return { type: types.LOAD_LEAVEAPP_SUCCESS, leaveApp };
}

export function approveLeaveAppSuccess(leaveApp) {
  return { type: types.APPROVE_LEAVEAPPLICATION_SUCCESS, leaveApp };
}

export function cancelLeaveAppSuccess(leaveApp) {
  return { type: types.CANCEL_LEAVEAPPLICATION_SUCCESS, leaveApp };
}

export function createLeaveApplicationSuccess(leaveApp) {
  return { type: types.CREATE_LEAVEAPPLICATION_SUCCESS, leaveApp };
}

export function updateLeaveBalanceSuccess(leaveBalance) {
  return { type: types.UPDATE_LEAVEBALANCE_SUCCESS, leaveBalance };
}

export function loadLeaveApplications(page = 1) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await leaveAppService.getLeaveApplications(page);
      const response = { ...data.response };
      if (response) delete response.data;
      dispatch(loadLeaveAppsSuccess(data.response ? data.response.data : []));
      dispatch(leaveAppResponseSuccess(response ? response : {}));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

// export function loadPendingLeaveApplications() {
//   return async function(dispatch) {
//     dispatch(beginApiCall());
//     try {
//       const data = await leaveAppService.getAllLeaveApplication();
//       dispatch(loadLeaveAppsSuccess(data.response ? data.response.data : []));
//     } catch (error) {
//       dispatch(apiCallError(error.response ? error.response.data : {}));
//     }
//   };
// }

export function leaveApplicationsByUserId() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await leaveAppService.getLeaveAppByUserId();
      dispatch(loadLeaveAppsSuccess(data.response ? data.response : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function loadLeaveApplicationByLeaveAppId(leaveAppId) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await leaveAppService.getLeaveApplicationByLeaveAppId(leaveAppId);
      dispatch(leaveAppSuccess(data.response ? data.response : {}));
      dispatch(loadObjLeaveAppSuccess(data.response ? data.response : {}));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function approveLeaveApplication(leaveApp) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await leaveAppService.approveLeaveApplication(leaveApp.id);
      dispatch(approveLeaveAppSuccess(data.response ? data.response : {}));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function cancelLeaveApplication(leaveApp) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await leaveAppService.cancelLeaveApplication(leaveApp.id);
      dispatch(cancelLeaveAppSuccess(data.response ? data.response : {}));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
    }
  };
}

export function saveLeaveApplication(leaveApp) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await leaveAppService.saveLeaveApplication(leaveApp);
      dispatch(createLeaveApplicationSuccess(data.response.application));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}
