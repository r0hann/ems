import http from './httpService';
import { toast } from 'react-toastify';

function getUserSkillUrl(userId) {
  return `users/${userId}/skills`;
}
function getSkillUrl(userId, skillId) {
  return `users/${userId}/skills/${skillId}`;
}

/** employeeSkill*/

/**
 *
 * @param {user id} id
 */
export async function getEmployeeSkillById(id) {
  try {
    const { data } = await http.get(getUserSkillUrl(id));
    return data.response.data;
  } catch (error) {}
}

export async function saveEmployeeSkill(userSkill, userId) {
  const body = { ...userSkill };
  if (userSkill.id) {
    return await http.put(getSkillUrl(userId, userSkill.id), body);
  }
  return await http.post(getUserSkillUrl(userId), body);
}

export async function deleteEmployeeSkill(userId, skillId) {
  try {
    const { data } = await http.delete(getSkillUrl(userId, skillId));
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeSkill*/
