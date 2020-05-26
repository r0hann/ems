import React from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import { Container, CssBaseline, Typography } from '@material-ui/core';
import { materialStyles } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
// import auth from '../services/authService';
import { saveEmployee } from './../redux/actions/employeesActions';
import * as Constants from './constants/commonConstants';
import DynamicForm from './common/dynamicForm';

const useStyles = theme => materialStyles(theme);

class UpdateUserForm extends Form {
  userData = { email: '', role: '', active: 1 };
  state = {
    data: this.userData,
    errors: {},
    notFound: false,
    newUser: false,
    userId: null
  };

  schemaValidate = {
    id: Joi,
    email: Joi.string()
      .email()
      .required()
      .label('Email'),
    role: Joi.string()
      .required()
      .max(8)
      .label('Role'),
    active: Joi.number()
  };

  componentDidMount() {
    const { loadEmployeeRoles } = this.props;
    // const { userId } = this.props;

    loadEmployeeRoles();
    this.popupateUser();
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(this.props.employee, prevProps.employee)) this.popupateUser();
  // }

  popupateUser = () => {
    const { editItemDetail } = this.props;
    if (editItemDetail && Object.keys(editItemDetail).length > 0)
      this.setState({
        data: this.mapToViewModel(editItemDetail)
      });
  };

  popupateNewUser() {
    this.setState({ data: this.userData });
  }

  mapToViewModel = user => {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      active: user.active
    };
  };

  handleCancel = async () => {
    // await this.props.loadAllCalendar();
    this.props.history.replace('/');
  };

  doSubmit = async () => {
    const { saveEmployee, onCancelEdit } = this.props;

    try {
      await saveEmployee(this.state.data);
      onCancelEdit();
    } catch (error) {
      let objKeys = null;
      const { response } = error.response.data;
      let errors = {};
      if (Object.keys(response) && Object.keys(response).length > 0)
        objKeys = Object.keys(response);
      if (objKeys.length > 0) {
        objKeys.map(key => (errors[key] = response[key][0]));
        this.setState({ errors });
      }
      throw error;
    }
    // const employee = this.props.employee;
    // history.push(`/user-profile/${employee.id}`);
  };

  userFormDetail = [
    {
      field: Constants.INPUTFIELD,
      size: 8,
      name: 'email',
      label: 'Email',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.DYNAMIC_SELECTOPTION,
      size: 6,
      itemName: 'label',
      propsName: 'empRoles',
      required: true,
      name: 'role',
      label: 'Employee Role',
      onChange: this.handleChange
    },
    {
      field: Constants.CHECKBOX,
      size: 12,
      name: 'active',
      label: 'active',
      onChange: this.handleCheckBoxChange
    }
  ];

  render() {
    const { classes, onCancelEdit, ...rest } = this.props;
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              User Form
            </Typography>

            <DynamicForm
              data={data}
              errors={errors}
              {...rest}
              formDetail={this.userFormDetail}
              handleSubmit={this.handleSubmit}
              onCancelEdit={onCancelEdit}
            />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    empRoles: state.empRoles,
    apiError: state.apiError,
    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  saveEmployee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(UpdateUserForm));
