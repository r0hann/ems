import http from './httpService';
import { toast } from 'react-toastify';

function getUserLanguageUrl(id) {
  return `users/${id}/languages`;
}

function getLanguageUrl(userId, languageId) {
  return `users/${userId}/languages/${languageId}`;
}

/** employeeLanguages*/

/**
 *
 * @param {user id} id
 */
export async function getEmployeeLanguageById(id) {
  try {
    const { data } = await http.get(getUserLanguageUrl(id));
    return data.response.data;
  } catch (error) {}
}

export async function saveEmployeeLanguage(userLanguage, userId) {
  const body = { ...userLanguage };
  if (userLanguage.user_id) {
    return await http.put(getLanguageUrl(userId, userLanguage.id), body);
  }
  return await http.post(getUserLanguageUrl(userId), userLanguage);
}

export async function deleteEmployeeLanguage(userId, languageId) {
  try {
    const { data } = await http.delete(getLanguageUrl(userId, languageId));
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeLanguages*/
