import React from 'react';
// import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputField from './common/inputField';

import { withStyles } from '@material-ui/core/styles';
import { materialStyles } from './common/materialStyle';
import { saveEmployeeDocument } from '../redux/actions/employeeDocumentActions';

import UploadFile from './common/uploadFile';
import Form from './common/form';

const useStyles = theme => materialStyles(theme);

class DocumentForm extends Form {
  state = {
    data: {
      user_id: '',
      doc_type: '',
      description: '',
      file: null
    },
    errors: {},
    selectedFile: null
  };

  schemaValidate = {
    id: Joi,
    user_id: Joi,
    doc_type: Joi.string(),
    description: Joi.string(),
    file: Joi.required()
  };

  onChooseFile = event => {
    const data = {
      ...this.state.data,
      file: event.target.files[0]
    };
    this.setState({ data });
  };

  doSubmit = async () => {
    // const { userId } = this.props;
    // const employeeDocument = { ...this.state.data, user_id: userId };
    // try {
    //   await saveEmployeeDocument(employeeDocument, userId);
    //   onCancelEdit();
    //   history.push('/user-profile');
    // } catch (error) {
    // }
  };

  render() {
    const { classes } = this.props;
    const { data, errors } = this.state;
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Add Document
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <InputField
                  name='doc_type'
                  label='Document Type'
                  required={true}
                  type='text'
                  error={errors.doc_type}
                  value={data.doc_type}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  name='description'
                  label='Document Description'
                  required={true}
                  type='text'
                  multiline={true}
                  margin='normal'
                  error={errors.detail}
                  value={data.detail}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <UploadFile
                  onChooseFile={this.onChooseFile}
                  selectedFile={data.file}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Submit
            </Button>
            <Grid container justify='flex-end'>
              <Grid item></Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.apiCallInProgress > 0
  };
};
const mapDispatchToProps = {
  saveEmployeeDocument
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DocumentForm));
