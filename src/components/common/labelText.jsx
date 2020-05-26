import React from 'react';
import _ from 'lodash';
import AlertDialog from './alertDialog';
import auth from '../../services/authService';

const LabelText = ({
  userId,
  columns,
  item,
  styled,
  onItemClick,
  onDelete,
  selectedDetail,
  unEditable,
  unDeleteable
}) => {
  const userAuth = auth.getCurrentUser();

  const checkUneditable = columnName => {
    const labelName = unEditable.find(({ name }) => name === columnName);
    if (labelName) {
      if (labelName.adminEdit && userAuth.role === 'admin') return false;
      else if (labelName.forAll) return true;
      else return true;
    }
    return false;
  };

  const checkUndeleteable = columnName => {
    const labelName = unDeleteable.find(({ name }) => name === columnName);
    if (labelName) {
      if (labelName.adminEdit && userAuth.role === 'admin') return false;
      else if (labelName.forAll) return true;
      else return true;
    }
    return false;
  };

  const renderCell = (item, column) => {
    const columnItem = _.get(item, column.path);
    if (column.content) return column.content(item);
    if (column.type && column.type === 'boolean') {
      return columnItem === 0 ? 'false' : 'true';
    }
    return columnItem;
  };
  const createKey = (item, column) => {
    return column.path + item.id;
  };
  return (
    <div style={styled}>
      {!checkUneditable(selectedDetail.name) && parseInt(userId) !== userAuth.sub && (
        <div>
          <button
            type='button'
            className='btn btn-link row pull-right'
            style={{
              cursor: 'pointer',
              float: 'right',
              color: '#28a745',
              marginTop: '2px',
              zIndex: '3',
              position: 'absolute',
              right: '65px'
            }}
            onClick={() => onItemClick(item)}>
            <i className='fa fa-pencil-square-o fa-lg' aria-hidden='true' />
          </button>
        </div>
      )}
      {!checkUndeleteable(selectedDetail.name) && (
        <div className='pull-right'>
          <AlertDialog
            iconType='delete'
            className='btn btn-link row pull-right'
            styled={{
              cursor: 'pointer',
              float: 'right',
              color: '#dc3545',
              zIndex: '3',
              position: 'absolute',
              right: '40px'
            }}
            label={`Delete ${selectedDetail.name}`}
            labelText={`Do you want to delete this ${selectedDetail.name}?`}
            onAction={() => onDelete(item)}
          />
        </div>
      )}

      {columns.map(column => (
        <div className='row' key={createKey(item, column)}>
          <div className='col-4'>
            <h6 className='m-1'> {column.label}</h6>
          </div>
          <div className='col'>
            <p className='m-1'>{renderCell(item, column)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LabelText;
