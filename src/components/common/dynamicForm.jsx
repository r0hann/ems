import React from 'react';
import { Grid, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import InputField from './inputField';
import SelectOptions from './selectOptions';
import { makeStyles } from '@material-ui/core/styles';
import { materialStyles2 } from './materialStyle';
import * as Constants from '../constants/commonConstants';
import MaterialUIPickers from './datePicker';
import SearchMultiAutoComplete from './searchMultiAutoComplete';
import DefaultMultiAutoComplete from './defaultMultiAutoComplete';
import RadioButtonGroup from './radioButtonGroup';
import DynamicSelectOptions from './dynamicSelectOptions';

const useStyles = makeStyles(theme => materialStyles2(theme));

//selectedOptionField for the options of SelectOptions

const DynamicForm = props => {
  const {
    formDetail,
    data,
    errors,
    visible,
    hideList,
    onCancelEdit,
    handleSubmit,
    selectOptionsField,
    ...rest
  } = props;
  const classes = useStyles();

  const hideField = name => {
    if (!hideList) return true;
    else if (hideList && hideList[name]) return true;
    else return false;
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        {formDetail.map(singleForm => {
          const {
            field,
            size,
            name,
            label,
            valueId,
            marginLeft,
            options,
            propsName,
            itemName,
            required,
            onSearch,
            onChange,
            disabled,
            onError
          } = singleForm;
          switch (field) {
            case Constants.INPUTFIELD:
              return (
                <Grid item xs={size} key={name}>
                  <InputField
                    name={name}
                    label={label}
                    required={required}
                    type='text'
                    disabled={disabled}
                    error={errors[name]}
                    value={data[name]}
                    onChange={onChange}
                  />
                </Grid>
              );

            case Constants.SELECTOPTION:
              return (
                <React.Fragment key={name}>
                  {hideField(name) && (
                    <Grid item xs={size} key={name}>
                      <SelectOptions
                        options={selectOptionsField}
                        name={name}
                        propsName={propsName}
                        itemName={itemName}
                        label={label}
                        valueId={valueId}
                        required={required}
                        selectedOption={data[name]}
                        handleChange={onChange}
                        error={errors[name]}
                      />
                    </Grid>
                  )}
                </React.Fragment>
              );

            case Constants.DYNAMIC_SELECTOPTION:
              return (
                <React.Fragment key={name}>
                  {hideField(name) && (
                    <Grid item xs={size} key={name} style={{ marginLeft }}>
                      <DynamicSelectOptions
                        name={name}
                        itemName={itemName}
                        label={label}
                        optionPropName={propsName}
                        required={required}
                        selectedOption={data[name]}
                        handleChange={onChange}
                        error={errors[name]}
                        {...rest}
                      />
                    </Grid>
                  )}
                </React.Fragment>
              );

            case Constants.CHECKBOX:
              return (
                <Grid item xs={size} key={name}>
                  <FormControlLabel
                    name={name}
                    control={
                      <Checkbox
                        checked={data[name] === 1}
                        color='primary'
                        value={data[name] === 1}
                      />
                    }
                    onChange={onChange}
                    label={label}
                    labelPlacement='start'
                  />
                </Grid>
              );

            case Constants.DATEPICKER:
              return (
                <Grid item xs={size} key={name}>
                  <MaterialUIPickers
                    name={name}
                    label={label}
                    required={required}
                    error={errors[name]}
                    value={data[name]}
                    onError={onError}
                    onChange={onChange}
                  />
                </Grid>
              );
            case Constants.SEARCH_MULTI_AUTOCOMPLETE:
              return (
                <React.Fragment key={name}>
                  {hideField(propsName) && (
                    <SearchMultiAutoComplete
                      key={label}
                      label={label}
                      name={name}
                      valueId={valueId}
                      error={errors[valueId]}
                      propsName={propsName}
                      onSearchOptions={onSearch}
                      onChange={onChange}
                      {...rest}
                    />
                  )}
                </React.Fragment>
              );

            case Constants.DEFAULT_MULTI_AUTOCOMPLETE:
              return (
                <DefaultMultiAutoComplete
                  key={label}
                  name={name}
                  label={label}
                  error={errors[valueId]}
                  propsName={propsName}
                  onChange={onChange}
                  {...rest}
                />
              );

            case Constants.RADIOBUTTONGROUP:
              return (
                <Grid item xs={size} key={name}>
                  <RadioButtonGroup
                    radioData={options}
                    radioValue={data[name]}
                    onChange={onChange}
                  />
                </Grid>
              );

            default:
              return null;
          }
        })}

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
  );
};

export default DynamicForm;
