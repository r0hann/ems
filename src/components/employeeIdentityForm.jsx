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
import { saveEmployeeIdentity } from '../redux/actions/employeeIdentityActions';

const useStyles = theme => materialStyles2(theme);

class EmployeeIdentityForm extends Form {
  state = {
    data: {
      type: '',
      title: '',
      serial: '',
      issued_on: '',
      issued_from: '',
      file_path: ''
    },
    errors: {}
  };

  componentDidMount() {
    const { editItemDetail } = this.props;
    if (Object.keys(editItemDetail).length > 0) this.popupateIdentity();
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(this.props.editItemDetail, prevProps.editItemDetail))
  //     this.popupateIdentity();
  // }

  popupateIdentity = () => {
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
    type: Joi.string()
      .required()
      .label('Identity type'),
    title: Joi.string().required(),
    serial: Joi.string()
      .required()
      .label('Serial number'),
    issued_on: Joi.string().label('Issued Date'),
    issued_from: Joi.string()
      .required()
      .label('Issued location'),
    file_path: Joi.string().label('file location')
  };

  mapToViewModel = employeeIdentity => {
    return {
      id: employeeIdentity.id || '',
      user_id: employeeIdentity.user_id || '',
      type: employeeIdentity.type || '',
      title: employeeIdentity.title || '',
      serial: employeeIdentity.serial || '',
      issued_on: employeeIdentity.issued_on || '',
      issued_from: employeeIdentity.issued_from || '',
      file_path: employeeIdentity.file_path || ''
    };
  };

  doSubmit = async () => {
    const { saveEmployeeIdentity, onCancelEdit, history } = this.props;
    const employeeIdentity = { ...this.state.data };
    const userId = this.props.match.params.id;
    try {
      await saveEmployeeIdentity(employeeIdentity, this.props.userId);
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
                Add Identity
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <InputField
                      name='type'
                      label='Identity Type'
                      required={true}
                      type='text'
                      error={errors.type}
                      value={data.type}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7}>
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
                  <Grid item xs={6}>
                    <InputField
                      name='serial'
                      label='Serial Number'
                      required={true}
                      type='text'
                      error={errors.serial}
                      value={data.serial}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      name='issued_on'
                      label='Issued Date'
                      required={true}
                      type='text'
                      error={errors.issued_on}
                      value={data.issued_on}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      name='issued_from'
                      label='Issued Location'
                      required={true}
                      type='text'
                      error={errors.issued_from}
                      value={data.issued_from}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      name='file_path'
                      label='Document file path'
                      required={true}
                      type='text'
                      error={errors.file_path}
                      value={data.file_path}
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
  saveEmployeeIdentity
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EmployeeIdentityForm));
