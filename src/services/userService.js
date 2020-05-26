import http from './httpService';

const userUrl = 'users';

function getUserUrl(id) {
  return `${userUrl}/${id}`;
}

export async function getUserDetailById(id) {
  return await http.get(getUserUrl(id));
}

export async function saveUser(user) {
  if (user.id) {
    const body = { ...user };
    delete body.id;
    return await http.put(getUserUrl(user.id), body);
  }
  return await http.get(userUrl, user);
}
