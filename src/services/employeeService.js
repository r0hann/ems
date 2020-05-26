import http from './httpService';
// import auth from './authService';
import { toast } from 'react-toastify';
// import config from '../config.json';

const userApiUrl = `users`;

function getUserUrl(id) {
  return `${userApiUrl}/${id}`;
}

function getUserUrlByLimit(limit) {
  return `${userApiUrl}?limit=${limit}`;
}

// function getUserUrlByPage(page) {
//   return `${userApiUrl}?page=${page}`;
// }

function getUserDetailUrl(id) {
  return `${userApiUrl}/${id}/details`;
}

// function getDetailUrl(userId, detailId) {
//   return `${userApiUrl}/${userId}/details/${detailId}`;
// }

export async function getEmployeesByPage(page) {
  return await http.get(userApiUrl, { params: { page } });
}

export async function getEmployeesByLimit(limit = 200) {
  const data = await http.get(getUserUrlByLimit(limit));
  return data;
}
export async function getEmployees() {
  try {
    const data = await http.get(userApiUrl);
    return data;
  } catch (error) {}
}

export async function getEmployeeById(id) {
  const { data } = await http.get(getUserUrl(id));
  return data.response;
}

export async function saveEmployee(user) {
  if (user.id) {
    const body = { ...user };
    const { data } = await http.put(getUserUrl(user.id), body);
    return data;
  }
  const { data } = await http.post(userApiUrl, user);
  return data;
}

export async function deleteEmployee(id) {
  try {
    const { data } = await http.delete(getUserUrl(id));
    toast.success(data.message);
  } catch (error) {}
}

/** employeeDetails*/

/**
 *
 * @param {user id} id
 */
export async function getEmployeeDetailById(id) {
  try {
    const { data } = await http.get(getUserDetailUrl(id));
    return data.response;
  } catch (error) {}
}

export async function saveEmployeeDetail(userDetail) {
  if (userDetail.employee_id) {
    const body = { ...userDetail };
    // delete body.id;
    return await http.put(getUserDetailUrl(userDetail.user_id), body);
  }
  return await http.post(getUserDetailUrl(userDetail.user_id), userDetail);
}

export async function deleteEmployeeDetail(id) {
  try {
    const { data } = await http.delete(getUserDetailUrl(id));
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeDetails*/
