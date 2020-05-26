import React from 'react';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
// import _ from 'lodash';
import { Container, Typography, CssBaseline } from '@material-ui/core';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import { saveEmployeeAccount } from '../redux/actions/employeeAccountActions';
import * as Constants from './constants/commonConstants';
import DynamicForm from './common/dynamicForm';

const useStyles = theme => materialStyles2(theme);

class EmployeeAccountForm extends Form {
  state = {
    data: {
      pan: '',
      cit: '',
      pf: '',
      bank: '',
      other: '',
      pf_start_date: null,
      cit_start_date: null
    },
    errors: {}
  };
  componentDidMount() {
    const { editItemDetail } = this.props;
    if (Object.keys(editItemDetail).length > 0) this.popupateAccount(editItemDetail);
  }

  // componentDidUpdate(prevProps) {
  //   const { editItemDetail } = this.props;
  //   if (!_.isEqual(prevProps.editItemDetail, editItemDetail))
  //     this.popupateAccount(this.props.editItemDetail);
  // }

  popupateAccount = employeeAccount => {
    if (employeeAccount)
      this.setState({
        data: this.mapToViewModel(employeeAccount),
        notFound: false
      });
  };

  schemaValidate = {
    id: Joi,
    user_id: Joi,
    pan: Joi.string().required(),
    cit: Joi.string().required(),
    pf: Joi.number()
      .required()
      .label('Provident Fund'),
    bank: Joi.string().required(),
    other: Joi.string().allow(''),
    pf_start_date: Joi.string().required(),
    cit_start_date: Joi.string().required()
  };

  mapToViewModel = employeeAccount => {
    return {
      id: employeeAccount.id || '',
      user_id: employeeAccount.user_id || '',
      pan: employeeAccount.pan || '',
      cit: employeeAccount.cit || '',
      pf: employeeAccount.pf || '',
      bank: employeeAccount.bank || '',
      other: employeeAccount.other || '',
      pf_start_date: employeeAccount.pf_start_date || '',
      cit_start_date: employeeAccount.cit_start_date || ''
    };
  };

  doSubmit = async () => {
    const { saveEmployeeAccount, onCancelEdit, history } = this.props;
    const employeeAccount = { ...this.state.data };
    const userId = this.props.match.params.id;
    try {
      await saveEmployeeAccount(employeeAccount, this.props.userId);
      onCancelEdit();
      // userId ? history.replace(`/user-profile/${userId}`) : history.replace('/user-profile');
    } catch (error) {}
  };

  accountForm = [
    {
      field: Constants.INPUTFIELD,
      size: 8,
      name: 'pan',
      label: 'Pan Number',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'cit',
      label: 'Cit',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'pf',
      label: 'Provident Fund',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'cit_start_date',
      label: 'Cit start date',
      onError: this.handleDatePickerError,
      onChange: this.handleDateChange
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'pf_start_date',
      label: 'pf start date',
      onError: this.handleDatePickerError,
      onChange: this.handleDateChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'bank',
      label: 'Bank',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'other',
      label: 'Other',
      required: true,
      onChange: this.handleChange
    }
  ];

  render() {
    const { classes, loading, onCancelEdit, ...rest } = this.props;
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        {!loading && (
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component='h1' variant='h5'>
                Add Account Detail
              </Typography>
              <DynamicForm
                {...rest}
                data={data}
                errors={errors}
                formDetail={this.accountForm}
                handleSubmit={this.handleSubmit}
                onCancelEdit={onCancelEdit}
              />
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
  saveEmployeeAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EmployeeAccountForm));
