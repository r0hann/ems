import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Button from '@material-ui/core/Button';
import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { materialStyles } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import InputField from './common/inputField';
import auth from '../services/authService';
import { loadEmployeeRoles } from './../redux/actions/configActions';
import { saveEmployee } from './../redux/actions/employeesActions';
import EclipseLoading from './common/eclipseLoading';
import * as UrlConst from './constants/urlConstants';
import DynamicSelectOptions from './common/dynamicSelectOptions';

const useStyles = theme => materialStyles(theme);

class UserForm extends Form {
  userData = { email: '', role: 'employee', active: 1 };
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
    // password: Joi.string()
    //   .required()
    //   .label('Password'),
    role: Joi.string()
      .required()
      .max(8)
      .label('Role'),
    active: Joi.number()
  };

  componentDidMount() {
    const { loadEmployeeRoles } = this.props;
    const userId = this.props.match.params.id;

    loadEmployeeRoles();
    if (userId === 'new') {
      this.setState({ newUser: true });
      return;
    }
    this.setState({ userId });
    // this.popupateUser(this.props.employee, userId);
  }

  componentDidUpdate(prevProps) {
    if (
      Object.keys(this.props.employee).length > 0 &&
      prevProps.employee !== this.props.employee
    ) {
      this.popupateUser();
    }
  }

  popupateUser = () => {
    const { employee } = this.props;
    if (Object.keys(employee).length > 0)
      this.setState({
        data: this.mapToViewModel(employee),
        notFound: false
      });
  };

  popupateNewUser() {
    this.setState({ data: this.userData });
  }

  mapToViewModel = user => {
    return {
      id: user.id,
      email: user.email,
      // password: user.password ? user.password : '',
      role: user.role,
      active: user.active
    };
  };

  handleCheckBox = ({ target }) => {
    const data = { ...this.state.data, active: target.checked ? 1 : 0 };
    this.setState({ data });
  };

  doSubmit = async () => {
    const { history, saveEmployee } = this.props;

    await saveEmployee(this.state.data);
    const employee = this.props.employee;
    history.push(`/user-profile/${employee.id}`);
  };

  render() {
    if (auth.getCurrentUser().role !== 'admin')
      return <Redirect to={UrlConst.EMPLOYEE_DETAIL_URL} />;

    const { classes, apiError, loading } = this.props;
    const { data, errors, newUser, userId } = this.state;
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        {apiError.error && <p>Error: {apiError.message}</p>}
        {loading && (
          <div className={classes.paper}>
            <EclipseLoading></EclipseLoading>
          </div>
        )}
        {!loading && !apiError.error && (
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              User Form
            </Typography>

            <form className={classes.form} onSubmit={this.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <InputField
                    name='email'
                    label='Email'
                    required={true}
                    type='email'
                    error={errors.email}
                    value={data.email}
                    onChange={this.handleChange}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <InputField
                    name='password'
                    label='Password'
                    required={true}
                    type='text'
                    error={errors.password}
                    value={data.password}
                    onChange={this.handleChange}
                  />
                </Grid> */}
                <Grid item xs={8}>
                  <DynamicSelectOptions
                    name='role'
                    itemName='label'
                    label='Employee Role'
                    optionPropName='empRoles'
                    required={true}
                    selectedOption={data.role}
                    handleChange={this.handleChange}
                    error={errors.role}
                    empRoles={this.props.empRoles}
                  />
                  {/* <InputField
                    name='role'
                    label='Role'
                    required={true}
                    type='text'
                    error={errors.role}
                    value={data.role}
                    onChange={this.handleChange}
                  /> */}
                </Grid>
                <Grid item xs={8}>
                  <FormControlLabel
                    name='active'
                    control={
                      <Checkbox
                        checked={data.active === 1}
                        color='primary'
                        value={data.active === 1}
                      />
                    }
                    onChange={this.handleCheckBox}
                    label='Active'
                    labelPlacement='start'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Save
              </Button>
            </form>
          </div>
        )}

        {!loading && !newUser && !apiError.error && (
          <Link className='pull-right' to={`/user-profile/${userId}`}>
            Edit User Details
          </Link>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    empRoles: state.empRoles,
    apiError: state.apiError,
    employee: state.employee,
    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  loadEmployeeRoles,
  saveEmployee
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(UserForm));
