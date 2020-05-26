import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Container, CssBaseline, Grid, Typography } from '@material-ui/core';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Joi from 'joi-browser';
import InputField from './common/inputField';
import Form from './common/form';
import SelectOptions from './common/selectOptions';
import { getFullname } from './helper/commonHelper';
import { withStyles } from '@material-ui/core/styles';
import { materialStyles2 } from './common/materialStyle';
// import auth from '../services/authService';
import { getSearchEmployees } from './../redux/actions/employeesActions';
import { saveEmployeeDetail } from './../redux/actions/employeeDetailActions';
import SingleSearchAutoComplete from './common/singleSearchAutoComplete';
import MaterialUIPickers from './common/datePicker';
import columnList from './common/detailColumnList';

const useStyles = theme => materialStyles2(theme);

class UserDetailForm extends Form {
  state = {
    data: {
      employee_id: '',
      supervisor: '',
      salutation: 'Mr',
      fname: '',
      mname: '',
      lname: '',
      join_date: null,
      designation: '',
      department: '',
      branch: '',
      dob: null,
      gender: '',
      blood_group: '',
      nationality: '',
      address: '',
      city: '',
      country: ''
    },
    errors: {},
    admin: false
  };

  // constructor(props) {
  //   super(props);
  //   // this.setState({
  //   //   admin: auth.getCurrentUser().role === 'admin' ? true : false
  //   // });
  // }

  schemaValidate = {
    user_id: Joi.number(),
    employee_id: Joi.number().label('Employee Id'),
    supervisor: Joi.number()
      .required()
      .error(() => {
        return {
          message: '"Supervisor" is empty.'
        };
      }),
    supervisor_name: Joi.string().allow(''),
    salutation: Joi.string()
      .trim()
      .required()
      .max(4)
      .label('Salutation'),
    fname: Joi.string()
      .required()
      .max(32)
      .label('First name'),
    mname: Joi.string()
      .max(32)
      .allow('')
      .label('Middle name'),
    lname: Joi.string()
      .required()
      .max(32)
      .label('Last name'),
    join_date: Joi.string(),
    designation: Joi.number()
      .required()
      .label('Designation'),
    department: Joi.number()
      .required()
      .label('Department'),

    branch: Joi.number().required(),
    dob: Joi.string(),
    gender: Joi.string()
      .max(1)
      .required(),
    blood_group: Joi.string(),
    nationality: Joi.number()
      .required()
      .label('Nationality'),
    address: Joi.string(),
    city: Joi.string(),
    country: Joi.number()
  };

  componentDidMount() {
    const { employeeDetail } = this.props;
    if (employeeDetail && Object.keys(employeeDetail).length > 0) this.populateUserDetail();
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(prevProps.searchEmployees, this.props.searchEmployees)) {
  //     console.log('search EMployee', this.props.searchEmployees);
  //   }
  // }

  mapToModel = user => {
    return {
      user_id: user.user_id || '',
      employee_id: user.employee_id || '',
      supervisor: user.supervisor ? user.supervisor.id : '' || '',
      supervisor_name: user.supervisor ? user.supervisor_name : '' || '',
      salutation: user.salutation || '',
      fname: user.fname || '',
      mname: user.mname || '',
      lname: user.lname || '',
      join_date: user.join_date || '',
      designation: user.designation || '',
      department: user.department || '',
      branch: user.branch || '',
      dob: user.dob || '',
      gender: user.gender || '',
      blood_group: user.blood_group || '',
      nationality: user.nationality || '',
      address: user.address || '',
      city: user.city || '',
      country: user.country || ''
    };
  };

  populateUserDetail = () => {
    const { editItemDetail } = this.props;
    if (editItemDetail) this.setState({ data: this.mapToModel(editItemDetail) });
  };

  fetchSearchEmployee = async searchValue => {
    const searchArray = ['fname', 'like', searchValue + '%'];
    await this.props.getSearchEmployees(searchArray, 'array');
  };

  handleSelectChange = searchEmp => {
    const data = {
      ...this.state.data,
      supervisor: searchEmp ? searchEmp.id : null,
      supervisor_name: searchEmp ? searchEmp.fname : ''
    };
    this.setState({ data });
  };

  doSubmit = async () => {
    const { userId, saveEmployeeDetail, onCancelEdit } = this.props;
    // const paramId = this.props.match.params.id;
    const employeeDetail = { ...this.state.data, user_id: parseInt(userId) };
    try {
      await saveEmployeeDetail(employeeDetail);
      onCancelEdit();
    } catch (error) {
      throw error;
      // this.setState({ errors: response.data.response });
    }
  };

  getFormData = () => {
    const { editItemDetail } = this.props;
    const { data } = this.state;
    const userDetail = {
      ...data,
      supervisor:
        editItemDetail && editItemDetail.supervisor
          ? {
              ...editItemDetail.supervisor,
              detail: setSupervisorName(editItemDetail.supervisor.detail)
            }
          : {}
    };
    return { userDetail };
  };

  render() {
    const {
      classes,
      onCancelEdit,
      departments,
      designations,
      countries,
      searchEmployees
    } = this.props;
    const { errors } = this.state;
    const { userDetail } = this.getFormData();
    return (
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            User Detail Form
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3}>
                <InputField
                  name='salutation'
                  label='Salutation'
                  required={true}
                  value={userDetail.salutation}
                  error={errors.salutation}
                  onChange={this.handleChange}
                  autoFocus={true}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <InputField
                  name='fname'
                  label='First Name'
                  required={true}
                  value={userDetail.fname}
                  onChange={this.handleChange}
                  error={errors.fname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='mname'
                  label='Middle Name'
                  value={userDetail.mname}
                  required={false}
                  onChange={this.handleChange}
                  error={errors.mname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='lname'
                  label='Last Name'
                  required={true}
                  value={userDetail.lname}
                  onChange={this.handleChange}
                  error={errors.lname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MaterialUIPickers
                  name='join_date'
                  label='Join Date'
                  required={true}
                  error={errors.join_date}
                  value={userDetail.join_date}
                  onError={this.handleDatePickerError}
                  onChange={this.handleDateChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='employee_id'
                  label='Employee Id'
                  required={true}
                  value={userDetail.employee_id}
                  onChange={this.handleChange}
                  error={errors.employee_id}
                />
              </Grid>
              <Grid item xs={12}>
                <SingleSearchAutoComplete
                  name='fullname'
                  valueId='id'
                  label='Supervisor'
                  fieldDetail={userDetail.supervisor.detail}
                  onFetchData={this.fetchSearchEmployee}
                  resultOptions={searchEmployees}
                  handleOptionChange={this.handleSelectChange}
                  error={errors.supervisor}
                />
              </Grid>
              <Grid item xs={6}>
                <MaterialUIPickers
                  name='dob'
                  label='Date of Birth'
                  required={true}
                  error={errors.dob}
                  value={userDetail.dob}
                  onError={this.handleDatePickerError}
                  onChange={this.handleDateChange}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectOptions
                  options={designations}
                  name='designation'
                  itemName='name'
                  label='Designation'
                  valueId='id'
                  required={true}
                  selectedOption={userDetail.designation}
                  handleChange={this.handleChange}
                  error={errors.designation}
                />
              </Grid>

              <Grid item xs={6}>
                <SelectOptions
                  options={columnList.genderColumn}
                  name='gender'
                  itemName='name'
                  valueId='id'
                  label='Gender'
                  required={true}
                  selectedOption={userDetail.gender}
                  handleChange={this.handleChange}
                  error={errors.gender}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectOptions
                  options={departments}
                  name='department'
                  itemName='name'
                  valueId='id'
                  label='Department'
                  required={true}
                  selectedOption={userDetail.department}
                  handleChange={this.handleChange}
                  error={errors.department}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectOptions
                  options={columnList.branchColumn}
                  name='branch'
                  itemName='name'
                  valueId='id'
                  label='Branch'
                  required={true}
                  selectedOption={userDetail.branch}
                  handleChange={this.handleChange}
                  error={errors.branch}
                />
                {/* <InputField
                  name='branch'
                  label='Branch'
                  value={userDetail.branch}
                  onChange={this.handleChange}
                  required={true}
                  error={errors.branch}
                /> */}
              </Grid>

              <Grid item xs={6}>
                <SelectOptions
                  options={columnList.bloodColumn}
                  name='blood_group'
                  itemName='name'
                  valueId='id'
                  label='Blood Group'
                  required={true}
                  selectedOption={userDetail.blood_group}
                  handleChange={this.handleChange}
                  error={errors.blood_group}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  name='address'
                  label='Address'
                  required={true}
                  value={userDetail.address}
                  onChange={this.handleChange}
                  error={errors.address}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectOptions
                  options={countries}
                  name='nationality'
                  itemName='name'
                  valueId='id'
                  label='Select Nationality'
                  required={true}
                  selectedOption={userDetail.nationality}
                  handleChange={this.handleChange}
                  error={errors.nationality}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  name='city'
                  label='City'
                  required={true}
                  value={userDetail.city}
                  onChange={this.handleChange}
                  error={errors.city}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectOptions
                  options={countries}
                  name='country'
                  itemName='name'
                  valueId='id'
                  label='Select Country'
                  required={true}
                  selectedOption={userDetail.country}
                  handleChange={this.handleChange}
                  error={errors.country}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}>
                  Save
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type='button'
                  fullWidth
                  variant='contained'
                  style={{ backgroundColor: '#b30000', color: 'white' }}
                  onClick={onCancelEdit}
                  className={classes.submit}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const setSupervisorName = detail => {
  return { ...detail, fullname: detail ? getFullname(detail) : '' };
};

function mapStateToProps(state) {
  return {
    searchEmployees: state.employees.map(singleEmp => {
      return {
        ...singleEmp,
        fullname: singleEmp ? getFullname(singleEmp) : ''
      };
    }),
    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  saveEmployeeDetail,
  getSearchEmployees
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(UserDetailForm));
