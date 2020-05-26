import React from 'react';

const InputSearchBox = ({ onSearch, placeholder }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [error, setError] = React.useState(null);
  const handleChange = value => {
    setError(null);
    setSearchValue(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchValue.length < 3) {
      setError('Search length must be greater than 2');
    } else onSearch(searchValue);
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className='input-group mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder={placeholder}
          onChange={e => handleChange(e.target.value)}
          aria-label='Search First Name'
          aria-describedby='basic-addon2'
        />
        <div className='input-group-append'>
          <button className='btn btn-outline-secondary' type='submit'>
            Search
          </button>
        </div>
      </div>
      {error && <div style={{ color: '#e50000' }}>{error}</div>}
    </form>
  );
};

export default InputSearchBox;
