import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function calendarObjectReducer(
  state = initialState.calendar,
  action
) {
  switch (action.type) {
    case types.LOAD_ONECALENDAR_SUCCESS:
      return action.calendar;
    default:
      return state;
  }
}
