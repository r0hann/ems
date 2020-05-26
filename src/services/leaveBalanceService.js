import http from './httpService';
// import auth from './authService';
// import { toast } from 'react-toastify';

const leaveBalanceUrl = 'leaves/balances';

function getLeaveBalanceUrl(leaveId) {
  return `${leaveBalanceUrl}/${leaveId}`;
}

function getUserLeaveBalanceUrl(userId) {
  return `users/${userId}/${leaveBalanceUrl}`;
}

export async function getEmployeeLeaveBalance(userId) {
  const { data } = await http.get(getUserLeaveBalanceUrl(userId));
  return data;
}

/** leave Balance*/

/**
 *
 * @param {leave balance id} id
 */
export async function getLeaveBalanceById(id) {
  const { data } = await http.get(getLeaveBalanceUrl(id));
  return data;
}

export async function assignLeaveBalance(leaveBalance) {
  const body = { ...leaveBalance };

  return await http.post(leaveBalanceUrl, body);
}

export async function updateLeaveBalance(leaveBalance) {
  const body = { ...leaveBalance };

  return await http.put(getLeaveBalanceUrl(leaveBalance.id), body);
}

export async function deleteleaveBalance(userId, id) {
  const { data } = await http.delete(getLeaveBalanceUrl(id));
  return data;
}

/**END leave Balance*/
