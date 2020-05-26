import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeContactReducer(
  state = initialState.employeeContact,
  action
) {
  switch (action.type) {
    case types.LOAD_USERCONTACT_SUCCESS:
      return action.employeeContact;
    case types.CREATE_USERCONTACT_SUCCESS:
      return [...state, { ...action.employeeContact }];
    case types.UPDATE_USERCONTACT_SUCCESS:
      return state.map(contact =>
        contact.id === action.employeeContact.id
          ? action.employeeContact
          : contact
      );
    case types.DELETE_USERCONTACT_OPTMISTIC:
      return state.filter(contact => contact.id !== action.employeeContact.id);
    default:
      return state;
  }
}
