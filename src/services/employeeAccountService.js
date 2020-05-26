import http from './httpService';
import { toast } from 'react-toastify';

function getUserAccountUrl(id) {
  return `users/${id}/accounts`;
}

function getAccountUrl(userId, accountId) {
  return `users/${userId}/accounts/${accountId}`;
}

/** employeeAccount*/

export async function getEmployeeAllAccounts(id) {
  try {
    const { data } = await http.get(getUserAccountUrl(id));
    return data.response.data;
  } catch (error) {}
}

/**
 *
 * @param {user id} id
 */
export async function getEmployeeAccountById(id) {
  try {
    const { data } = await http.get(getAccountUrl(id));
    return data.response.data;
  } catch (error) {}
}

export async function saveEmployeeAccount(userAccount, userId) {
  const body = { ...userAccount };
  delete body.user_id;
  if (userAccount.user_id) {
    return await http.put(getAccountUrl(userId, userAccount.id), body);
  }
  return await http.post(getUserAccountUrl(userId), body);
}

export async function deleteEmployeeAccount(userId, accountId) {
  try {
    const { data } = await http.delete(getAccountUrl(userId, accountId));
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeAccount*/
