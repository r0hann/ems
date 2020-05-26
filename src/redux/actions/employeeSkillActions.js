import * as types from './actionTypes';
import * as employeeService from '../../services/employeeSkillService';
import {beginApiCall, apiCallError} from './apiCallActions';

export function loadEmployeeSkillSuccess(employeeSkill) {
    return {type: types.LOAD_USERSKILL_SUCCESS, employeeSkill};
}

export function createEmployeeSkillSuccess(employeeSkill) {
    return {type: types.CREATE_USERSKILL_SUCCESS, employeeSkill};
}

export function updateEmployeeSkillSuccess(employeeSkill) {
    return {type: types.UPDATE_USERSKILL_SUCCESS, employeeSkill};
}

export function deleteEmployeeSkillOptimistic(employeeSkill) {
    return {type: types.DELETE_USERSKILL_OPTMISTIC, employeeSkill};
}

export function loadEmployeeSkill(id) {
    return async function (dispatch) {
        dispatch(beginApiCall());
        try {
            const data = await employeeService.getEmployeeSkillById(id);
            dispatch(loadEmployeeSkillSuccess(data ? data : []));
        } catch (error) {
            dispatch(apiCallError(error.response ? error.response.data : {}));
            throw error;
        }
    };
}

export function saveEmployeeSkill(employeeSkill, userId) {
    // eslint-disable-next-line no-unused-vars
    return async function (dispatch, getState) {
        dispatch(beginApiCall());
        try {
            const {data} = await employeeService.saveEmployeeSkill(
                employeeSkill,
                userId
            );
            employeeSkill.id
                ? dispatch(updateEmployeeSkillSuccess(data.response))
                : dispatch(createEmployeeSkillSuccess(data.response));
        } catch (error) {
            dispatch(apiCallError(error.response ? error.response.data : {}));
            throw error;
        }
    };
}

export function deleteEmployeeSkill(employeeSkill) {
    return async function (dispatch) {
        dispatch(deleteEmployeeSkillOptimistic(employeeSkill));
        return await employeeService.deleteEmployeeSkill(
            employeeSkill.user_id,
            employeeSkill.id
        );
    };
}
