import React from 'react';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
// import _ from 'lodash';
import { Container, Typography, CssBaseline } from '@material-ui/core';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import { saveEmployeeInsurance } from '../redux/actions/employeeInsuranceActions';
import DynamicForm from './common/dynamicForm';
import * as Constants from './constants/commonConstants';

const useStyles = theme => materialStyles2(theme);

class EmployeeInsuranceForm extends Form {
  state = {
    data: {
      company_name: '',
      paid_by: '',
      policy_name: '',
      policy_amount: '',
      premium: '',
      effective_date: '',
      expiry_date: ''
    },
    errors: {}
  };

  insuranceFormDetail = [
    {
      field: Constants.INPUTFIELD,
      size: 5,
      name: 'company_name',
      label: 'Company name',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 7,
      name: 'paid_by',
      label: 'Paid By',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'policy_name',
      label: 'Policy name',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'policy_amount',
      label: 'Policy Amount',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 12,
      name: 'premium',
      label: 'Premium',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'effective_date',
      label: 'Effective Date',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'expiry_date',
      label: 'Expiry Date',
      required: true,
      onChange: this.handleChange
    }
  ];

  componentDidMount() {
    const { editItemDetail } = this.props;
    if (Object.keys(editItemDetail).length > 0) this.popupateInsurance();
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(this.props.editItemDetail, prevProps.editItemDetail))
  //     this.popupateInsurance();
  // }

  popupateInsurance = () => {
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
    company_name: Joi.string().required(),
    paid_by: Joi.string().required(),
    policy_name: Joi.string().required(),
    policy_amount: Joi.string().required(),
    premium: Joi.string().required(),
    effective_date: Joi.string().required(),
    expiry_date: Joi.string()
  };

  mapToViewModel = employeeInsurance => {
    return {
      id: employeeInsurance.id || '',
      user_id: employeeInsurance.user_id || '',
      company_name: employeeInsurance.company_name || '',
      paid_by: employeeInsurance.paid_by || '',
      policy_name: employeeInsurance.policy_name || '',
      policy_amount: employeeInsurance.policy_amount || '',
      premium: employeeInsurance.premium || '',
      effective_date: employeeInsurance.effective_date || '',
      expiry_date: employeeInsurance.expiry_date || ''
    };
  };

  doSubmit = async () => {
    const { saveEmployeeInsurance, onCancelEdit, history } = this.props;
    const employeeInsurance = { ...this.state.data };
    const userId = this.props.match.params.id;

    try {
      await saveEmployeeInsurance(employeeInsurance, this.props.userId);
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
                Add Insurance Detail
              </Typography>

              <DynamicForm
                formDetail={this.insuranceFormDetail}
                data={data}
                errors={errors}
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
  saveEmployeeInsurance
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EmployeeInsuranceForm));
