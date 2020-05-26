import * as types from './actionTypes';
import * as countryService from '../../services/countryService';
import { beginApiCall, apiCallError } from './apiCallActions';

export function loadCountriesSuccess(countries) {
  return { type: types.LOAD_COUNTRIES_SUCCESS, countries };
}

export function loadCountries() {
  return async function(dispatch) {
    dispatch(beginApiCall());
    try {
      const { data } = await countryService.getCountriesByLimit();
      dispatch(loadCountriesSuccess(data.response?data.response.data:{}));
    } catch (error) {
      dispatch(apiCallError(error.response?error.response.data:{}));
    }
  };
}
