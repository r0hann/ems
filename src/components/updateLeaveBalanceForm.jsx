import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import _ from 'lodash';
import { Container, Typography, CssBaseline } from '@material-ui/core';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import { updateLeaveBalance } from '../redux/actions/leaveBalanceActions';
import auth from '../services/authService';

import * as Constants from './constants/commonConstants';
import * as UrlConst from './constants/urlConstants';

import DynamicForm from './common/dynamicForm';

const useStyles = theme => materialStyles2(theme);

class UpateLeaveBalanceForm extends Form {
  state = {
    data: {},
    errors: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {
        fullname: '',
        leave_type: '',
        balance: '',
        valid_from: null,
        valid_to: null,
        active: 0
      },
      errors: {}
    };
  }

  componentDidMount() {
    this.setState({ data: this.mapToViewModel(this.props.leaveBalance) });
  }

  schemaValidate = {
    id: Joi.any(),
    leave_type_id: Joi.any(),
    user_id: Joi.any(),
    fullname: Joi.string()
      .required()
      .label('User'),
    leave_type: Joi.string()
      .required()
      .label('Leave Type'),
    balance: Joi.number()
      .required()
      .label('Balance'),
    valid_from: Joi.date()
      .required()
      .label('Valid From'),
    valid_to: Joi.date()
      .required()
      .label('Valid To'),
    active: Joi.number().required()
  };

  leaveBalaanceFormDetail = [
    // {
    //   field: Constants.INPUTFIELD,
    //   size: 7,
    //   name: 'fullname',
    //   label: 'Name',
    //   disabled: true,
    //   required: true,
    //   onChange: this.handleChange
    // },
    // {
    //   field: Constants.INPUTFIELD,
    //   size: 7,
    //   name: 'leave_type',
    //   label: 'Leave Type',
    //   disabled: true,
    //   required: true,
    //   onChange: this.handleChange
    // },
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'balance',
      label: 'Balance',
      required: true,
      onChange: this.handleChange
    },

    {
      field: Constants.CHECKBOX,
      size: 8,
      name: 'active',
      label: 'Active',
      onChange: this.handleCheckBoxChange
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'valid_from',
      label: 'Valid From',
      onError: this.handleDatePickerError,
      onChange: this.handleDateChange
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'valid_to',
      label: 'Valid To',
      onError: this.handleDatePickerError,
      onChange: this.handleDateChange
    }
  ];

  mapToViewModel = leaveBalance => {
    return {
      id: leaveBalance.id,
      leave_type_id: leaveBalance.leave_type_id,
      user_id: [leaveBalance.user_id],
      fullname: leaveBalance.fullname,
      leave_type: leaveBalance.leave_type ? leaveBalance.leave_type.title : '',
      balance: leaveBalance.balance,
      valid_from: leaveBalance.valid_from,
      valid_to: leaveBalance.valid_to,
      active: leaveBalance.active
    };
  };

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.leaveBalance, this.props.leaveBalance))
      this.popupateLeaveBalance(this.props.leaveBalance);
  }

  popupateLeaveBalance = leaveBalance => {
    if (leaveBalance)
      this.setState({
        data: this.mapToViewModel(leaveBalance),
        notFound: false
      });
  };

  doSubmit = async () => {
    try {
      await this.props.updateLeaveBalance(this.state.data);
      this.props.onUpdateCancel(null);
    } catch (error) {
      if (error.response) {
        const errors = {};
        const { message } = error.response.data;
        Object.keys(message).forEach(obj => {
          errors[obj] = message[obj][0];
        });
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser().role !== 'admin')
      return <Redirect to={UrlConst.EMPLOYEE_DETAIL_URL} />;
    const { onUpdateCancel } = this.props;
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <Container component='main' maxWidth='sm'>
          <CssBaseline />
          <div className='card m-4' style={{ padding: '0px' }}>
            <div className='card-header'>
              <Typography component='h1' variant='h5'>
                Leave Balance Form
              </Typography>
            </div>
            <div className='card-body row'>
              <div className='col'>
                <DynamicForm
                  formDetail={this.leaveBalaanceFormDetail}
                  data={data}
                  errors={errors}
                  handleSubmit={this.handleSubmit}
                  onCancelEdit={() => onUpdateCancel(false)}
                />
              </div>
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = { updateLeaveBalance };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(UpateLeaveBalanceForm));
