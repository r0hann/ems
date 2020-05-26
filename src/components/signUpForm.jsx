import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Joi from 'joi-browser';
import InputField from './common/inputField';
import Form from './common/form';
import { withStyles } from '@material-ui/core/styles';
import { materialStyles } from './common/materialStyle';

const useStyles = theme => materialStyles(theme);

class SignUpForm extends Form {
  state = {
    data: {
      salutation: 'Mr',
      fname: '',
      lname: '',
      email: '',
      password: ''
    },
    errors: {}
  };

  schemaValidate = {
    salutation: Joi.string()
      .required()
      .label('Salutation'),
    fname: Joi.string()
      .required()
      .label('First Name'),
    lname: Joi.string()
      .required()
      .label('Last Name'),
    email: Joi.string()
      .email()
      .required()
      .label('Email'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  render() {
    const { classes } = this.props;
    const { data, errors } = this.state;
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <InputField
                  name='salutation'
                  label='Salutation'
                  required={true}
                  error={errors.salutation}
                  value={data.salutation}
                  onChange={this.handleChange}
                  autoFocus={true}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <InputField
                  name='fname'
                  label='First Name'
                  required={true}
                  error={errors.fname}
                  value={data.fname}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <InputField
                  name='lname'
                  label='Last Name'
                  required={true}
                  error={errors.lname}
                  value={data.lname}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  name='email'
                  label='Email Address'
                  required={true}
                  type='email'
                  error={errors.email}
                  value={data.email}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  name='password'
                  label='Password'
                  required={true}
                  type='password'
                  error={errors.password}
                  value={data.password}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(SignUpForm);
