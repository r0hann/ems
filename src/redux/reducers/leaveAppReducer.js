import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function leaveAppReducer(
    state = initialState.leaveApps,
    action
) {
    switch (action.type) {
        case types.LOAD_LEAVEAPPLICATIONS_SUCCESS:
            return action.leaveApps;

        case types.CREATE_LEAVEAPPLICATION_SUCCESS:
            return [...state, {...action.leaveApp}];

        case types.LOAD_LEAVEAPP_SUCCESS:
            return leaveAppWithUserDetail(state, action.leaveApp);

        case types.APPROVE_LEAVEAPPLICATION_SUCCESS:
            return leaveAppWithUserDetail(state, action.leaveApp);

        case types.CANCEL_LEAVEAPPLICATION_SUCCESS:
            return leaveAppWithUserDetail(state, action.leaveApp);
        // case types.DELETE_LEAVETYPE_OPTMISTIC:
        //   return state.filter(leaveType => leaveType.id !== action.leaveType.id);
        default:
            return state;
    }
}

function leaveAppWithUserDetail(leaveApps, newLeaveApp) {
    return leaveApps.map(leaveApp =>
        leaveApp.id === newLeaveApp.id
            ? {
                ...newLeaveApp,
                user_details: newLeaveApp.user_details
                    ? newLeaveApp.user_details
                    : leaveApp.user_details
            }
            : leaveApp
    );
}
