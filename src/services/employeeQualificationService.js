import http from './httpService';
import { toast } from 'react-toastify';

function getUserQualificationUrl(id) {
  return `users/${id}/qualifications`;
}

function getQualificationUrl(userId, qualificationId) {
  return `users/${userId}/qualifications/${qualificationId}`;
}

/** employeeQualification*/

/**
 *
 * @param {user id} id
 */
export async function getEmployeeQualificationById(id) {
  try {
    const { data } = await http.get(getUserQualificationUrl(id));
    return data.response.data;
  } catch (error) {}
}

export async function saveEmployeeQualification(userQualification, userId) {
  const body = { ...userQualification };
  if (userQualification.user_id) {
    return await http.put(
      getQualificationUrl(userId, userQualification.id),
      body
    );
  }
  return await http.post(getUserQualificationUrl(userId), body);
}

export async function deleteEmployeeQualification(userId, qualificationId) {
  try {
    const { data } = await http.delete(
      getQualificationUrl(userId, qualificationId)
    );
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeQualification*/
