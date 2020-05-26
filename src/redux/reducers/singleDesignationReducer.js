import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function singleDesignationReducer(
  state = initialState.designation,
  action
) {
  switch (action.type) {
    case types.LOAD_ONE_DESIGNATION_SUCCESS:
      return action.designation;
    default:
      return state;
  }
}
