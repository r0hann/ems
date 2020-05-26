import * as types from './actionTypes';
import * as leaveBalanceService from '../../services/leaveBalanceService';
import { beginApiCall, apiCallError } from './apiCallActions';
import { toast } from 'react-toastify';

export function loadUserLeaveBalanceSuccess(leaveBalances) {
  return { type: types.LOAD_USER_LEAVEBALANCES_SUCCESS, leaveBalances };
}

export function createLeaveBalanceSuccess(leaveBalance) {
  return { type: types.CREATE_LEAVEBALANCE_SUCCESS, leaveBalance };
}
export function updateLeaveBalanceSuccess(leaveBalance) {
  return { type: types.UPDATE_LEAVEBALANCE_SUCCESS, leaveBalance };
}

export function loadUserLeaveBalances(userId) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await leaveBalanceService.getEmployeeLeaveBalance(userId);
      dispatch(loadUserLeaveBalanceSuccess(data ? data.response : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {})); throw error;
    }
  };
}

export function updateLeaveBalance(leaveBalance) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await leaveBalanceService.updateLeaveBalance(
        leaveBalance
      );
      toast.success(data.message);
      dispatch(updateLeaveBalanceSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveLeaveBalance(leaveBalance) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await leaveBalanceService.assignLeaveBalance(
        leaveBalance
      );
      toast.success(data.message);

      dispatch(createLeaveBalanceSuccess(data.response));
    } catch (error) {
      toast.success(error.response.message);
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}
