import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function leaveAppRespReducer(state = initialState.leaveAppResponses, action) {
  switch (action.type) {
    case types.RESPONSE_LEAVEAPP_SUCCESS:
      return action.leaveAppResponses;

    default:
      return {};
  }
}
