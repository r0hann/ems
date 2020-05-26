import React from 'react';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
// import _ from 'lodash';
import Button from '@material-ui/core/Button';
import {
  Container,
  Typography,
  Grid,
  CssBaseline,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import InputField from './common/inputField';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import { saveEmployeeFamily } from '../redux/actions/employeeFamilyActions';

const useStyles = theme => materialStyles2(theme);

class EmployeeFamilyForm extends Form {
  state = {
    data: {
      title: 'Mr',
      name: '',
      relation: '',
      dob: '',
      gender: '',
      blood_group: '',
      occupation: '',
      nationality: '',
      email: '',
      phone: '',
      address: '',
      remarks: '',
      nominee: '',
      nominee_effective_date: '',
      nominee_remarks: ''
    },
    errors: {}
  };

  componentDidMount() {
    const { editItemDetail } = this.props;
    if (Object.keys(editItemDetail).length > 0) this.popupateFamily();
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(prevProps.editItemDetail, this.props.editItemDetail)) this.popupateFamily();
  // }

  popupateFamily = () => {
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
    title: Joi.string(),
    name: Joi.string().required(),
    relation: Joi.string().required(),
    dob: Joi.string().required(),
    gender: Joi.string().required(),
    blood_group: Joi.string(),
    occupation: Joi.string(),
    nationality: Joi.string().required(),
    email: Joi.string()
      .email()
      .required()
      .label('Email'),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    remarks: Joi.string(),
    nominee: Joi.string(),
    nominee_effective_date: Joi.string(),
    nominee_remarks: Joi.string()
  };

  mapToViewModel = employeeFamily => {
    return {
      id: employeeFamily.id || '',
      user_id: employeeFamily.user_id || '',
      title: employeeFamily.title || '',
      name: employeeFamily.name || '',
      relation: employeeFamily.relation || '',
      dob: employeeFamily.dob || '',
      gender: employeeFamily.gender || '',
      blood_group: employeeFamily.blood_group || '',
      occupation: employeeFamily.occupation || '',
      nationality: employeeFamily.nationality || '',
      email: employeeFamily.email || '',
      phone: employeeFamily.phone || '',
      address: employeeFamily.address || '',
      remarks: employeeFamily.remarks || '',
      nominee: employeeFamily.nominee || '',
      nominee_effective_date: employeeFamily.nominee_effective_date || '',
      nominee_remarks: employeeFamily.nominee_remarks || ''
    };
  };

  handleCheckBox = ({ target }) => {
    const data = { ...this.state.data, active: target.checked ? 1 : 0 };
    this.setState({ data });
  };

  doSubmit = async () => {
    const { saveEmployeeFamily, onCancelEdit, history } = this.props;
    const employeeFamily = { ...this.state.data };
    const userId = this.props.match.params.id;

    try {
      await saveEmployeeFamily(employeeFamily, this.props.userId);
      onCancelEdit();
      // userId ? history.replace(`/user-profile/${userId}`) : history.replace('/user-profile');
    } catch (error) {}
  };

  render() {
    const { classes, loading, onCancelEdit } = this.props;
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        {!loading && (
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component='h1' variant='h5'>
                Add Family Detail
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <InputField
                      name='title'
                      label='Title'
                      required={true}
                      type='text'
                      error={errors.title}
                      value={data.title}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <InputField
                      name='name'
                      label='Name'
                      required={true}
                      type='text'
                      error={errors.name}
                      value={data.name}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <InputField
                      name='relation'
                      label='Relation'
                      required={true}
                      type='text'
                      error={errors.relation}
                      value={data.relation}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <InputField
                      name='dob'
                      label='Date of birth'
                      required={true}
                      type='text'
                      error={errors.dob}
                      value={data.dob}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <InputField
                      name='gender'
                      label='Gender'
                      required={true}
                      type='text'
                      error={errors.gender}
                      value={data.gender}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <InputField
                      name='blood_group'
                      label='Blood Group'
                      required={true}
                      type='text'
                      error={errors.blood_group}
                      value={data.blood_group}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <InputField
                      name='occupation'
                      label='Occupation'
                      required={true}
                      type='text'
                      error={errors.occupation}
                      value={data.occupation}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <InputField
                      name='nationality'
                      label='Nationality'
                      required={true}
                      type='text'
                      error={errors.nationality}
                      value={data.nationality}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name='email'
                      label='Email'
                      required={true}
                      type='text'
                      error={errors.email}
                      value={data.email}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      name='phone'
                      label='Phone'
                      required={true}
                      type='text'
                      error={errors.phone}
                      value={data.phone}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      name='address'
                      label='Address'
                      required={true}
                      type='text'
                      error={errors.address}
                      value={data.address}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name='remarks'
                      label='Remark'
                      required={true}
                      type='text'
                      error={errors.remarks}
                      value={data.remarks}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  {/* <Grid item xs={8}>
                    <InputField
                      name='nominee'
                      label='Nominee'
                      required={true}
                      type='text'
                      error={errors.nominee}
                      value={data.nominee}
                      onChange={this.handleChange}
                    />
                  </Grid> */}
                  <Grid item xs={5}>
                    <FormControlLabel
                      name='nominee'
                      control={
                        <Checkbox
                          checked={data.active === 1}
                          color='primary'
                          value={data.active === 1}
                        />
                      }
                      onChange={this.handleCheckBox}
                      label='Nominee'
                      labelPlacement='start'
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <InputField
                      name='nominee_effective_date'
                      label='Nominee effective date'
                      required={true}
                      type='text'
                      error={errors.nominee_effective_date}
                      value={data.nominee_effective_date}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name='nominee_remarks'
                      label='Nominee Remarks'
                      required={true}
                      type='text'
                      error={errors.nominee_remarks}
                      value={data.nominee_remarks}
                      onChange={this.handleChange}
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
  saveEmployeeFamily
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EmployeeFamilyForm));
