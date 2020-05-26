import http from './httpService';
import { toast } from 'react-toastify';

function getUserContactUrl(id) {
  return `users/${id}/contacts`;
}

function getContactUrl(userId, contactId) {
  return `users/${userId}/contacts/${contactId}`;
}

/** employeeContact*/

/**
 *
 * @param {user id} id
 */
export async function getUserEmployeeContact(userId) {
  try {
    const { data } = await http.get(getUserContactUrl(userId));
    return data.response.data;
  } catch (error) {}
}

export async function saveEmployeeContact(userContact, userId) {
  const body = { ...userContact };
  delete body.user_id;

  if (userContact.user_id) {
    return await http.put(getContactUrl(userId, userContact.id), body);
  }
  return await http.post(getUserContactUrl(userId), body);
}

export async function deleteEmployeeContact(userId, contactId) {
  try {
    const { data } = await http.delete(getContactUrl(userId, contactId));
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeContact*/
