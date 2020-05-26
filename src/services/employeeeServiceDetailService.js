import http from './httpService';
import { toast } from 'react-toastify';

function getUserServiceDetailUrl(id) {
  return `users/${id}/servicedetails`;
}

function getServiceDetailUrl(userId, serviceDetailId) {
  return `users/${userId}/servicedetails/${serviceDetailId}`;
}

/** employeeServiceDetail*/

/**
 *
 * @param {user id} id
 */
export async function getEmployeeServiceDetailById(id) {
  try {
    const { data } = await http.get(getUserServiceDetailUrl(id));
    return data.response.data;
  } catch (error) {}
}

export async function saveEmployeeServiceDetail(userServiceDetail, userId) {
  const body = { ...userServiceDetail };
  delete body.user_id;
  if (userServiceDetail.user_id) {
    return await http.put(
      getServiceDetailUrl(userId, userServiceDetail.id),
      body
    );
  }
  return await http.post(getUserServiceDetailUrl(userId), body);
}

export async function deleteEmployeeServiceDetail(userId, serviceDetailId) {
  try {
    const { data } = await http.delete(
      getServiceDetailUrl(userId, serviceDetailId)
    );
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeServiceDetail*/
