/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SingleSearchAutoComplete(props) {
  const {
    name,
    valueId,
    onFetchData,
    resultOptions,
    handleOptionChange,
    label,
    fieldDetail,
    error
  } = props;

  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  // const [selectedOption, setSelectedOption] = React.useState(null);
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    if (searchValue.length > 2) {
      (async () => {
        await onFetchData(searchValue);
      })();
    }
  }, [searchValue]);

  React.useEffect(() => {
    if (inputValue.length > 2 && !_.isEqual(inputValue.slice(0, 3), searchValue)) {
      setSearchValue(inputValue);
    }
  }, [inputValue]);

  React.useEffect(() => {
    if (resultOptions.length > 0) {
      setOptions(resultOptions);
    }
  }, [resultOptions]);

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

  const inputChange = (event, value) => {
    if (value.length > 2 && inputValue.length > 2 && value !== inputValue) {
      setOpen(true);
    }

    if (value.length > 2) {
      setInputValue(value);
      checkValue(value);
    }
  };
  return (
    <>
      <Autocomplete
        style={{ minWidth: 250 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onInputChange={inputChange}
        getOptionLabel={option => option[name]}
        options={options}
        // loading={loading}
        defaultValue={fieldDetail}
        onChange={(event, values) => handleOptionChange(values, valueId)}
        renderInput={params => (
          <TextField {...params} label={label} variant='outlined' fullWidth />
        )}
      />
      {error && <div className='text-danger'>{error}</div>}
    </>
  );
}
