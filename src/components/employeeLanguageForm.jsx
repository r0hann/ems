import React from 'react';
import Joi from 'joi-browser';
// import _ from 'lodash';
import { Container, Typography, CssBaseline } from '@material-ui/core';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import { connect } from 'react-redux';
import { saveEmployeeLanguage } from '../redux/actions/employeeLanguageActions';
import DynamicForm from './common/dynamicForm';
import * as Constants from './constants/commonConstants';

const useStyles = theme => materialStyles2(theme);

class EmployeeLanguageForm extends Form {
  state = {
    data: {
      language: '',
      speaking: '',
      reading: '',
      writing: '',
      native: 0
    },
    errors: {}
  };

  rating = [
    { id: 1, label: 'Bad' },
    { id: 2, label: 'Good' },
    { id: 3, label: 'Very Good' },
    { id: 4, label: 'Excellent' },
    { id: 5, label: 'Perfect' }
  ];

  async componentDidMount() {
    const { editItemDetail } = this.props;
    if (Object.keys(editItemDetail).length > 0) this.popupateLanguage();
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(this.props.employeeLanguage, prevProps.employeeLanguage))
  //     this.popupateLanguage();
  // }

  popupateLanguage = () => {
    const { editItemDetail } = this.props;

    if (editItemDetail)
      this.setState({
        data: this.mapToViewModel(editItemDetail),
        notFound: false
      });
  };

  handleCheckBox = ({ target }) => {
    const data = { ...this.state.data, native: target.checked ? 1 : 0 };
    this.setState({ data });
  };

  schemaValidate = {
    id: Joi,
    user_id: Joi,
    language: Joi.string().required(),
    speaking: Joi.number().required(),
    reading: Joi.number().required(),
    writing: Joi.number().required(),
    native: Joi.number().required()
  };

  mapToViewModel = employeeLanguage => {
    return {
      id: employeeLanguage.id || '',
      user_id: employeeLanguage.user_id || '',
      language: employeeLanguage.language || '',
      speaking: employeeLanguage.speaking || '',
      reading: employeeLanguage.reading || '',
      writing: employeeLanguage.writing || '',
      native: employeeLanguage.native || 0
    };
  };

  languageFormDetail = [
    {
      field: Constants.INPUTFIELD,
      size: 6,
      name: 'language',
      label: 'Language',
      required: true,
      onChange: this.handleChange
    },
    {
      field: Constants.SELECTOPTION,
      size: 5,
      itemName: 'label',
      required: true,
      name: 'speaking',
      label: 'Speaking',
      valueId: 'id',
      onChange: this.handleChange
    },
    {
      field: Constants.SELECTOPTION,
      size: 8,
      options: this.rating,
      itemName: 'label',
      required: true,
      valueId: 'id',
      name: 'reading',
      label: 'Reading',
      onChange: this.handleChange
    },
    {
      field: Constants.SELECTOPTION,
      size: 8,
      options: this.rating,
      itemName: 'label',
      valueId: 'id',
      required: true,
      name: 'writing',
      label: 'Writing',
      onChange: this.handleChange
    },
    {
      field: Constants.CHECKBOX,
      size: 8,
      name: 'native',
      label: 'Native',
      onChange: this.handleCheckBox
    }
  ];

  doSubmit = async () => {
    const { saveEmployeeLanguage, onCancelEdit, history } = this.props;
    const employeeLanguage = { ...this.state.data };
    const userId = this.props.match.params.id;

    try {
      await saveEmployeeLanguage(employeeLanguage, this.props.userId);
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
                Add Language Detail
              </Typography>

              <DynamicForm
                formDetail={this.languageFormDetail}
                data={data}
                selectOptionsField={this.rating}
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
  saveEmployeeLanguage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EmployeeLanguageForm));
