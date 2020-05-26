import http from './httpService';
// import config from '../config.json';
import jwtDecode from 'jwt-decode';

const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(username, password) {
  const { data } = await http.post('login', {
    username,
    password
  });
  localStorage.setItem(tokenKey, data.response.token);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getUserId() {
  return getCurrentUser().sub;
}

export function getExpiry() {
  return getCurrentUser().exp;
}

export function getCurrentUser() {
  try {
    // jwtDecode cannot be empty
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getUserId,
  getExpiry,
  getCurrentUser,
  loginWithJwt,
  getJwt
};
