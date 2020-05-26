import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from './common/form';
import Joi from 'joi-browser';
import Button from '@material-ui/core/Button';
import { Container, CssBaseline, Typography, Grid } from '@material-ui/core';
import InputField from './common/inputField';
import { materialStyles } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { saveDesignation } from '../redux/actions/designationsActions';
import auth from '../services/authService';
import * as UrlConst from './constants/urlConstants';

const useStyles = theme => materialStyles(theme);

class DesignationForm extends Form {
  state = {
    data: {
      name: '',
      detail: ''
    },
    errors: {},
    notFound: false
  };

  schemaValidate = {
    id: Joi,
    name: Joi.string()
      .required()
      .max(50)
      .label('Designation Name'),
    detail: Joi.string()
      .required()
      .max(256)
      .label('Designation Detail')
  };

  async componentDidMount() {
    const designationId = this.props.match.params.id;

    if (designationId === 'new') return;
    this.popupateDesignation();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedDesignation !== prevProps.selectedDesignation) {
      this.popupateDesignation();
    }
  }

  popupateDesignation() {
    const { selectedDesignation } = this.props;
    if (selectedDesignation)
      this.setState({ data: this.mapToViewModel(selectedDesignation) });
    //   if (designations.length > 0) {
    //     const designation = designations.find(d => (d.id === id ? d : {}));

    //     if (designation)
    //       this.setState({
    //         data: this.mapToViewModel(designation),
    //         notFound: false
    //       });
    //   }
  }

  doSubmit = async () => {
    const { saveDesignation, history, match, onCancelEdit } = this.props;
    const designationId = match.params.id;
    try {
      await saveDesignation(this.state.data);
      designationId !== 'new'
        ? onCancelEdit()
        : history.replace('/designation-lists');
    } catch (error) {}
  };

  handleCancelEdit = () => {
    const { match, history, onCancelEdit } = this.props;
    const designationId = match.params.id;
    if (designationId === 'new') {
      history.push('/designation-lists');
    } else {
      onCancelEdit();
    }
  };

  mapToViewModel(designation) {
    return {
      id: designation.id,
      name: designation.name,
      detail: designation.detail
    };
  }

  render() {
    if (auth.getCurrentUser().role !== 'admin')
      return <Redirect to={UrlConst.EMPLOYEE_DETAIL_URL} />;
    const { classes, loading } = this.props;

    const { data, errors } = this.state;
    return (
      <React.Fragment>
        {!loading && (
          <Container component='main' maxWidth='sm'>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component='h1' variant='h5'>
                Designation Form
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <InputField
                      name='name'
                      label='Designation Name'
                      required={true}
                      type='text'
                      error={errors.name}
                      value={data.name}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name='detail'
                      label='Designation Detail'
                      required={true}
                      type='text'
                      multiline={true}
                      margin='normal'
                      error={errors.detail}
                      value={data.detail}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      className={classes.submit}>
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type='button'
                      fullWidth
                      variant='contained'
                      style={{ backgroundColor: '#b30000', color: 'white' }}
                      onClick={this.handleCancelEdit}
                      className={classes.submit}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
                {/* <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}>
                  Save
                </Button> */}
              </form>
            </div>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

DesignationForm.propTypes = {
  saveDesignation: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.apiCallInProgress > 0
  };
};
const mapDispatchToProps = {
  saveDesignation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DesignationForm));
