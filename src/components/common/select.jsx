import React from 'react';

const Select = ({ options, name, label, error, ...rest }) => {
  return (
    <div className='form-group mb-3'>
      <label htmlFor={name}>{label}</label>
      <select className='form-control' name={name} id={name} {...rest}>
        <option value=''>Choose...</option>
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Select;
