import React from 'react';
import { Link } from 'react-router-dom';

const UrlListGroup = props => {
  const {
    tabDetailList,
    tabList,
    textProperty,
    valueProperty,
    selectedItem,
    onTabClick,

    style
  } = props;
  //   const handleTabClick = tabName => {
  //     history.push(`/user-profile/${userId}/${tabName}`);
  //   };
  return (
    <ul className='list-group' style={style}>
      {tabList.map(tab => (
        // console.log('tab', `/user-profile/${userId}/${tab}`, tabDetailList[tab].label)
        <li
          style={{ padding: '6px 10px', fontSize: '15px' }}
          key={tab}
          className={`list-group-item ${tab === selectedItem[valueProperty] ? 'active' : ''}`}
          onClick={() => onTabClick(tab)}>
          {tabDetailList[tab] ? tabDetailList[tab].label : ''}
        </li>
      ))}
    </ul>
  );
};

UrlListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: 'id'
};

export default UrlListGroup;
