import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';

// let booleanError = false;

export default function MaterialUIPickers({
  name,
  margin,
  error,
  value,
  disablePast,
  onChange,
  onError,
  label
}) {
  // The first commit of Material-UI
  // booleanError = error ? true : false;
  const [selectedDate, setSelectedDate] = React.useState(value);
  React.useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleDateChange = value => {
    setSelectedDate(value);
    const dateValid = moment(value).isValid();
    if (dateValid) onChange(name, value);
    else onError(name);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant='dialog'
        inputVariant='outlined'
        format='yyyy-MM-dd'
        disablePast={disablePast ? disablePast : false}
        margin={margin ? margin : 'dense'}
        label={label}
        value={selectedDate}
        autoOk
        error={error ? true : false}
        helperText={error ? error : null}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
