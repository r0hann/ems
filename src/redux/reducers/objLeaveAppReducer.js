import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function objLeaveAppReducer(
  state = initialState.leaveApp,
  action
) {
  switch (action.type) {
    case types.LOAD_OBJ_LEAVEAPP_SUCCESS:
      return action.leaveApp;

    // case types.DELETE_LEAVETYPE_OPTMISTIC:
    //   return state.filter(leaveType => leaveType.id !== action.leaveType.id);
    default:
      return {};
  }
}
