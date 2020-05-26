import React from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Asynchronous(props) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    getCountries(active);

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const getCountries = async active => {
    // const response = await fetch(
    //   'https://country.register.gov.uk/records.json?page-size=5000'
    // );
    // // await sleep(1e3); // For demo purposes.
    // const countries = await response.json();
    // if (active) {
    //   setOptions(Object.keys(countries).map(key => countries[key].item[0]));
    // }
  };

  const handleInputChange = params => {
    const { value } = params.inputProps;
    setSearchValue(value);
    setOpen(value.length < 3 ? false : true);
    // if (value.length < 3) {
    //   setOpen(false);
    //   setOptions([]);
    // } else {
    //   setOpen(true);
    // }
    return (
      <TextField
        {...params}
        label='Asynchronous'
        fullWidth
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

  const handleChips = (value, className, onDelete) => {
    return value.map((option, index) => (
      <Chip
        key={index}
        size='small'
        variant='outlined'
        data-tag-index={index}
        tabIndex={-1}
        label={option.name}
        className={className}
        onDelete={onDelete}
      />
    ));
  };

  return (
    <Autocomplete
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(searchValue.length < 3 ? false : true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      multiple
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderTags={(value, { className, onDelete }) =>
        handleChips(value, className, onDelete)
      }
      renderInput={params => handleInputChange(params)}
    />
  );
}
