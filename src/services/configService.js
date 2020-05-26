import http from './httpService';

// const configApiUrl = `configs`;
const empStatusApiUrl = `configs/service_status`;
const countryApiUrl = `configs/country`;
const roleApiUrl = `configs/user_roles`;
const fiscalYrApiUrl = `configs/fiscal_yr`;
const accessLinkUrl = 'configs/acl';

export async function getCountries() {
  return await http.get(countryApiUrl);
}

export async function getEmployeeStatus() {
  return await http.get(empStatusApiUrl);
}

export async function getEmployeeRole() {
  return await http.get(roleApiUrl);
}

export async function getFiscalYear() {
  return await http.get(fiscalYrApiUrl);
}

export async function getAccessLinks() {
  return await http.get(accessLinkUrl);
}
