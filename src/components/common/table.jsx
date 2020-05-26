import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = props => {
  const { data, columns, sortColumn, onSort, isTrue, ...rest } = props;
  return (
    <div className='table-responsive'>
      <table className='table' {...rest}>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} isTrue={isTrue} />
      </table>
    </div>
  );
};

export default Table;
