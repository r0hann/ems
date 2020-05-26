import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import {
  OutlinedInput,
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';

const useStyles = theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 210,
    maxWidth: 250
  }
});

class DynamicSelectOptions extends React.Component {
  inputLabel = React.createRef();

  state = {
    value: { id: '' },
    labelWidth: 0
  };

  componentDidMount() {
    const labelWidth = this.inputLabel.current.offsetWidth;
    this.setState({ labelWidth });
  }

  render() {
    const {
      classes,
      name,
      optionPropName,
      itemName,
      label,
      error,
      selectedOption,
      handleChange,
      required
    } = this.props;

    const { labelWidth } = this.state;
    const options = this.props[optionPropName];
    return (
      <FormControl
        variant='outlined'
        required={required}
        className={classes.formControl}
        fullWidth={false}
        error={error ? true : false}>
        <InputLabel ref={this.inputLabel} margin='dense' htmlFor='item-simple'>
          {label}
        </InputLabel>
        <Select
          value={selectedOption ? selectedOption : ''}
          onChange={handleChange}
          name={name}
          margin='dense'
          input={<OutlinedInput labelWidth={labelWidth} name={name} id='item-simple' />}
          id='item-simple'>
          {options.map(option => {
            return (
              <MenuItem key={option.id} value={option.id}>
                {option[itemName]}
              </MenuItem>
            );
          })}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
}

export default withStyles(useStyles)(DynamicSelectOptions);
