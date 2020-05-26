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
    minWidth: 220,
    maxWidth: 230
  }
});

class SelectOptions extends React.Component {
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
      options,
      name,
      itemName,
      label,
      error,
      valueId,
      selectedOption,
      handleChange,
      required
    } = this.props;

    const { labelWidth } = this.state;

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
              <MenuItem key={option[valueId] || ''} value={option[valueId ? valueId : 'id']}>
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

export default withStyles(useStyles)(SelectOptions);
