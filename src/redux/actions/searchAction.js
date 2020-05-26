import * as types from './actionTypes';
import * as service from '../../services/searchService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function searchDataSuccess(searchResult) {
  return { type: types.SEARCH_DATA_SUCCESS, searchResult };
}

export function getSearchResult(searchKey, type) {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await service.searchData(searchKey, type);
      dispatch(searchDataSuccess(data ? data.response : []));
    } catch (error) {
      dispatch(apiCallError(error.response ? error.response.data : {}));
      throw error;
    }
  };
}
