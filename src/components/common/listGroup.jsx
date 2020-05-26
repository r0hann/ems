import React from 'react';

const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
    style
  } = props;
  return (
    <ul className='list-group' style={style}>
      {items.map(item => (
        <li
          style={{ padding: '6px 10px', fontSize: '15px' }}
          key={item[valueProperty] || ''}
          className={
            item === selectedItem ? 'list-group-item active' : 'list-group-item'
          }
          onClick={() => onItemSelect(item)}>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: 'id'
};

export default ListGroup;
