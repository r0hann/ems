import React from 'react';
// import { Link } from 'react-router-dom';
import auth from '../services/authService';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import InputField from './common/inputField';
import Joi from 'joi-browser';
import Form from './common/form';
import { materialStyles } from './common/materialStyle';

const useStyles = theme => materialStyles(theme);

class SignInForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
    values: { showPassword: false },
    submit: false
  };

  schemaValidate = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  componentDidMount() {
    this.checkLogin();
  }

  constructor() {
    super();
    if (auth.getCurrentUser()) {
      window.location = '/';
      return;
    }
  }

  checkLogin = () => {
    if (auth.getCurrentUser()) {
      window.location = '/';
      return;
    }
  };

  doSubmit = async () => {
    //Call Server
    const { data } = this.state;
    try {
      this.setState({ submit: true });
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      this.setState({ submit: false });
      window.location = state ? state.from.pathname : '/';
    } catch (error) {
      this.setState({ submit: false });
      if (error.response && error.response.status === 401) {
        const errors = { ...this.state.errors };
        // errors.username = error.response.data;
        // errors.password = error.response.data;
        errors.username = 'Invalid username';
        errors.password = 'Invalid Password';
        this.setState({ errors });
      }
    }
  };

  handleClickShowPassword = event => {
    event.preventDefault();
  };

  handleMouseDownPassword = () => {
    let { values } = this.state;
    values = { ...values, showPassword: !values.showPassword };
    this.setState({ values });
  };

  render() {
    const { classes } = this.props;
    const { data, errors, values, submit } = this.state;
    // (auth.getCurrentUser())
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <InputField
              name='username'
              type='text'
              label='Username'
              required={true}
              error={errors.username}
              value={data.username}
              onChange={this.handleChange}
              autoFocus={true}
              margin='normal'
            />

            <TextField
              id='outlined-adornment-password'
              variant='outlined'
              fullWidth
              style={{ marginTop: '10px' }}
              name='password'
              type={values.showPassword ? 'text' : 'password'}
              label='Password'
              value={data.password}
              onChange={this.handleChange}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      aria-label='toggle password visibility'
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}>
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={submit}
              className={classes.submit}>
              {submit ? 'Loading....' : 'Sign In'}
            </Button>
            <Grid container>
              {/*<Grid item xs>*/}
              {/*  <Link to='/' variant='body2'>*/}
              {/*    Forgot password?*/}
              {/*  </Link>*/}
              {/*</Grid>*/}
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(SignInForm);
