import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeDocumentReducer(
  state = initialState.employeeDocument,
  action
) {
  switch (action.type) {
    case types.LOAD_USERDOCUMENT_SUCCESS:
      return action.employeeDocument;
    case types.CREATE_USERDOCUMENT_SUCCESS:
      return [...state, { ...action.employeeDocument }];
    case types.UPDATE_USERDOCUMENT_SUCCESS:
      return state.map(document =>
        document.id === action.employeeDocument.id
          ? action.employeeDocument
          : document
      );
    case types.DELETE_USERDOCUMENT_OPTMISTIC:
      return state.filter(
        document => document.id !== action.employeeDocument.id
      );
    default:
      return state;
  }
}
