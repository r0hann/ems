import * as types from './actionTypes';
import * as leaveTypeService from '../../services/leaveTypeService';
import { beginApiCall, apiCallError } from './apiCallActions';
import { toast } from 'react-toastify';

/**
 *
 * @param {leaveType array} leaveTypes
 */
export function loadLeaveTypesSuccess(leaveTypes) {
  return { type: types.LOAD_LEAVE_TYPES_SUCCESS, leaveTypes };
}

export function userLeaveTypesSuccess(usrLeaveTypes) {
  return { type: types.USER_LEAVE_TYPES_SUCCESS, usrLeaveTypes };
}

/**
 *
 * @param {Object} leaveType
 */
export function loadObjectLeaveTypeSuccess(leaveType) {
  return { type: types.LOAD_OBJECT_LEAVETYPES_SUCCESS, leaveType };
}

export function createLeaveTypeSuccess(leaveType) {
  return { type: types.CREATE_LEAVE_TYPE_SUCCESS, leaveType };
}

export function updateLeaveTypeSuccess(leaveType) {
  return { type: types.UPDATE_LEAVE_TYPE_SUCCESS, leaveType };
}

export function deleteLeaveTypeOptimistic(leaveType) {
  return { type: types.DELETE_LEAVETYPE_OPTMISTIC, leaveType };
}

export function loadAllLeaveTypes() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await leaveTypeService.getAllLeaveType();
      dispatch(loadLeaveTypesSuccess(data.response ? data.response.data : {}));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function loadUserLeaveTypes(userId) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await leaveTypeService.getUserLeaveType(userId);
      dispatch(userLeaveTypesSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveLeaveType(leaveType, userId) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await leaveTypeService.saveLeaveType(leaveType, userId);
      leaveType.id
        ? dispatch(updateLeaveTypeSuccess(data.response))
        : dispatch(createLeaveTypeSuccess(data.response));
      toast.success(data.message);
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));

      throw error;
    }
  };
}

export function deleteLeaveType(leaveType) {
  return async function(dispatch) {
    try {
      dispatch(deleteLeaveTypeOptimistic(leaveType));
      const { data } = await leaveTypeService.deleteLeaveType(leaveType.user_id, leaveType.id);
      toast.success(data.message);
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}
