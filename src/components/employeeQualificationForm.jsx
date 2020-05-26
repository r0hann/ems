import React from 'react';
import Joi from 'joi-browser';
// import _ from 'lodash';

import { Container, Typography, CssBaseline } from '@material-ui/core';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import { connect } from 'react-redux';
import { saveEmployeeQualification } from '../redux/actions/employeeQualificationActions';
import * as Constants from './constants/commonConstants';
import DynamicForm from './common/dynamicForm';

const useStyles = theme => materialStyles2(theme);

class EmployeeQualificationForm extends Form {
  state = {
    data: {
      type: '',
      title: '',
      description: '',
      level: '',
      institution: '',
      country: '',
      address: '',
      join_date: '',
      completion_date: '',
      completion_year: '',
      duration: '',
      grade: '',
      funding: ''
    },
    errors: {}
  };

  async componentDidMount() {
    const { editItemDetail } = this.props;
    if (Object.keys(editItemDetail).length > 0) this.popupateQualification();
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(this.props.editItemDetail, prevProps.editItemDetail))
  //     this.popupateQualification();
  // }

  popupateQualification = () => {
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
      .label('Qualification type'),
    title: Joi.string()
      .required()
      .label('Title'),
    description: Joi.string()
      .required()
      .label('Description'),
    level: Joi.string()
      .required()
      .label('Level'),
    institution: Joi.string()
      .required()
      .label('Institution'),
    country: Joi.number()
      .required()
      .label('Country'),
    address: Joi.string()
      .required()
      .label('Address'),
    join_date: Joi.string()
      .required()
      .label('Join date'),
    completion_date: Joi.string()
      .required()
      .label('Completion date'),
    completion_year: Joi.string()
      .required()
      .label('Completion Year'),
    duration: Joi.string()
      .required()
      .label('Duration'),
    grade: Joi.string()
      .required()
      .label('Grade'),
    funding: Joi.string()
      .required()
      .label('Funding')
  };

  mapToViewModel = employeeQualification => {
    return {
      id: employeeQualification.id || '',
      user_id: employeeQualification.user_id || '',
      type: employeeQualification.type || '',
      title: employeeQualification.title || '',
      description: employeeQualification.description || '',
      level: employeeQualification.level || '',
      institution: employeeQualification.institution || '',
      country: employeeQualification.country || '',
      address: employeeQualification.address || '',
      join_date: employeeQualification.join_date || '',
      completion_date: employeeQualification.completion_date || '',
      completion_year: employeeQualification.completion_year || '',
      duration: employeeQualification.duration || '',
      grade: employeeQualification.grade || '',
      funding: employeeQualification.funding || ''
    };
  };

  qualificationFormDetail = [
    {
      field: Constants.INPUTFIELD,
      size: 4,
      name: 'type',
      label: 'Type',
      valueId: 'type',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 8,
      name: 'title',
      label: 'Title',
      valueId: 'title',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 7,
      name: 'institution',
      label: 'Institution',
      valueId: 'institution',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 5,
      name: 'level',
      label: 'Level',
      valueId: 'level',
      required: true,
      onChange: this.handleChange
    },

    {
      field: Constants.INPUTFIELD,
      size: 5,
      name: 'address',
      label: 'Address',
      valueId: 'address',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.DYNAMIC_SELECTOPTION,
      size: 6,
      itemName: 'name',
      propsName: 'countries',
      required: true,
      name: 'country',
      label: 'Select Country',
      onChange: this.handleChange
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'join_date',
      valueId: 'join_date',
      label: 'Join Date',
      onError: this.handleDatePickerError,
      onChange: this.handleDateChange
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'completion_date',
      label: 'Completion Date',
      onError: this.handleDatePickerError,
      onChange: this.handleDateChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 12,
      name: 'description',
      label: 'Description',
      valueId: 'description',
      required: true,
      onChange: this.handleChange
    }
  ];

  doSubmit = async () => {
    const { saveEmployeeQualification, onCancelEdit, history } = this.props;
    const employeeQualification = { ...this.state.data };
    const userId = this.props.match.params.id;

    try {
      await saveEmployeeQualification(employeeQualification, this.props.userId);
      onCancelEdit();
      // userId ? history.replace(`/user-profile/${userId}`) : history.replace('/user-profile');
    } catch (error) {}
  };

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
                Add Qualification Detail
              </Typography>
              <DynamicForm
                {...rest}
                data={data}
                errors={errors}
                formDetail={this.qualificationFormDetail}
                handleSubmit={this.handleSubmit}
                onCancelEdit={this.onCancelEdit}
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
    loading: state.apiCallInProgress > 0,
    employees: state.employees
  };
};
const mapDispatchToProps = {
  saveEmployeeQualification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EmployeeQualificationForm));
