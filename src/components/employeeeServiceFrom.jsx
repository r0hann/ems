import React from 'react';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
// import _ from 'lodash';
import Button from '@material-ui/core/Button';
import { Container, Typography, Grid, CssBaseline } from '@material-ui/core';
import InputField from './common/inputField';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import { saveEmployeeServices } from '../redux/actions/employeeServiceActions';
import SelectOptions from './common/selectOptions';

const useStyles = theme => materialStyles2(theme);

class EmployeeServiceForm extends Form {
  state = {
    data: {
      event_type: '',
      event_date: '',
      method: '',
      designation: '',
      status: '',
      department: '',
      branch: '',
      remarks: ''
    },
    errors: {}
  };

  componentDidMount() {
    const { editItemDetail } = this.props;
    if (Object.keys(editItemDetail).length > 0) this.popupateServices();
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(prevProps.editItemDetail, this.props.editItemDetail)) {
  //     this.popupateServices();
  //   }
  // }

  popupateServices = () => {
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
    event_type: Joi.string()
      .required()
      .label('Event Type'),
    event_date: Joi.string()
      .required()
      .label('Event Date'),
    method: Joi.string().required(),
    designation: Joi.number()
      .required()
      .label('Designation'),
    status: Joi.string().required(),
    department: Joi.number()
      .required()
      .label('Department'),
    branch: Joi.string().required(),
    remarks: Joi.string().required()
  };

  mapToViewModel = employeeServices => {
    return {
      id: employeeServices.id || '',
      user_id: employeeServices.user_id || '',
      event_type: employeeServices.event_type || '',
      event_date: employeeServices.event_date || '',
      method: employeeServices.method || '',
      designation: employeeServices.designation || '',
      status: employeeServices.status || '',
      department: employeeServices.department || '',
      branch: employeeServices.branch || '',
      remarks: employeeServices.remarks || ''
    };
  };

  doSubmit = async () => {
    const { saveEmployeeServices, onCancelEdit, history } = this.props;
    const employeeServices = { ...this.state.data };
    const userId = this.props.match.params.id;

    try {
      await saveEmployeeServices(employeeServices, this.props.userId);
      onCancelEdit();
      // userId ? history.replace(`/user-profile/${userId}`) : history.replace('/user-profile');
    } catch (error) {}
  };

  render() {
    const { classes, loading, onCancelEdit, designations, departments } = this.props;
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        {!loading && (
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component='h1' variant='h5'>
                Add Service
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <InputField
                      name='event_type'
                      label='Service Type'
                      required={true}
                      type='text'
                      error={errors.event_type}
                      value={data.event_type}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      name='event_date'
                      label='Date'
                      required={true}
                      type='text'
                      error={errors.event_date}
                      value={data.event_date}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <InputField
                      name='method'
                      label='Method'
                      required={true}
                      type='text'
                      error={errors.method}
                      value={data.method}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <SelectOptions
                      options={designations}
                      name='designation'
                      itemName='name'
                      label='Designation'
                      required={true}
                      selectedOption={data.designation}
                      handleChange={this.handleChange}
                      error={errors.designation}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <InputField
                      name='status'
                      label='Status'
                      required={true}
                      type='text'
                      error={errors.status}
                      value={data.status}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <SelectOptions
                      options={departments}
                      name='department'
                      itemName='name'
                      label='Department'
                      required={true}
                      selectedOption={data.department}
                      handleChange={this.handleChange}
                      error={errors.department}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      name='branch'
                      label='Branch'
                      required={true}
                      type='text'
                      error={errors.branch}
                      value={data.branch}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name='remarks'
                      label='Remarks'
                      required={true}
                      type='text'
                      error={errors.remarks}
                      value={data.remarks}
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
  saveEmployeeServices
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EmployeeServiceForm));
