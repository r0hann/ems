import http from './httpService';

const calendarUrl = `calendars`;

function getCalendarUrl(id) {
  return `${calendarUrl}/${id}`;
}

export async function getAllCalendar() {
  const { data } = await http.get(calendarUrl);
  return data;
}

export async function getCalendarById(id) {
  const { data } = await http.get(getCalendarUrl(id));
  return data;
}

export async function deleteCalendar(userId, id) {
  const { data } = await http.delete(getCalendarUrl(id));
  return data;
}

export async function saveCalendar(calendar) {
  if (calendar.id) {
    const body = { ...calendar };
    // delete body.id;
    const data = await http.put(getCalendarUrl(calendar.id), body);
    return data;
  }
  return await http.post(calendarUrl, calendar);
}

export async function getCalendarByDate(date) {
  const { data } = await http.get(getCalendarUrl(date));
  return data;
}
