import http from './httpService';
import { toast } from 'react-toastify';

function getUserInsuranceUrl(id) {
  return `users/${id}/insurances`;
}

function getInsuranceUrl(userId, insuranceId) {
  return `users/${userId}/insurances/${insuranceId}`;
}

/** employeeInsurance*/

/**
 *
 * @param {user id} id
 */
export async function getEmployeeInsuranceById(id) {
  try {
    const { data } = await http.get(getUserInsuranceUrl(id));
    return data.response.data;
  } catch (error) {}
}

export async function saveEmployeeInsurance(userInsurance, userId) {
  const body = { ...userInsurance };
  delete body.user_id;
  if (userInsurance.user_id) {
    return await http.put(getInsuranceUrl(userId, userInsurance.id), body);
  }
  return await http.post(getUserInsuranceUrl(userId), body);
}

export async function deleteEmployeeInsurance(userId, insuranceId) {
  try {
    const { data } = await http.delete(getInsuranceUrl(userId, insuranceId));
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeInsurance*/
