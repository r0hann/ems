import React from 'react';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import {
  Container,
  Typography,
  Grid,
  CssBaseline,
  Button,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import InputField from './common/inputField';
import SelectOptions from './common/selectOptions';
import { loadUserLeaveTypes } from './../redux/actions/leaveTypeActions';
import { saveLeaveApplication } from './../redux/actions/leaveAppActions';
import { loadUserLeaveBalances } from './../redux/actions/leaveBalanceActions';
import MaterialUIPickers from './common/datePicker';
import auth from './../services/authService';
import * as UrlConst from '../components/constants/urlConstants';
import moment from 'moment';

const useStyles = theme => materialStyles2(theme);

class LeaveRequestForm extends Form {
  state = {
    data: {
      detail: '',
      leave_type_id: '',
      days: 0,
      half_day_flag: 0,
      leave_from: null,
      leave_to: null,
      half_day: 0
    },
    applyBefore: null,
    halfDay: true,
    balanceRemain: 0,
    errors: {}
  };

  schemaValidate = {
    detail: Joi.string().required(),
    leave_type_id: Joi.number().required(),
    days: Joi.number(),
    half_day_flag: Joi.number(),
    leave_from: Joi.date()
      .required()
      .label('Leave Start'),
    leave_to: Joi.date()
      .required()
      .label('leave To'),
    half_day: Joi.number()
  };

  componentDidMount() {
    const { loadUserLeaveTypes, loadUserLeaveBalances } = this.props;
    const userId = auth.getUserId();
    loadUserLeaveTypes(userId);
    loadUserLeaveBalances(userId);
  }

  leaveFor = [
    { id: 1, label: 'First Half' },
    { id: 2, label: 'Second Half' }
  ];

  calculateDays = data => {
    const startDate = moment(data.leave_from);
    const endDate = moment(data.leave_to);
    const days = endDate.diff(startDate, 'days') + 1;
    const leaveData = { ...data, days };
    this.setState({
      data: leaveData
    });
  };

  handleDate = (name, date) => {
    let data = {
      ...this.state.data,
      [name]: date.toISOString().slice(0, 10)
    };
    if (data.half_day_flag === 1) data = { ...data, leave_to: data.leave_from };
    const errors = { ...this.state.errors, [name]: null };
    this.setState({ data, errors });
    if (data.leave_from && data.leave_to) this.calculateDays(data);

    // const errorMessage = this.validateProperty({ name, newDate });
  };

  handleLeaveTypeChange = ({ target: input }) => {
    const errors = {};
    const { half_day, apply_before } = this.props.usrLeaveTypes.find(
      leaveType => leaveType.leave_type_id === input.value
    );
    const halfDay = half_day === 1 ? true : false;
    let { half_day_flag } = this.state.data;
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    if (half_day === 0) half_day_flag = 0;
    const data = { ...this.state.data, [input.name]: input.value, half_day_flag };
    this.checkLeaveBalance(input.value);
    this.setState({ data, errors, halfDay, applyBefore: apply_before });
  };

  checkLeaveBalance = leaveTypeId => {
    const { leaveBalances } = this.props;
    const balance =
      leaveBalances.length > 0
        ? leaveBalances.find(single => single.leave_type_id === leaveTypeId)
        : null;

    this.setState({
      balanceRemain: balance ? balance.balance : 0
    });
  };

  handleCheckBox = ({ target }) => {
    let data = target.checked
      ? { ...this.state.data, half_day_flag: 1, half_day: 1, days: 1 }
      : { ...this.state.data, half_day_flag: 0, half_day: 0 };
    if (data.half_day_flag === 1) data = { ...data, leave_to: data.leave_from };
    this.setState({ data });
  };

  doSubmit = async () => {
    const leaveApplication = { ...this.state.data };
    if (leaveApplication.half_day_flag === 0) delete leaveApplication.half_day;
    delete leaveApplication.half_day_flag;
    if (leaveApplication.days > this.state.balanceRemain) return;

    try {
      await this.props.saveLeaveApplication(leaveApplication);
      this.props.history.push(UrlConst.USER_LEAVE_APP_DETAIL_URL);
    } catch (error) {
      let objKeys = null;
      const { message } = error.response.data;
      let errors = {};
      if (Object.keys(message) && Object.keys(message).length > 0)
        objKeys = Object.keys(message);
      if (objKeys.length > 0) {
        objKeys.map(key => (errors[key] = message[key][0]));
        this.setState({ errors });
      }
    }
  };

  handleCancel = () => {
    this.props.history.push(UrlConst.USER_LEAVE_APP_DETAIL_URL);
  };

  render() {
    const { classes, usrLeaveTypes } = this.props;
    const { data, errors, balanceRemain, halfDay, applyBefore } = this.state;

    return (
      <React.Fragment>
        <div className='row justify-content-center'>
          <Container component='main' maxWidth='sm'>
            <CssBaseline />
            <div className='card m-4' style={{ padding: '0px' }}>
              <div className='card-header'>
                {balanceRemain !== 0 && (
                  <div>
                    <div className='alert alert-warning' role='alert'>
                      Warning:{`You have ${balanceRemain} balance`}
                    </div>
                  </div>
                )}
                {applyBefore && (
                  <div>
                    <div className='alert alert-warning paddingTop-2' role='alert'>
                      {`Leave must be applied at least ${applyBefore} days ahead!!!`}
                    </div>
                  </div>
                )}
                {data.days > balanceRemain && (
                  <div>
                    <div className='alert alert-danger' role='alert'>
                      Warning:{`You're balance exceed your remaining balance`}
                    </div>
                  </div>
                )}
                {/* <h6 className='pull-right'>Height</h6> */}
                <Typography component='h1' variant='h5'>
                  Leave Request Form
                </Typography>
              </div>
              <div className='card-body row'>
                <div className='col'>
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid item xs={8}>
                        <SelectOptions
                          options={usrLeaveTypes}
                          name='leave_type_id'
                          itemName='title'
                          label='Leave Type'
                          required={true}
                          valueId='leave_type_id'
                          selectedOption={data.leave_type_id}
                          handleChange={this.handleLeaveTypeChange}
                          error={errors.leave_type_id}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputField
                          name='detail'
                          label='Leave Detail'
                          required={true}
                          type='text'
                          multiLine={true}
                          error={errors.detail}
                          value={data.detail}
                          onChange={this.handleChange}
                        />
                      </Grid>
                      {halfDay && (
                        <Grid item xs={data.half_day_flag === 1 ? 5 : 7}>
                          <FormControlLabel
                            name='half_day_flag'
                            control={
                              <Checkbox
                                checked={data.half_day_flag === 1}
                                color='primary'
                                value={data.half_day_flag === 1}
                              />
                            }
                            onChange={this.handleCheckBox}
                            label='Half Day'
                            labelPlacement='end'
                          />
                        </Grid>
                      )}

                      {data.half_day_flag === 1 && halfDay && (
                        <Grid item xs={6}>
                          <SelectOptions
                            options={this.leaveFor}
                            name='half_day'
                            itemName='label'
                            label='Leave for'
                            required={true}
                            selectedOption={data.half_day}
                            handleChange={this.handleChange}
                            error={errors.half_day}
                          />
                        </Grid>
                      )}
                      {data.half_day_flag === 0 && (
                        <Grid item xs={7}>
                          <InputField
                            name='days'
                            label='Days'
                            required={true}
                            type='text'
                            disabled={true}
                            error={errors.days}
                            value={data.days}
                            onChange={this.handleChange}
                          />
                        </Grid>
                      )}

                      <Grid item xs={data.half_day_flag === 1 ? 7 : 6}>
                        <MaterialUIPickers
                          name='leave_from'
                          label='Leave From'
                          required={true}
                          disablePast={true}
                          error={errors.leave_from}
                          value={data.leave_from}
                          onError={this.handleDatePickerError}
                          onChange={this.handleDate}
                        />
                      </Grid>
                      {data.half_day_flag === 0 && (
                        <Grid item xs={6}>
                          <MaterialUIPickers
                            name='leave_to'
                            label='Leave To'
                            disablePast={true}
                            required={true}
                            error={errors.leave_to}
                            value={data.leave_to}
                            onError={this.handleDatePickerError}
                            onChange={this.handleDate}
                          />
                        </Grid>
                      )}
                      <Grid item xs={12} sm={6}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='primary'
                          disabled={balanceRemain === 0 || data.days > balanceRemain}
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
                          onClick={this.handleCancel}
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
        </div>
      </React.Fragment>
    );
  }
}

//  splitLeaveTypeWithBalance(leaveTypes, leaveBalances){
//     let leaveTypesWithBalance=[]
//     if(leaveBalances.length>0){
//         leaveBalances.forEach(balance){
//             leaveTypesWithBalance=leaveTypes.map(leaveType=>leaveType.)
//         }
//     }
// }

const mapStateToProps = state => {
  return {
    usrLeaveTypes: state.usrLeaveTypes,
    leaveBalances: state.leaveBalances,
    loading: state.apiCallInProgress > 0
  };
};
const mapDispatchToProps = {
  loadUserLeaveTypes,
  loadUserLeaveBalances,
  saveLeaveApplication
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(LeaveRequestForm));
