import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function accessLinkReducer(state = initialState.accessLinks, action) {
  switch (action.type) {
    case types.ACCESS_LINK_SUCCESS:
      return action.accessLinks;
    default:
      return state;
  }
}
