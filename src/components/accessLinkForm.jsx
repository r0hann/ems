import React, { Component } from 'react';
import { Button, Container, CssBaseline, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { materialStyles2 } from './common/materialStyle';

const useStyles = theme => materialStyles2(theme);

class AccessLinkForm extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            User Detail Form
          </Typography>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(AccessLinkForm);
