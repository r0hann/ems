import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import moment from 'moment';
import { Container, Typography, CssBaseline } from '@material-ui/core';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import Joi from 'joi-browser';
import {
  saveCalendar,
  loadCalendarById,
  loadAllCalendar
} from '../redux/actions/calendarActions';
import * as Constants from './constants/commonConstants';
import DynamicForm from './common/dynamicForm';
import { calculateDays } from './helper/commonHelper';

const useStyles = theme => materialStyles2(theme);

class HolidayCalendarForm extends Form {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: '',
        nepali_date: '',
        start_date: null,
        end_date: null,
        days: '',
        active: 0,
        remarks: ''
      },
      redirectToCalendarPage: false,
      errors: {}
    };
  }

  componentDidMount() {
    const { loadCalendarById } = this.props;
    const holidayId = this.props.match.params.id;

    // try {
    if (holidayId === 'new') return;
    loadCalendarById(holidayId);
    // this.popupateCalendar();
    // } catch (error) {}
  }

  componentDidUpdate(prevProps) {
    if (this.props.holidayCalendar && this.props.holidayCalendar !== prevProps.holidayCalendar)
      this.popupateCalendar();
  }

  // compareString = (firstString, secondString) => {
  //   return JSON.stringify(firstString) === JSON.stringify(secondString);
  // };

  popupateCalendar = () => {
    const { holidayCalendar } = this.props;

    if (holidayCalendar)
      this.setState({
        data: this.mapToViewModel(holidayCalendar),
        notFound: false
      });
  };

  schemaValidate = {
    id: Joi,
    title: Joi.string().required(),
    nepali_date: Joi.string()
      .required()
      .label('Nepali Date'),
    start_date: Joi.date()
      .required()
      .label('Start Date'),
    end_date: Joi.date()
      .required()
      .label('End Date'),
    days: Joi.number().required(),
    active: Joi.number(),
    remarks: Joi.string().required()
  };

  mapToViewModel = holidayCalendar => {
    return {
      id: holidayCalendar.id,
      title: holidayCalendar.title,
      nepali_date: holidayCalendar.nepali_date,
      start_date: holidayCalendar.start_date,
      end_date: holidayCalendar.end_date,
      days: holidayCalendar.days,
      active: holidayCalendar.active,
      remarks: holidayCalendar.remarks
    };
  };

  handleDateDays = (name, date) => {
    let days = 0;
    let data = {
      ...this.state.data,
      [name]: date.toISOString().slice(0, 10)
    };
    const errors = { ...this.state.errors, [name]: null };
    if (data.end_date && data.start_date) days = calculateDays(data.start_date, data.end_date);
    data.days = days;
    this.setState({ data, errors });
    // const errorMessage = this.validateProperty({ name, newDate });
  };

  handleCheckBox = ({ target }) => {
    const data = { ...this.state.data, active: target.checked ? 1 : 0 };
    this.setState({ data });
  };

  handleCancel = async () => {
    // await this.props.loadAllCalendar();
    this.props.history.replace('/calendar');
  };

  doSubmit = async () => {
    const { saveCalendar, history, userId } = this.props;
    const holidayCalendar = { ...this.state.data };
    try {
      await saveCalendar(holidayCalendar, userId);
      this.handleCancel();
      history.replace('/calendar');
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

  calendarFormDetail = [
    {
      field: Constants.INPUTFIELD,
      size: 8,
      name: 'title',
      label: 'Holiday Title',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 8,
      name: 'nepali_date',
      label: 'Nepali Date',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'days',
      disabled: true,
      label: 'Number of days',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.CHECKBOX,
      size: 6,
      name: 'active',
      label: 'Active',
      onChange: this.handleCheckBox
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'start_date',
      label: 'Start Date',
      onError: this.handleDatePickerError,
      onChange: this.handleDateDays
    },
    {
      field: Constants.DATEPICKER,
      size: 6,
      required: true,
      name: 'end_date',
      label: 'End Date',
      onError: this.handleDatePickerError,
      onChange: this.handleDateDays
    },
    {
      field: Constants.INPUTFIELD,
      size: 12,
      name: 'remarks',
      label: 'Remarks',
      required: true,
      onChange: this.handleChange
    }
  ];

  render() {
    const { classes, ...rest } = this.props;
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <div className='row justify-content-center'>
          <Container component='main' maxWidth='sm'>
            <CssBaseline />
            <div className='card m-4' style={{ padding: '0px' }}>
              <div className='card-header'>
                {/* <h6 className='pull-right'>Height</h6> */}
                <Typography component='h1' variant='h5'>
                  Create Holiday Form
                </Typography>
              </div>
              <div className='card-body row'>
                <div className='col'>
                  <DynamicForm
                    {...rest}
                    data={data}
                    errors={errors}
                    formDetail={this.calendarFormDetail}
                    handleSubmit={this.handleSubmit}
                    onCancelEdit={this.handleCancel}
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    holidayCalendar: state.calendar,
    loading: state.apiCallInProgress > 0
  };
};
const mapDispatchToProps = {
  saveCalendar,
  loadCalendarById,
  loadAllCalendar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(HolidayCalendarForm));
