/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import _ from 'lodash';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function SearchMultiAutoComplete(props) {
  const { onChange, propsName, error, name, label, disabledList } = props;
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [options, setOptions] = React.useState(props[propsName] ? props[propsName] : []);
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const disabled = disabledList ? disabledList[propsName] : false;

  React.useEffect(() => {
    if (searchValue.length > 2) {
      (async () => {
        await props.onSearchOptions(searchValue);
        setLoading(false);
      })();
    }
  }, [searchValue]);

  React.useEffect(() => {
    if (inputValue.length > 2 && !_.isEqual(inputValue.slice(0, 3), searchValue)) {
      setSearchValue(inputValue);
    }
  }, [inputValue]);

  React.useEffect(() => {
    if (props[propsName].length > 0) {
      setOptions(props[propsName]);
    }
  }, [props[propsName]]);

  const checkValue = value => {
    if (searchValue.length === 0) {
      setSearchValue(value);
    } else if (
      value.length > searchValue.length &&
      !_.isEqual(value.slice(0, 3), searchValue)
    ) {
      setSearchValue(value);
    } else if (
      value.length < searchValue.length &&
      !_.isEqual(value, searchValue.slice(0, 3))
    ) {
      setSearchValue(value);
    }
  };

  const handleInputChange = params => {
    const { value } = params.inputProps;
    if (value.length > 2 && inputValue.length > 2 && value !== inputValue) {
      setOpen(true);
    }
    if (value.length > 2) {
      setInputValue(value);
      checkValue(value);
    }

    return (
      <TextField
        {...params}
        fullWidth
        placeholder={label}
        variant='outlined'
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color='inherit' size={20} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          )
        }}
      />
    );
  };

  return (
    <React.Fragment>
      <Autocomplete
        style={{ width: 500, marginTop: '8px' }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        multiple
        disabled={disabled ? disabled : false}
        getOptionLabel={option => option[name]}
        options={options}
        loading={loading}
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
        renderInput={params => handleInputChange(params)}
        onChange={(event, value) => onChange(value)}
      />
      {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
    </React.Fragment>
  );
}

export default SearchMultiAutoComplete;
