import http from './httpService';
import { toast } from 'react-toastify';

function getUserServiceUrl(id) {
  return `users/${id}/services`;
}

function getServiceUrl(userId, serviceId) {
  return `users/${userId}/services/${serviceId}`;
}

/** employeeService*/

/**
 *
 * @param {user id} id
 */
export async function getEmployeeServicesById(id) {
  try {
    const { data } = await http.get(getUserServiceUrl(id));
    return data.response.data;
  } catch (error) {}
}

export async function saveEmployeeServices(userServices, userId) {
  const body = { ...userServices };
  delete body.user_id;
  if (userServices.user_id) {
    return await http.put(getServiceUrl(userId, userServices.id), body);
  }
  return await http.post(getUserServiceUrl(userId), body);
}

export async function deleteEmployeeServices(userId, serviceId) {
  try {
    const { data } = await http.delete(getServiceUrl(userId, serviceId));
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeService*/
