import React from 'react';
import { Link } from 'react-router-dom';

import UpdateUserForm from '../updateUserForm';
import UserDetailForm from '../userDetailForm';
import DocumentForm from '../documentForm';
import EmployeeContactForm from '../employeeContactForm';
import EmployeeIdentityForm from '../employeeIdentityForm';
import EmployeeFamilyForm from '../employeeFamilyForm';
import EmployeeAccountForm from '../employeeAccountForm';
import EmployeeInsuranceForm from '../employeeInsuranceForm';
import EmployeeLanguageForm from '../employeeLanguageForm';
import EmployeeQualificationForm from '../employeeQualificationForm';
import EmployeeServiceForm from '../employeeeServiceFrom';
import EmployeeServiceDetailForm from '../employeeServiceDetailForm';
import EmployeeSkillForm from '../employeeSkillForm';

const profileListColumn = {
  user: 'user',
  userdetail: 'userdetail',
  document: 'document',
  contact: 'contact',
  identity: 'identity',
  family: 'family',
  account: 'account',
  insurance: 'insurance',
  language: 'language',
  qualification: 'qualification',
  services: 'services',
  servicedetail: 'servicedetail',
  skill: 'skill'
};

const languageRating = [
  { id: 1, label: 'Bad' },
  { id: 2, label: 'Good' },
  { id: 3, label: 'Very Good' },
  { id: 4, label: 'Excellent' },
  { id: 5, label: 'Perfect' }
];

const profileTabList = [
  'user',
  'userdetail',
  'document',
  'contact',
  'identity',
  'family',
  'account',
  'insurance',
  'language',
  'qualification',
  'services',
  'servicedetail',
  'skill'
];

const tabColumnList = {
  user: {
    name: 'user',
    label: 'User ',
    propsName: 'employee',
    labelColumn: 'userColumn',
    SelectedForm: UpdateUserForm,
    admin: true
  },
  userdetail: {
    name: 'userdetail',
    label: 'User Detail',
    propsName: 'employeeDetail',
    labelColumn: 'userDetailColumn',
    SelectedForm: UserDetailForm
  },
  document: {
    name: 'document',
    label: 'Document',
    propsName: 'employeeDocument',
    labelColumn: 'documentColumn',
    SelectedForm: DocumentForm
  },
  contact: {
    name: 'contact',
    label: 'Contacts',
    propsName: 'employeeContact',
    labelColumn: 'contactColumn',
    SelectedForm: EmployeeContactForm
  },
  identity: {
    name: 'identity',
    label: 'Identity',
    propsName: 'employeeIdentity',
    labelColumn: 'identityColumn',
    SelectedForm: EmployeeIdentityForm
  },
  family: {
    name: 'family',
    label: 'Family',
    propsName: 'employeeFamily',
    labelColumn: 'familyColumn',
    SelectedForm: EmployeeFamilyForm
  },
  account: {
    name: 'account',
    label: 'Account',
    propsName: 'employeeAccount',
    labelColumn: 'accountColumn',
    SelectedForm: EmployeeAccountForm
  },
  insurance: {
    name: 'insurance',
    label: 'Insurance',
    propsName: 'employeeInsurance',
    labelColumn: 'insuranceColumn',
    SelectedForm: EmployeeInsuranceForm
  },
  language: {
    name: 'language',
    label: 'Language',
    propsName: 'employeeLanguage',
    labelColumn: 'langaugeColumn',
    SelectedForm: EmployeeLanguageForm
  },
  qualification: {
    name: 'qualification',
    label: 'Qualification',
    propsName: 'employeeQualification',
    labelColumn: 'qualificationColumn',
    SelectedForm: EmployeeQualificationForm
  },
  services: {
    name: 'services',
    label: 'Service',
    propsName: 'employeeServices',
    labelColumn: 'servicesColumn',
    SelectedForm: EmployeeServiceForm
  },
  servicedetail: {
    name: 'servicedetail',
    label: 'Service Detail',
    propsName: 'employeeServiceDetail',
    labelColumn: 'serviceDetailColumn',
    SelectedForm: EmployeeServiceDetailForm
  },
  skill: {
    name: 'skill',
    label: 'Skill',
    propsName: 'employeeSkill',
    labelColumn: 'skillColumn',
    SelectedForm: EmployeeSkillForm
  }
};

const documentColumn = [
  { path: 'file_name', label: 'File name' },
  { path: 'description', label: 'Description' },
  {
    path: 'file_path',
    label: 'Download Link',
    content: file => <Link to={file.file_path}>Download</Link>
  }
];
const unEditableDetailColumn = [
  { name: 'document', forAll: true },
  { name: 'user', adminEdit: true }
];

const unDeleteDetailByUserColumn = [
  { name: 'user', forAll: true },
  { name: 'userdetail', forAll: true }
];

const unAddDetailColumn = ['user', 'userdetail'];

const userColumn = [
  { path: 'email', label: 'Email' },
  { path: 'role', label: 'Role' },
  { path: 'active', label: 'Active', type: 'boolean' }
];

const userDetailColumn = [
  { path: 'employee_id', label: 'Employee Id' },
  { path: 'supervisor_name', label: 'Supervisor' },
  { path: 'fullname', label: 'Full name' },
  { path: 'join_date', label: 'Join Date' },
  { path: 'designationName', label: 'Designation' },
  { path: 'departmentName', label: 'Department' },
  { path: 'branch_name', label: 'Branch' },
  { path: 'phone_mobile', label: 'Mobile Number' },
  { path: 'dob', label: 'Date of birth' },
  { path: 'gender_name', label: 'Gender' },
  { path: 'blood_group_name', label: 'Blood Group' },
  { path: 'nationalityName', label: 'Nationality' },
  { path: 'address', label: 'Address' },
  { path: 'city', label: 'City' },
  { path: 'countryName', label: 'Country' }
];

const userDetailColumns = [
  {
    path: 'fullname',
    label: 'Full name'
  },
  { path: 'email', label: 'Email' },
  { path: 'designationName', label: 'Designation' },
  { path: 'detail.extension', label: 'Extension' },
  { path: 'departmentName', label: 'Department' },
  { path: 'detail.phone_personal', label: 'Personal number' },
  { path: 'detail.phone_mobile', label: 'Office number' }
];

const contactColumn = [
  { path: 'extension', label: 'Extension' },
  { path: 'phone_residence', label: 'Residence Number' },
  { path: 'phone_office', label: 'Office Number' },
  { path: 'phone_mobile', label: 'Mobile Number' },
  { path: 'email_personal', label: 'Personal Email' },
  { path: 'emergency_contact_person', label: 'Emergency Contact Person' },
  { path: 'emergency_contact_phone', label: 'Emergency Contact Phone' }
];

const identityColumn = [
  { path: 'type', label: 'Type' },
  { path: 'title', label: 'Title' },
  { path: 'serial', label: 'Serial' },
  { path: 'issue_on', label: 'Issue Date' },
  { path: 'issue_from', label: 'Issue From' },
  { path: 'file_path', label: 'File Path' }
];

const familyColumn = [
  { path: 'fullname', label: 'Fullname' },
  { path: 'relation', label: 'Relation' },
  { path: 'dob', label: 'Date of Birth' },
  { path: 'gender', label: 'Gender' },
  { path: 'blood_group', label: 'Blood Group' },
  { path: 'occupation', label: 'Occupation' },
  { path: 'nationality', label: 'Nationality' },
  { path: 'email', label: 'Email' },
  { path: 'phone', label: 'Phone' },
  { path: 'address', label: 'Address' },
  { path: 'remarks', label: 'Remarks' },
  { path: 'nominee', label: 'Nominee' },
  { path: 'nominee_effective_date', label: 'Nominee Effective Date' },
  { path: 'nominee_remarks', label: 'Nominee Remarks' }
];

const accountColumn = [
  { path: 'pan', label: 'Pan Number' },
  { path: 'cit', label: 'Cit' },
  { path: 'pf', label: 'Provident Fund' },
  { path: 'bank', label: 'Bank' },
  { path: 'other', label: 'Other' },
  { path: 'pf_start_date', label: 'pf start date' },
  { path: 'cit_start_date', label: 'cit start date' }
];

const insuranceColumn = [
  { path: 'company_name', label: 'Company name' },
  { path: 'paid_by', label: 'Paid By' },
  { path: 'policy_name', label: 'Policy name' },
  { path: 'policy_amount', label: 'Policy amount' },
  { path: 'premium', label: 'Premium' },
  { path: 'effective_date', label: 'Effective Date' }
];

const langaugeColumn = [
  { path: 'language', label: 'Language' },
  { path: 'speak', label: 'Speaking' },
  { path: 'read', label: 'Reading' },
  { path: 'write', label: 'Writing' },
  { path: 'native', label: 'Native', type: 'boolean' }
];

const qualificationColumn = [
  { path: 'type', label: 'Type' },
  { path: 'title', label: 'Title' },
  { path: 'description', label: 'Description' },
  { path: 'level', label: 'Level' },
  { path: 'institution', label: 'Institution' },
  { path: 'country', label: 'Country' },
  { path: 'address', label: 'Address' },
  { path: 'join_date', label: 'Join Date' },
  { path: 'completion_date', label: 'Completion Date' },
  { path: 'completion_year', label: 'Completion Year' },
  { path: 'duration', label: 'Duration' },
  { path: 'grade', label: 'Grade' },
  { path: 'funding', label: 'Funding' }
];

const servicesColumn = [
  { path: 'event_type', label: 'Service Type' },
  { path: 'event_date', label: 'Date' },
  { path: 'method', label: 'Method' },
  { path: 'designationName', label: 'Designation' },
  { path: 'departmentName', label: 'Department' },
  { path: 'status', label: 'Status' },
  { path: 'branch', label: 'Branch' },
  { path: 'remarks', label: 'Remarks' }
];

const serviceDetailColumn = [
  { path: 'branch', label: 'Branch' },
  { path: 'designationName', label: 'Designation' },
  { path: 'departmentName', label: 'Department' },
  { path: 'status', label: 'Status' },
  { path: 'position', label: 'position' },
  { path: 'from_date', label: 'Start Date' },
  { path: 'to_date', label: 'End Date' },
  { path: 'remarks', label: 'Remarks' }
];

const skillColumn = [
  { path: 'name', label: 'Name' },
  { path: 'description', label: 'Description' },
  { path: 'category', label: 'Category' },
  { path: 'level', label: 'Level' },
  { path: 'experience', label: 'Experience' }
];

const genderAllColumn = [
  { id: 'all', name: 'All' },
  { id: 'M', name: 'Male' },
  { id: 'F', name: 'Female' }
];

const genderColumn = [
  { id: 'M', name: 'Male' },
  { id: 'F', name: 'Female' }
];
const branchColumn = [{ id: 1, name: 'Dhobighat' }];

const bloodColumn = [
  { id: 'A+', name: 'A RhD positive (A+)' },
  { id: 'A-', name: 'A RhD negative (A-)' },
  { id: 'B+', name: 'B RhD positive (B+)' },
  { id: 'B-', name: 'B RhD negative (B-)' },
  { id: 'O+', name: 'O RhD positive (O+)' },
  { id: 'O-', name: 'O RhD negative (O-)' },
  { id: 'AB+', name: 'AB RhD positive (AB+)' },
  { id: 'AB-', name: 'AB RhD negative (AB-)' }
];

export default {
  languageRating,
  branchColumn,
  genderColumn,
  genderAllColumn,
  profileListColumn,
  bloodColumn,
  profileTabList,
  tabColumnList,
  userColumn,
  userDetailColumn,
  documentColumn,
  identityColumn,
  contactColumn,
  userDetailColumns,
  familyColumn,
  accountColumn,
  insuranceColumn,
  langaugeColumn,
  qualificationColumn,
  servicesColumn,
  serviceDetailColumn,
  skillColumn,
  unAddDetailColumn,
  unEditableDetailColumn,
  unDeleteDetailByUserColumn
};
