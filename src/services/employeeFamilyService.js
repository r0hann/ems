import http from './httpService';
import { toast } from 'react-toastify';

function getUserFamilyUrl(id) {
  return `users/${id}/families`;
}

function getFamilyUrl(userId, familyId) {
  return `users/${userId}/families/${familyId}`;
}

/** employeeFamily*/

/**
 *
 * @param {user id} id
 */
export async function getEmployeeFamilyById(id) {
  try {
    const { data } = await http.get(getUserFamilyUrl(id));
    return data.response.data;
  } catch (error) {}
}

export async function saveEmployeeFamily(userFamily, userId) {
  const body = { ...userFamily };
  delete body.user_id;
  if (userFamily.user_id) {
    return await http.put(getFamilyUrl(userId, userFamily.id), body);
  }
  return await http.post(getUserFamilyUrl(userId), body);
}

export async function deleteEmployeeFamily(userId, familyId) {
  try {
    const { data } = await http.delete(getFamilyUrl(userId, familyId));
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeFamily*/
