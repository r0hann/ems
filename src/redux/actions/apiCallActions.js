import * as types from './actionTypes';

export function beginApiCall() {
  return { type: types.BEGIN_API_CALL };
}
export function apiCallSuccess() {
  return { type: types.API_CALL_SUCCESS };
}
export function apiCallError(apiError) {
  return { type: types.API_CALL_ERROR, apiError };
}
