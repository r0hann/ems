import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeSkillReducer(
  state = initialState.employeeSkill,
  action
) {
  switch (action.type) {
    case types.LOAD_USERSKILL_SUCCESS:
      return action.employeeSkill;
    case types.CREATE_USERSKILL_SUCCESS:
      return [...state, { ...action.employeeSkill }];
    case types.UPDATE_USERSKILL_SUCCESS:
      return state.map(skill =>
        skill.id === action.employeeSkill.id ? action.employeeSkill : skill
      );
    case types.DELETE_USERSKILL_OPTMISTIC:
      return state.filter(skill => skill.id !== action.employeeSkill.id);
    default:
      return state;
  }
}
