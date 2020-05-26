import http from './httpService';
import auth from './authService';
// import { toast } from 'react-toastify';

const leaveApplicationUrl = 'leaves/applications';
function getLeaveApplicationUrl(leaveId) {
  return `${leaveApplicationUrl}/${leaveId}`;
}

function getUserLeaveAppUrl(userId) {
  return `users/${userId}/${leaveApplicationUrl}`;
}

function getLeaveApplicationCancelUrl(leaveApplicationId) {
  return `${leaveApplicationUrl}/${leaveApplicationId}/cancel`;
}

function getLeaveApplicationApproveUrl(leaveApplicationId) {
  return `${leaveApplicationUrl}/${leaveApplicationId}/approve`;
}

export async function getLeaveApplications(page) {
  return await http.get(leaveApplicationUrl, {
    params: {
      page
    }
  });
}

export async function getPendingLeaveApplication() {
  const { data } = await http.get(leaveApplicationUrl);
  return data;
}
/**
 *
 * @param {leave appication id} id
 */
export async function getLeaveApplicationByLeaveAppId(id) {
  try {
    const { data } = await http.get(getLeaveApplicationUrl(id));
    return data;
  } catch (error) {}
}

export async function getLeaveAppByUserId() {
  const userId = auth.getUserId();

  const { data } = await http.get(getUserLeaveAppUrl(userId));
  return data;
}

export async function cancelLeaveApplication(leaveAppId) {
  const { data } = await http.put(getLeaveApplicationCancelUrl(leaveAppId));
  return data;
}

export async function approveLeaveApplication(leaveAppId) {
  const { data } = await http.put(getLeaveApplicationApproveUrl(leaveAppId));
  return data;
}

export async function saveLeaveApplication(leaveApplication) {
  const body = { ...leaveApplication };

  return await http.post(leaveApplicationUrl, body);
}

export async function deleteLeaveApplication(userId, id) {
  const { data } = await http.delete(getLeaveApplicationUrl(id));
  return data;
}

/**END leave Application*/
