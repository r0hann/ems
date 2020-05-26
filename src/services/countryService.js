import http from './httpService';

const countryApiUrl = `countries`;

function getCountryUrlByLimit(limit) {
  return `${countryApiUrl}?limit=${limit}`;
}

function getCountryUrlByPage(page) {
  return `${countryApiUrl}?page=${page}`;
}

export async function getCountriesByPage(page = 1) {
  const data = await http.get(getCountryUrlByPage(page));
  return data;
}
export async function getCountriesByLimit(limit = 250) {
  const data = await http.get(getCountryUrlByLimit(limit));
  return data;
}
