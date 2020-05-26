import React from 'react';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Chip } from '@material-ui/core';

function DefaultMultiAutoComplete(props) {
  const { onChange, propsName, label, error, disabledList, name, disableOptions } = props;
  const [options, setOptions] = React.useState(props[propsName]);
  const disabled = disabledList ? disabledList[propsName] : false;

  React.useEffect(() => {
    const dataOptions = props[propsName];
    if (dataOptions && dataOptions.length > 0) {
      setOptions(props[propsName]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props[propsName]]);

  const checkDisableOption = singleObj => {
    return disableOptions[propsName].find(obj => _.isEqual(obj, singleObj));
  };

  return (
    <React.Fragment>
      <Autocomplete
        multiple
        style={{ width: 500, marginTop: '10px' }}
        getOptionLabel={option => option[name]}
        options={options}
        getOptionDisabled={option => option === checkDisableOption(option)}
        disabled={disabled}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option[name]}
              size='small'
              variant='outlined'
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => (
          <TextField {...params} placeholder={label} variant='outlined' fullWidth />
        )}
        onChange={(event, value) => onChange(value)}
      />
      {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
    </React.Fragment>
  );
}

export default DefaultMultiAutoComplete;
