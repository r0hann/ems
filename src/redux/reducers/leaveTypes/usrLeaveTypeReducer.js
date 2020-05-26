import * as types from '../../actions/actionTypes';
import initialState from '../initialState';

export default function usrLeaveTypeReducer(
    state = initialState.usrLeaveTypes,
    action
) {
    switch (action.type) {
        case types.USER_LEAVE_TYPES_SUCCESS:
            return action.usrLeaveTypes;

        default:
            return state;
    }
}
