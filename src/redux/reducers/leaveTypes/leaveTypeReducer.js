import * as types from '../../actions/actionTypes';
import initialState from '../initialState';

export default function leaveTypeReducer(
  state = initialState.leaveTypes,
  action
) {
  switch (action.type) {
    case types.LOAD_LEAVE_TYPES_SUCCESS:
      return action.leaveTypes;
    case types.CREATE_LEAVE_TYPE_SUCCESS:
      return [...state, { ...action.leaveType }];
    case types.UPDATE_LEAVE_TYPE_SUCCESS:
      return state.map(leaveType =>
        leaveType.id === action.leaveType.id ? action.leaveType : leaveType
      );
    case types.DELETE_LEAVETYPE_OPTMISTIC:
      return state.filter(leaveType => leaveType.id !== action.leaveType.id);
    default:
      return state;
  }
}
