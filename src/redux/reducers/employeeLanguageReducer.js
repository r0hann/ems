import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeLanguageReducer(
  state = initialState.employeeLanguage,
  action
) {
  switch (action.type) {
    case types.LOAD_USERLANGUAGE_SUCCESS:
      return action.employeeLanguage;
    case types.CREATE_USERLANGUAGE_SUCCESS:
      return [...state, { ...action.employeeLanguage }];
    case types.UPDATE_USERLANGUAGE_SUCCESS:
      return state.map(language =>
        language.id === action.employeeLanguage.id ? action.employeeLanguage : language
      );
    case types.DELETE_USERLANGUAGE_OPTMISTIC:
      return state.filter(language => language.id !== action.employeeLanguage.id);
    default:
      return state;
  }
}
