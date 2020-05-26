import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fiscalYearReducer(state = initialState.fiscalYears, action) {
  switch (action.type) {
    case types.FISCAL_YEAR_SUCCESS:
      return action.fiscalYears;
    default:
      return state;
  }
}
