import React from 'react';
import Joi from 'joi-browser';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { Container, Typography, CssBaseline } from '@material-ui/core';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import { saveEmployeeServiceDetail } from '../redux/actions/employeeServiceDetailActions';
import * as Constants from './constants/commonConstants';
import DynamicForm from './common/dynamicForm';

const useStyles = theme => materialStyles2(theme);

class EmployeeServiceDetailForm extends Form {
  state = {
    data: {
      branch: '',
      designation: '',
      department: '',
      status: '',
      position: '',
      from_date: null,
      to_date: null,
      remarks: ''
    },
    errors: {}
  };

  componentDidMount() {
    const { editItemDetail } = this.props;
    if (Object.keys(editItemDetail).length > 0) this.popupateServiceDetail();
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(this.props.editItemDetail, prevProps.editItemDetail))
  //     this.popupateServiceDetail();
  // }

  popupateServiceDetail = () => {
    const { editItemDetail } = this.props;

    if (editItemDetail)
      this.setState({
        data: this.mapToViewModel(editItemDetail),
        notFound: false
      });
  };

  schemaValidate = {
    id: Joi,
    user_id: Joi,
    branch: Joi.string().required(),
    designation: Joi.string().required(),
    department: Joi.string().required(),
    status: Joi.string().required(),
    position: Joi.string().required(),
    from_date: Joi.string().required(),
    to_date: Joi.string().required(),
    remarks: Joi.string().required()
  };

  mapToViewModel = employeeServiceDetail => {
    return {
      id: employeeServiceDetail.id || '',
      user_id: employeeServiceDetail.user_id || '',
      branch: employeeServiceDetail.branch || '',
      designation: employeeServiceDetail.designation || '',
      department: employeeServiceDetail.department || '',
      status: employeeServiceDetail.status || '',
      position: employeeServiceDetail.position || '',
      from_date: employeeServiceDetail.from_date || '',
      to_date: employeeServiceDetail.to_date || '',
      remarks: employeeServiceDetail.remarks || ''
    };
  };

  doSubmit = async () => {
    const { saveEmployeeServiceDetail, onCancelEdit, history } = this.props;
    const employeeServiceDetail = { ...this.state.data };
    const userId = this.props.match.params.id;

    try {
      await saveEmployeeServiceDetail(employeeServiceDetail, this.props.userId);
      onCancelEdit();
      // userId ? history.replace(`/user-profile/${userId}`) : history.replace('/user-profile');
    } catch (error) {}
  };

  serviceDetailForm = [
    {
      field: Constants.INPUTFIELD,
      size: 7,
      name: 'branch',
      label: 'Branch',
      required: true,
      onChange: this.handleChange
    },

    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'status',
      label: 'Status',
      required: true,
      onChange: this.handleChange
    },

    {
      field: Constants.DYNAMIC_SELECTOPTION,
      size: 6,
      itemName: 'name',
      valueId: 'id',
      propsName: 'designations',
      name: 'designation',
      label: 'Designation',
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'position',
      label: 'Position',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.DYNAMIC_SELECTOPTION,
      size: 5,
      itemName: 'name',
      valueId: 'id',
      propsName: 'departments',
      name: 'departments',
      label: 'Department',
      onChange: this.handleChange
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'from_date',
      label: 'From Date',
      onError: this.handleDatePickerError,
      onChange: this.handleDateChange
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'to_date',
      label: 'To Date',
      onError: this.handleDatePickerError,
      onChange: this.handleDateChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 12,
      name: 'remarks',
      label: 'Remarks',
      required: true,
      onChange: this.handleChange
    }
  ];

  render() {
    const { classes, loading, onCancelEdit, ...rest } = this.props;
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        {!loading && (
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component='h1' variant='h5'>
                Add Service Detail
              </Typography>
              <DynamicForm
                {...rest}
                data={data}
                errors={errors}
                formDetail={this.serviceDetailForm}
                handleSubmit={this.handleSubmit}
                onCancelEdit={onCancelEdit}
              />
            </div>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.apiCallInProgress > 0
  };
};
const mapDispatchToProps = {
  saveEmployeeServiceDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EmployeeServiceDetailForm));
