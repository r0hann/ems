import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function leaveBalanceReducer(state = initialState.leaveBalances, action) {
  switch (action.type) {
    case types.LOAD_USER_LEAVEBALANCES_SUCCESS:
      return action.leaveBalances;
    case types.CREATE_LEAVEBALANCE_SUCCESS:
      return [...state, { ...action.leaveBalance }];
    case types.UPDATE_LEAVEBALANCE_SUCCESS:
      return state.map(leaveBalance =>
        leaveBalance.id === action.leaveBalance.id
          ? { ...action.leaveBalance, leave_type: leaveBalance.leave_type }
          : leaveBalance
      );
    // case types.APPROVE_LEAVEAPPLICATION_SUCCESS:
    //   return state.map(leaveType =>
    //     leaveType.id === action.leaveType.id ? action.leaveType : leaveType
    //   );
    // case types.DELETE_LEAVETYPE_OPTMISTIC:
    //   return state.filter(leaveType => leaveType.id !== action.leaveType.id);
    default:
      return state;
  }
}
