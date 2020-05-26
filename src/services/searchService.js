import http from './httpService';

const searchUrl = `users/search`;

export async function searchData(searchKey, type) {
  switch (type) {
    case 'params':
      return await http.post(searchUrl, null, { params: searchKey });
    case 'array':
      return await http.post(searchUrl, [searchKey]);
    default:
      break;
  }
}
