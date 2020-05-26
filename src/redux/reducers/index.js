import { combineReducers } from 'redux';
import employees from './employeesReducer';
import employee from './singleEmployeeReducer';
import employeeDetail from './employeeDetailReducer';
import employeeContact from './employeeContactReducer';
import employeeAccount from './employeeAccountReducer';
import employeeDocument from './employeeDocumentReducer';
import employeeFamily from './employeeFamilyReducer';
import employeeIdentity from './employeeIdentityReducer';
import employeeInsurance from './employeeInsuranceReducer';
import employeeLanguage from './employeeLanguageReducer';
import employeeQualification from './employeeQualificationReducer';
import employeeServiceDetail from './employeeServiceDetailReducer';
import employeeServices from './employeeServiceReducer';
import employeeSkill from './employeeSkillReducer';
import designations from './designationReducer';
import departments from './departmentsReducer';
import designation from './singleDesignationReducer';
import department from './singleDepartmentReducer';
import calendars from './calendarReducer';
import calendar from './calendarObjectReducer';
import countries from './countryReducer';
import leaveTypes from './leaveTypes/leaveTypeReducer';
import usrLeaveTypes from './leaveTypes/usrLeaveTypeReducer';
import leaveApp from './objLeaveAppReducer';
import leaveApps from './leaveAppReducer';
import leaveBalances from './leaveBalanceReducer';
import apiCallInProgress from './apiStatusReducer';
import apiError from './apiErrorReducer';
import leaveAppResponses from './leaveAppRespReducer';
import searchResult from './searchReducer';
import empStatuses from './empStatusReducer';
import empRoles from './empRoleReducer';
import accessLinks from './accessLinkReducer';
import fiscalYears from './fiscalYearReducer';
import pageDetail from './pageDetailReducer';

const rootReducer = combineReducers({
  apiError,
  employees,
  employee,
  employeeDetail,
  employeeContact,
  employeeAccount,
  employeeDocument,
  employeeFamily,
  employeeIdentity,
  employeeInsurance,
  employeeLanguage,
  employeeQualification,
  employeeServices,
  employeeServiceDetail,
  employeeSkill,
  designations,
  departments,
  apiCallInProgress,
  designation,
  department,
  calendars,
  calendar,
  countries,
  leaveTypes,
  usrLeaveTypes,
  leaveApp,
  leaveApps,
  leaveBalances,
  searchResult,
  leaveAppResponses,
  empStatuses,
  empRoles,
  accessLinks,
  fiscalYears,
  pageDetail
});

export default rootReducer;
