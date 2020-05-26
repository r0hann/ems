import React from 'react';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
// import _ from 'lodash';
import Button from '@material-ui/core/Button';
import { Container, Typography, Grid, CssBaseline } from '@material-ui/core';
import InputField from './common/inputField';
import { materialStyles2 } from './common/materialStyle';
import { withStyles } from '@material-ui/core/styles';
import Form from './common/form';
import { saveEmployeeSkill } from '../redux/actions/employeeSkillActions';

const useStyles = theme => materialStyles2(theme);

class EmployeeSkillForm extends Form {
  state = {
    data: {
      name: '',
      description: '',
      category: '',
      level: '',
      experience: ''
    },
    errors: {}
  };

  componentDidMount() {
    const { editItemDetail } = this.props;
    if (Object.keys(editItemDetail).length > 0) this.populateSkill();
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(this.props.editItemDetail, prevProps.editItemDetail)) this.populateSkill();
  // }

  populateSkill = () => {
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
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    level: Joi.string().required(),
    experience: Joi.number().required()
  };

  mapToViewModel = employeeSkill => {
    return {
      id: employeeSkill.id || '',
      user_id: employeeSkill.user_id || '',
      name: employeeSkill.name || '',
      description: employeeSkill.description || '',
      category: employeeSkill.category || '',
      level: employeeSkill.level || '',
      experience: employeeSkill.experience || ''
    };
  };

  doSubmit = async () => {
    const { saveEmployeeSkill, history, onCancelEdit } = this.props;
    const employeeSkill = { ...this.state.data };
    const userId = this.props.match.params.id;

    try {
      await saveEmployeeSkill(employeeSkill, this.props.userId);
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
                Add Skill Detail
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <InputField
                      name='name'
                      label='Name'
                      required={true}
                      type='text'
                      error={errors.name}
                      value={data.name}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name='description'
                      label='Description'
                      required={true}
                      type='text'
                      error={errors.description}
                      value={data.description}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <InputField
                      name='category'
                      label='Category'
                      required={true}
                      type='text'
                      error={errors.category}
                      value={data.category}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <InputField
                      name='level'
                      label='Level'
                      required={true}
                      type='text'
                      error={errors.level}
                      value={data.level}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name='experience'
                      label='Experience'
                      required={true}
                      type='text'
                      error={errors.experience}
                      value={data.experience}
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
                      onClick={onCancelEdit}
                      className={classes.submit}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
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
  saveEmployeeSkill
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EmployeeSkillForm));
