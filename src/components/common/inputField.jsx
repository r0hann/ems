import React from 'react';
import TextField from '@material-ui/core/TextField';

let booleanError = false;

const InputField = ({
  name,
  label,
  margin,
  multiLine,
  disabled,
  error,
  ...rest
}) => {
  booleanError = error ? true : false;
  return (
    <TextField
      spacing={0}
      name={name}
      variant='outlined'
      margin={margin ? margin : 'dense'}
      fullWidth
      disabled={disabled ? disabled : false}
      multiline={multiLine ? multiLine : false}
      error={booleanError}
      helperText={booleanError ? error : ''}
      label={label}
      {...rest}
    />
  );
};

export default InputField;
