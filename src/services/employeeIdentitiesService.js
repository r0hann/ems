import http from './httpService';
import { toast } from 'react-toastify';

function getUserIdentitiesUrl(id) {
  return `users/${id}/identities`;
}

function getIdentitiesUrl(userId, identityId) {
  return `users/${userId}/identities/${identityId}`;
}

/** employeeIdentities*/

/**
 *
 * @param {user id} id
 */
export async function getEmployeeIdentityById(id) {
  try {
    const { data } = await http.get(getUserIdentitiesUrl(id));
    return data.response.data;
  } catch (error) {}
}

export async function saveEmployeeIdentity(userIdentity, userId) {
  const body = { ...userIdentity };
  delete body.user_id;
  if (userIdentity.user_id) {
    return await http.put(getIdentitiesUrl(userId, userIdentity.id), body);
  }
  return await http.post(getUserIdentitiesUrl(userId), userIdentity);
}

export async function deleteEmployeeIdentity(userId, identityId) {
  try {
    const { data } = await http.delete(getIdentitiesUrl(userId, identityId));
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeIdentities*/
