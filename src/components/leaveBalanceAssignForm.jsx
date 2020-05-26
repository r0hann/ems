import React from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import _ from 'lodash';

import { Container, Typography, CssBaseline } from '@material-ui/core';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';

import auth from '../services/authService';
import { loadAllLeaveTypes } from './../redux/actions/leaveTypeActions';
import { saveLeaveBalance } from './../redux/actions/leaveBalanceActions';
import { getSearchEmployees } from '../redux/actions/employeesActions';
import { loadEmployeeStatus } from '../redux/actions/configActions';
import { getFullname, getValueArray, calculateDays } from './helper/commonHelper';

import * as Constants from './constants/commonConstants';
import * as UrlConst from './constants/urlConstants';

import Form from './common/form';
import DynamicForm from './common/dynamicForm';
import ListGroup from './common/listGroup';
import columnList from './common/detailColumnList';

const useStyles = theme => materialStyles2(theme);

class LeaveBalanceAssignForm extends Form {
  state = {
    data: {
      radio_value: '0',
      service_status: '',
      service_by_gender: 'all',
      user_id: [],
      leave_type_id: [],
      active: 0,
      valid_from: null,
      valid_to: null
    },
    hideList: {
      searchEmployees: true,
      service_status: false,
      service_by_gender: false
    },
    disableOptions: {
      leaveTypes: null
    },
    callOnChange: {
      service_status: true
    },
    errors: {}
  };

  schemaValidate = {
    id: Joi.any(),
    radio_value: Joi.any(),
    service_status: Joi.string()
      .allow('')
      .label('Employee Group'),
    service_by_gender: Joi.string()
      .allow('')
      .label('Employee Group'),
    leave_type_id: Joi.array().label('Leave Type'),
    user_id: Joi.array().label('User'),

    active: Joi.number().required(),
    valid_from: Joi.date()
      .required()
      .label('Valid from'),
    valid_to: Joi.date()
      .required()
      .label('Valid to')
  };

  radioData = [
    { id: '0', label: 'Employees' },
    { id: '1', label: 'Employee Group' }
  ];

  async componentDidMount() {
    const { loadAllLeaveTypes, loadEmployeeStatus } = this.props;
    await loadAllLeaveTypes();
    await loadEmployeeStatus();

    this.settingDisabledOptions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.leaveTypes, this.props.leaveTypes)) {
      this.settingDisabledOptions();
    }
  }

  settingDisabledOptions = () => {
    const disableLeaveTypes = this.getDisableOptions(this.props.leaveTypes, 'active', 0);
    const disableOptions = {
      ...this.state.disableOptions,
      leaveTypes: disableLeaveTypes
    };
    this.setState({ disableOptions });
  };

  handleSearchEmployee = async searchChar => {
    const { getSearchEmployees } = this.props;
    const searchkey = ['fname', 'like', searchChar + '%'];
    await getSearchEmployees(searchkey, 'array');
  };

  handleEmployeeListChange = options => {
    let userList = getValueArray(options, 'id');
    const errors = { ...this.state.errors, user_id: null };
    const data = { ...this.state.data, user_id: userList };
    this.setState({ data, errors });
  };

  handleLeaveTypeChange = options => {
    let leaveTypeChange = getValueArray(options, 'id');
    const errors = { ...this.state.errors, leave_type_id: null };
    const data = { ...this.state.data, leave_type_id: leaveTypeChange };
    this.setState({ data, errors });
  };

  handleRadioGroupChange = radioValue => {
    const data = { ...this.state.data, radio_value: radioValue, user_id: [] };
    const searchKey = ['fname', 'like', '%'];
    const hideList = {
      searchEmployees: radioValue === '0',
      service_status: radioValue === '1',
      service_by_gender: radioValue === '1'
    };
    if (radioValue === '1') this.props.getSearchEmployees(searchKey, 'array');
    this.setState({ data, hideList });
  };

  /**Employee Group dropdown onClick event handler */
  handleServiceStatusChange = event => {
    const { target: input } = event;
    const errors = {};
    const errorMessage = this.validateProperty(input);

    // const serviceStatus = { service_status: input.value };
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data, [input.name]: input.value };
    this.setState({ data, errors });
    // this.employeeByService(input.value);
    // if (input.value.length > 0) this.props.getSearchEmployees(serviceStatus, 'params');
  };

  handleCancel = () => {
    this.props.history.push(UrlConst.LEAVE_BALANCE_DETAIL_URL);
  };

  onSubmitApproval = async data => {
    const leaveBalance = data ? { ...data } : { ...this.state.data };
    delete leaveBalance.service_by_gender;
    delete leaveBalance.service_status;
    delete leaveBalance.radio_value;
    await this.props.saveLeaveBalance(this.state.data);
    this.props.history.push(UrlConst.LEAVE_BALANCE_DETAIL_URL);
  };

  /**
   * @param {*} leaveTypeId
   */
  isLeaveTypeEmpty = leaveTypeId => {
    if (leaveTypeId.length === 0) {
      const errors = { ...this.state.errors, leave_type_id: 'No Leave Type Selected.' };
      this.setState({ errors });
      toast.error('Empty Leave Type');
      return true;
    }
    return false;
  };

  validateDate = () => {
    const { valid_from, valid_to } = this.state.data;
    const days = calculateDays(valid_from, valid_to);
    let errors = { ...this.state.errors };
    if (days < 11) {
      errors = {
        ...errors,
        valid_to: 'Difference btw "Valid From " & "Valid To" should be at least 10'
      };
    }
    return errors;
  };

  /** */
  getUserIdByServiceStatusAndGender = () => {
    const { searchEmployees } = this.props;
    const { service_by_gender } = this.state.data;
    let data = {};
    if (service_by_gender !== 'all') {
      const filteredEmployees = searchEmployees.filter(
        empObj => empObj.gender === service_by_gender
      );
      const userList = getValueArray(filteredEmployees, 'id');
      data = { ...this.state.data, user_id: userList };
    } else {
      const userList = getValueArray(searchEmployees, 'id');
      data = { ...this.state.data, user_id: userList };
    }
    return data;
    // this.setState({ data });
  };

  doSubmit = () => {
    const { leave_type_id, user_id } = this.state.data;
    const { searchEmployees, service_status: serviceStatus } = this.state.hideList;
    let errors = this.validateDate();
    if (searchEmployees && !this.isLeaveTypeEmpty(leave_type_id)) {
      if (user_id.length === 0) {
        toast.error('No Employee');
        errors = { ...errors, user_id: 'No employee' };
        this.setState({ errors });
      } else {
        this.onSubmitApproval();
      }
    }
    if (serviceStatus && !this.isLeaveTypeEmpty(leave_type_id)) {
      this.onSubmitApproval(this.getUserIdByServiceStatusAndGender());
    } else if (!serviceStatus && user_id.length === 0 && leave_type_id.length === 0) {
      errors = {
        ...errors,
        user_id: 'No employee',
        leave_type_id: 'No Leave Type Selected.'
      };
      this.setState({ errors });
    }
  };

  getDisableOptions = (options, name, value) => {
    return options.filter(option => option[name] === value);
  };

  getServiceStatusEmployees = () => {
    const { searchEmployees } = this.props;
    const { hideList, data } = this.state;
    const filteredServiceEmployees = searchEmployees.filter(
      employee => employee.service_status === data.service_status
    );
    let filteredEmployees = [...filteredServiceEmployees];
    if (hideList.service_status) {
      if (data.service_by_gender !== 'all') {
        filteredEmployees = filteredServiceEmployees.filter(
          empObj => empObj.gender === data.service_by_gender
        );
      } else if (data.service_by_gender === 'all' && filteredServiceEmployees.length > 0) {
        filteredEmployees = [...filteredServiceEmployees];
      }
    }

    return { filteredEmployees };
  };

  assignFormDetail = [
    {
      field: Constants.RADIOBUTTONGROUP,
      size: 12,
      name: 'radio_value',
      options: this.radioData,
      onChange: this.handleRadioGroupChange
    },
    {
      field: Constants.DYNAMIC_SELECTOPTION,
      size: 5,
      itemName: 'label',
      propsName: 'empStatuses',
      name: 'service_status',
      label: 'Employee Group',
      onChange: this.handleServiceStatusChange
    },
    {
      field: Constants.DYNAMIC_SELECTOPTION,
      size: 4,
      itemName: 'name',
      propsName: 'serviceByGender',
      marginLeft: '20px',

      name: 'service_by_gender',
      label: 'Select gender',
      onChange: this.handleChange
    },
    {
      field: Constants.SEARCH_MULTI_AUTOCOMPLETE,
      label: 'Add Employees',
      propsName: 'searchEmployees',
      name: 'fullname',
      valueId: 'id',
      onSearch: searchChar => this.handleSearchEmployee(searchChar),
      onChange: values => this.handleEmployeeListChange(values)
    },
    {
      field: Constants.DEFAULT_MULTI_AUTOCOMPLETE,
      label: 'Add Leaves Types',
      propsName: 'leaveTypes',
      name: 'title',
      valueId: 'leave_type_id',
      onChange: values => this.handleLeaveTypeChange(values)
    },

    {
      field: Constants.CHECKBOX,
      size: 12,
      name: 'active',
      label: 'Active',
      onChange: event => this.handleCheckBoxChange(event)
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'valid_from',
      label: 'Valid From',
      onError: this.handleDatePickerError,
      onChange: this.handleDateChange
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'valid_to',
      label: 'Valid To',
      onError: this.handleDatePickerError,
      onChange: this.handleDateChange
    }
  ];

  render() {
    if (auth.getCurrentUser().role !== 'admin')
      return <Redirect to={UrlConst.EMPLOYEE_DETAIL_URL} />;

    const { classes, onCancel, ...rest } = this.props;
    const { data, errors, hideList, disableOptions } = this.state;
    const { filteredEmployees } = this.getServiceStatusEmployees();

    return (
      <React.Fragment>
        <div className='row'>
          <Container component='main' maxWidth='sm'>
            <CssBaseline />
            <div className='card m-4 col' style={{ padding: '0px' }}>
              <div className='card-header'>
                <Typography component='h1' variant='h5'>
                  Leave Assign Form
                </Typography>
              </div>
              <div className='card-body'>
                <div className='col'>
                  <DynamicForm
                    {...rest}
                    data={data}
                    errors={errors}
                    hideList={hideList}
                    disableOptions={disableOptions}
                    formDetail={this.assignFormDetail}
                    handleSubmit={this.handleSubmit}
                    onCancelEdit={this.handleCancel}
                    serviceByGender={columnList.genderAllColumn}
                  />
                </div>
              </div>
            </div>
          </Container>
          {data.service_status && hideList.service_status && filteredEmployees.length > 0 && (
            <div className='col-3 card-list'>
              <ListGroup
                style={{
                  maxHeight: 'calc(100vh - 150px)',
                  overflowY: 'auto'
                }}
                textProperty='fullname'
                className='card-list-group'
                items={filteredEmployees}
                // selectedItem={selectedDepartment}
                // onItemSelect={this.handleDepartmentSelect}
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchEmployees: state.employees.map(singleEmp => {
      return {
        ...singleEmp,
        fullname: singleEmp ? getFullname(singleEmp) : ''
      };
    }),
    empStatuses: [{ id: '', label: 'No Status' }, ...state.empStatuses],
    leaveTypes: state.leaveTypes,
    loading: state.apiCallInProgress > 0
  };
};
const mapDispatchToProps = {
  loadAllLeaveTypes,
  saveLeaveBalance,
  loadEmployeeStatus,
  getSearchEmployees
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(LeaveBalanceAssignForm));
