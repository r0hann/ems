// import React from 'react';

const tabsColumnList = [
  { name: 'role', label: 'Roles', propsName: 'empRoles', labelColumn: 'roleColumn' },
  {
    name: 'service_status',
    label: 'Service Status',
    propsName: 'empStatuses',
    labelColumn: 'serviceStatusColumn'
  },
  {
    name: 'access_links',
    label: 'Access Links',
    propsName: 'accessLinks',
    labelColumn: 'accessLinkColumn'
  },
  {
    name: 'fiscal_yr',
    label: 'Fiscal Year',
    propsName: 'fiscalYears',
    labelColumn: 'fiscalYearColumn'
  }
  // {name:'', label:''},
];

const roleColumn = [
  { path: 'id', label: 'Role Id' },
  { path: 'label', label: 'Role' }
];

const serviceStatusColumn = [
  { path: 'id', label: 'Status Id' },
  { path: 'label', label: 'Service Status' }
];

const accessLinkColumn = [
  { path: 'uri', label: 'Access Url' },
  { path: 'access', label: 'Access Type' }
];

const fiscalYearColumn = [
  { path: 'name', label: 'Name' },
  { path: 'start', label: 'Fiscal Start' },
  { path: 'end', label: 'Fiscal End' }
];

export default {
  tabsColumnList,
  roleColumn,
  serviceStatusColumn,
  accessLinkColumn,
  fiscalYearColumn
};
