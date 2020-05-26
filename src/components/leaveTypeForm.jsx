import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import _ from 'lodash';
import {
  Container,
  Typography,
  Grid,
  Button,
  CssBaseline,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import InputField from './common/inputField';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import auth from '../services/authService';
// import SelectOptions from './common/selectOptions';
import { saveLeaveType } from './../redux/actions/leaveTypeActions';
import * as UrlConst from './constants/urlConstants';

const useStyles = theme => materialStyles2(theme);

class LeaveTypeForm extends Form {
  state = {
    data: {
      title: '',
      days: '',
      apply_before: 0,
      active: 0,
      half_day: 0
    },
    errors: {}
  };

  schemaValidate = {
    id: Joi.any(),
    title: Joi.string()
      .regex(/^[ a-zA-Z0-9]+$/)
      .min(3)
      .max(32)
      .required()
      .label('Title'),
    days: Joi.number()
      .positive()
      .required()
      .label('Days'),
    apply_before: Joi.number()
      .positive()
      .allow(0)
      .label('Apply Before'),
    active: Joi.number().required(),
    half_day: Joi.number().required()
  };

  mapToViewModel = leaveType => {
    return {
      id: leaveType.id,
      title: leaveType.title,
      days: leaveType.days,
      apply_before: leaveType.apply_before || 0,
      active: leaveType.active,
      half_day: leaveType.half_day
    };
  };

  componentDidMount() {
    const { leaveType } = this.props;
    // const leaveId = this.props.match.params.id;
    if (Object.keys(leaveType).length === 0) return;
    this.popupateLeaveType(leaveType);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.leaveType, this.props.leaveType))
      this.popupateLeaveType(this.props.leaveType);
  }

  popupateLeaveType = leaveType => {
    if (leaveType)
      this.setState({
        data: this.mapToViewModel(leaveType),
        notFound: false
      });
  };

  doSubmit = async () => {
    const { saveLeaveType, onCancel, history, userId } = this.props;
    const createdLeaveType = { ...this.state.data };

    try {
      await saveLeaveType(createdLeaveType, userId);
      onCancel();
      history.replace(UrlConst.LEAVE_TYPE_DETAIL_URL);
    } catch (error) {}
  };

  render() {
    if (auth.getCurrentUser().role !== 'admin')
      return <Redirect to={UrlConst.EMPLOYEE_DETAIL_URL} />;
    const { classes, loading, onCancel } = this.props;
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        {!loading && (
          <Container component='main' maxWidth='sm'>
            <CssBaseline />
            <div className='card m-4' style={{ padding: '0px' }}>
              <div className='card-header'>
                {/* <h6 className='pull-right'>Height</h6> */}
                <Typography component='h1' variant='h5'>
                  Leave Type Form
                </Typography>
              </div>
              <div className='card-body row'>
                <div className='col'>
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <Grid container spacing={1}>
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
                      <Grid item xs={5}>
                        <InputField
                          name='days'
                          label='Days'
                          required={true}
                          type='text'
                          error={errors.days}
                          value={data.days}
                          onChange={this.handleChange}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <InputField
                          name='apply_before'
                          label='Apply Before'
                          required={true}
                          type='text'
                          error={errors.apply_before}
                          value={data.apply_before}
                          onChange={this.handleChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          name='active'
                          control={
                            <Checkbox
                              checked={data.active === 1}
                              color='primary'
                              value={data.active === 1}
                            />
                          }
                          onChange={this.handleCheckBoxChange}
                          label='Active'
                          labelPlacement='start'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          name='half_day'
                          control={
                            <Checkbox
                              checked={data.half_day === 1}
                              color='primary'
                              value={data.half_day === 1}
                            />
                          }
                          onChange={this.handleCheckBoxChange}
                          label='Half Day'
                          labelPlacement='start'
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
                          onClick={() => onCancel()}
                          className={classes.submit}>
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </div>
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
  saveLeaveType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(LeaveTypeForm));
