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
import { saveEmployeeContact } from '../redux/actions/employeeContactActions';

const useStyles = theme => materialStyles2(theme);

class EmployeeContactForm extends Form {
  state = {
    data: {
      extension: '',
      phone_residence: '',
      phone_office: '',
      phone_mobile: '',
      email_personal: '',
      emergency_contact_person: '',
      emergency_contact_phone: ''
    },
    errors: {}
  };

  componentDidMount() {
    const { editItemDetail } = this.props;
    if (Object.keys(editItemDetail).length > 0) this.popupateContact(editItemDetail);
  }

  // componentDidUpdate(prevProps) {
  //   const { editItemDetail } = this.props;
  //   if (!_.isEqual(prevProps.editItemDetail, editItemDetail))
  //     this.popupateContact(editItemDetail);
  // }

  popupateContact = employeeContact => {
    if (employeeContact)
      this.setState({
        data: this.mapToViewModel(employeeContact),
        notFound: false
      });
  };

  schemaValidate = {
    id: Joi,
    user_id: Joi,
    extension: Joi.string()
      .required()
      .max(4)
      .label('Extension'),
    phone_residence: Joi.string()
      .max(32)
      .required()
      .label('Residence Number'),
    phone_office: Joi.string()
      .max(32)
      .required()
      .label('Office phone'),
    phone_mobile: Joi.string()
      .max(32)
      .required()
      .label('Mobile Number'),
    email_personal: Joi.string()
      .email()
      .required()
      .label('Personal Email'),
    emergency_contact_person: Joi.string()
      .required()
      .label('Emergency contact person'),
    emergency_contact_phone: Joi.string()
      .max(32)
      .required()
      .label('Emergency contact number')
  };

  mapToViewModel = employeeContact => {
    return {
      id: employeeContact.id || '',
      user_id: employeeContact.user_id || '',
      extension: employeeContact.extension || '',
      phone_residence: employeeContact.phone_residence || '',
      phone_office: employeeContact.phone_office || '',
      phone_mobile: employeeContact.phone_mobile || '',
      email_personal: employeeContact.email_personal || '',
      emergency_contact_person: employeeContact.emergency_contact_person || '',
      emergency_contact_phone: employeeContact.emergency_contact_phone || ''
    };
  };

  doSubmit = async () => {
    const { saveEmployeeContact, onCancelEdit } = this.props;
    const employeeContact = { ...this.state.data };
    try {
      await saveEmployeeContact(employeeContact, this.props.userId);
      onCancelEdit();
      // userId ? history.replace(`/user-profile/${userId}`) : history.replace('/user-profile');
    } catch (error) {
      if (error.response) {
        const errors = {};
        const { response } = error.response.data;
        Object.keys(response).forEach(obj => {
          errors[obj] = response[obj][0];
        });
        this.setState({ errors });
      }
    }
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
                Add Contact
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <InputField
                      name='extension'
                      label='Extension'
                      required={true}
                      type='text'
                      error={errors.extension}
                      value={data.extension}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      name='phone_residence'
                      label='Residence'
                      required={true}
                      type='text'
                      error={errors.phone_residence}
                      value={data.phone_residence}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      name='phone_office'
                      label='Office Phone'
                      required={true}
                      type='text'
                      error={errors.phone_office}
                      value={data.phone_office}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      name='phone_mobile'
                      label='Mobile Number'
                      required={true}
                      type='text'
                      error={errors.phone_mobile}
                      value={data.phone_mobile}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <InputField
                      name='email_personal'
                      label='Personal Email'
                      required={true}
                      type='text'
                      error={errors.email_personal}
                      value={data.email_personal}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name='emergency_contact_person'
                      label='Emergency Contact Person'
                      required={true}
                      type='text'
                      error={errors.emergency_contact_person}
                      value={data.emergency_contact_person}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name='emergency_contact_phone'
                      label='Emergency Contact Number'
                      required={true}
                      type='text'
                      error={errors.emergency_contact_phone}
                      value={data.emergency_contact_phone}
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
  saveEmployeeContact
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EmployeeContactForm));
