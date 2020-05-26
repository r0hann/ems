import * as types from './actionTypes';
import * as calendarService from '../../services/calendarService';
import { beginApiCall, apiCallError } from './apiCallActions';
// import { toast } from 'react-toastify';

export function loadCalendarSuccess(calendars) {
  return { type: types.LOAD_CALENDAR_SUCCESS, calendars };
}

export function loadOneCalendarSuccess(calendar) {
  return { type: types.LOAD_ONECALENDAR_SUCCESS, calendar };
}

export function createCalendarSuccess(calendar) {
  return { type: types.CREATE_CALENDAR_SUCCESS, calendar };
}
export function updateCalendarSuccess(calendar) {
  return { type: types.UPDATE_CALENDAR_SUCCESS, calendar };
}

export function deleteCalendarOptimistic(calendar) {
  return { type: types.DELETE_CALENDAR_OPTMISTIC, calendar };
}

export function loadAllCalendar() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await calendarService.getAllCalendar();
      dispatch(loadCalendarSuccess(data.response ? data.response.data : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function loadCalendarById(holidayId) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const data = await calendarService.getCalendarById(holidayId);
      dispatch(loadOneCalendarSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}

export function saveCalendar(calendar, userId) {
  // eslint-disable-next-line no-unused-vars
  return async function(dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const { data } = await calendarService.saveCalendar(calendar, userId);
      calendar.id
        ? dispatch(updateCalendarSuccess(data.response))
        : dispatch(createCalendarSuccess(data.response));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));

      throw error;
    }
  };
}

export function deleteCalendar(calendar) {
  return async function(dispatch) {
    try {
      dispatch(deleteCalendarOptimistic(calendar));
      return await calendarService.deleteCalendar(calendar.user_id, calendar.id);
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}
