import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function calendarReducer(
  state = initialState.calendars,
  action
) {
  switch (action.type) {
    case types.LOAD_CALENDAR_SUCCESS:
      return action.calendars;
    case types.CREATE_CALENDAR_SUCCESS:
      return [...state, { ...action.calendar }];
    case types.UPDATE_CALENDAR_SUCCESS:
      return state.map(calendar =>
        calendar.id === action.calendar.id ? action.calendar : calendar
      );
    case types.DELETE_CALENDAR_OPTMISTIC:
      return state.filter(calendar => calendar.id !== action.calendar.id);
    default:
      return state;
  }
}
