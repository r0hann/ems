import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function designationReducer(
  state = initialState.designations,
  action
) {
  switch (action.type) {
    case types.LOAD_DESIGNATIONS_SUCCESS:
      return action.designations;
    case types.CREATE_DESIGNATION_SUCCESS:
      return [...state, { ...action.designation }];
    case types.UPDATE_DESIGNATION_SUCCESS:
      return state.map(designation =>
        designation.id === action.designation.id
          ? action.designation
          : designation
      );
    case types.DELETE_DESIGNATION_OPTMISTIC:
      return state.filter(
        designation => designation.id !== action.designation.id
      );
    default:
      return state;
  }
}
