import http from './httpService';
// import { toast } from 'react-toastify';

const leaveUrl = 'leaves/types';

function getLeaveUrl(leaveId) {
    return `${leaveUrl}/${leaveId}`;
}

function getUserUrl(userId) {
    return `users/${userId}/${leaveUrl}`;
}

export async function getAllLeaveType() {
    const {data} = await http.get(leaveUrl);
    return data;
}

/** leave Type*/

/**
 *
 * @param {leave id} id
 */
export async function getLeaveTypeById(id) {
    try {
        const {data} = await http.get(getLeaveUrl(id));
        return data.response.data;
    } catch (error) {
    }
}

export async function getUserLeaveType(userId) {
    return await http.get(getUserUrl(userId));
}

export async function saveLeaveType(leaveType) {
    const body = {...leaveType};
    if (leaveType.id) {
        return await http.put(getLeaveUrl(leaveType.id), body);
    }
    return await http.post(leaveUrl, body);
}

export async function deleteLeaveType(userId, id) {
    return await http.delete(getLeaveUrl(id));
}

/**END leave Type*/
