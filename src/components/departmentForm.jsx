import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from './common/form';
import Joi from 'joi-browser';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Container, CssBaseline, Typography, Grid } from '@material-ui/core';
import InputField from './common/inputField';
import { materialStyles } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import { saveDepartment } from '../redux/actions/departmentsActions';
import auth from '../services/authService';
import * as UrlConst from './constants/urlConstants';

const useStyles = theme => materialStyles(theme);

class DepartmentForm extends Form {
  state = {
    data: {
      name: '',
      detail: ''
    },
    errors: {},
    notFound: false
  };

  schemaValidate = {
    id: Joi,
    name: Joi.string()
      .required()
      .max(50)
      .label('Department name'),
    detail: Joi.string()
      .required()
      .max(256)
      .label('Detail')
  };

  componentDidMount() {
    const departmentId = this.props.match.params.id;

    if (departmentId === 'new') return;
    this.popupateDepartment();
  }

  componentDidUpdate(prevProps) {
    if (this.props.department !== prevProps.department) {
      this.popupateDepartment();
    }
  }

  compareString = (newString, prevString) => {
    return JSON.stringify(newString) === JSON.stringify(prevString);
  };

  popupateDepartment = () => {
    const { department } = this.props;
    if (department) this.setState({ data: this.mapToViewModel(department) });
  };

  handleCancelEdit = () => {
    const { match, history, onCancelEdit } = this.props;
    const departmentId = match.params.id;
    if (departmentId === 'new') {
      history.push('/department-lists');
    } else {
      onCancelEdit();
    }
  };

  doSubmit = async () => {
    const { saveDepartment, history, match, onCancelEdit } = this.props;
    const departmentId = match.params.id;
    try {
      await saveDepartment(this.state.data);
      departmentId !== 'new'
        ? onCancelEdit()
        : history.push('/department-lists');
    } catch (error) {}
  };

  mapToViewModel = department => {
    return {
      id: department.id,
      name: department.name,
      detail: department.detail
    };
  };

  render() {
    if (auth.getCurrentUser().role !== 'admin')
      return <Redirect to={UrlConst.EMPLOYEE_DETAIL_URL} />;
    const { classes, loading } = this.props;
    const { data, errors, notFound } = this.state;
    return (
      <React.Fragment>
        {!loading && (
          <Container component='main' maxWidth='sm'>
            <CssBaseline />
            {notFound && (
              <div className='alert alert-warning'>
                <h4>Not found!</h4>
              </div>
            )}
            <div className={classes.paper}>
              <Typography component='h1' variant='h5'>
                Department Form
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <InputField
                      name='name'
                      label='Department Name'
                      required={true}
                      type='text'
                      error={errors.name}
                      value={data.name}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name='detail'
                      label='Department Detail'
                      required={true}
                      type='text'
                      multiline={true}
                      margin='normal'
                      error={errors.detail}
                      value={data.detail}
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
                      onClick={this.handleCancelEdit}
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

DepartmentForm.propTypes = {
  saveDepartment: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    loading: state.apiCallInProgress > 0
  };
};
const mapDispatchToProps = {
  saveDepartment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DepartmentForm));
