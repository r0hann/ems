import http from './httpService';
// import auth from './authService';
// import { apiUrl } from '../config.json';

const designationUrl = `designations`;

function getDesignationUrl(id) {
  return `${designationUrl}/${id}`;
}

export async function getDesignations() {
  return await http.get(designationUrl);
}

export async function getDesignationById(id) {
  return await http.get(getDesignationUrl(id));
}

export async function deleteDesignation(id) {
  const { data } = await http.delete(getDesignationUrl(id));
  return data;
}

export async function saveDesignation(designation) {
  if (designation.id) {
    const body = { ...designation };
    // delete body.id;
    const data = await http.put(getDesignationUrl(designation.id), body);
    return data;
  }
  return await http.post(designationUrl, designation);
}
