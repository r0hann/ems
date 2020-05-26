import http from './httpService';
import { toast } from 'react-toastify';

function getUserDocumentUrl(id) {
  return `users/${id}/documents`;
}

function getDocumentUrl(userId, documentId) {
  return `users/${userId}/documents/${documentId}`;
}

/** employeeDocument*/

/**
 *
 * @param {user id} id
 */
export async function getUserEmployeeDocument(id) {
  try {
    const { data } = await http.get(getUserDocumentUrl(id));
    return data.response.data;
  } catch (error) {}
}

export async function saveEmployeeDocument(userDocument, userId) {
  const body = { ...userDocument };
  if (userDocument.user_id) {
    return await http.put(getDocumentUrl(userId, userDocument.id), body);
  }
  return await http.post(getUserDocumentUrl(userDocument.user_id), body);
}

export async function deleteEmployeeDocument(userId, documentId) {
  try {
    const { data } = await http.delete(getDocumentUrl(userId, documentId));
    toast.success(data.message);
  } catch (error) {}
}
/**END employeeDocument*/
