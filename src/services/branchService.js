import http from './httpService';

const branchApiUrl = `branches`;

function getBranchUrlByLimit(limit) {
  return `${branchApiUrl}?limit=${limit}`;
}

function getBranchUrlByPage(page) {
  return `${branchApiUrl}?page=${page}`;
}

export async function getBranchByPage(page = 1) {
  const data = await http.get(getBranchUrlByPage(page));
  return data;
}
export async function getBranchByLimit(limit = 250) {
  const data = await http.get(getBranchUrlByLimit(limit));
  return data;
}
