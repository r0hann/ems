import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeServiceDetailReducer(
  state = initialState.employeeServiceDetail,
  action
) {
  switch (action.type) {
    case types.LOAD_USERSERVICEDETAIL_SUCCESS:
      return action.employeeServiceDetail;
    case types.CREATE_USERSERVICEDETAIL_SUCCESS:
      return [...state, { ...action.employeeServiceDetail }];
    case types.UPDATE_USERSERVICEDETAIL_SUCCESS:
      return state.map(serviceDetail =>
        serviceDetail.id === action.employeeServiceDetail.id
          ? action.employeeServiceDetail
          : serviceDetail
      );
    case types.DELETE_USERSERVICEDETAIL_OPTMISTIC:
      return state.filter(
        serviceDetail => serviceDetail.id !== action.employeeServiceDetail.id
      );
    default:
      return state;
  }
}
