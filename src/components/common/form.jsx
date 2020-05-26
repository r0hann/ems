import Joi from 'joi-browser';
import { Component } from 'react';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schemaValidate, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schemaValidate[name] };
    const { error } = Joi.validate(obj, schema, { abortEarly: false });
    return error ? error.details[0].message : null;
  };

  handleCheckBoxChange = ({ target }) => {
    const data = { ...this.state.data, [target.name]: target.checked ? 1 : 0 };
    this.setState({ data });
  };

  handleDatePickerError = name => {
    const errors = { ...this.state.errors, [name]: 'Invalid Date' };
    this.setState({ errors });
  };

  handleChange = event => {
    const { target: input } = event;
    const errors = {};
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data, [input.name]: input.value };
    this.setState({ data, errors });
  };

  handleDateChange = (name, date) => {
    const data = {
      ...this.state.data,
      [name]: date.toISOString().slice(0, 10)
    };
    const errors = { ...this.state.errors, [name]: null };
    this.setState({ data, errors });

    // const errorMessage = this.validateProperty({ name, newDate });
  };

  handleSubmit = event => {
    event.preventDefault();
    const error = this.validate();
    const errors = { ...this.state.errors, ...error };
    // console.log('error', error);
    this.setState({ errors });
    if (error) return;
    this.doSubmit();
  };
}

export default Form;
