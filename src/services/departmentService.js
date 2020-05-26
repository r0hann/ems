import http from './httpService';
// import { apiUrl } from '../config.json';
import { toast } from 'react-toastify';

const departmentUrl = `departments`;

function getDepartmentUrl(id) {
  return `${departmentUrl}/${id}`;
}

export async function getDepartments() {
  return await http.get(departmentUrl);
}

export async function getDepartmentDetailById(id) {
  return await http.get(getDepartmentUrl(id));
}

export async function deleteDepartment(id) {
  try {
    const { data } = await http.delete(getDepartmentUrl(id));
    toast.success(data.message);
  } catch (error) {}
}

export async function saveDepartment(department) {
  try {
    if (department.id) {
      const body = { ...department };
      // delete body.id;
      const { data } = await http.put(getDepartmentUrl(department.id), body);
      toast.success(data.message);
      return data;
    }
    const { data } = await http.post(departmentUrl, department);
    toast.success(data.message);
    return data;
  } catch (error) {}
}
