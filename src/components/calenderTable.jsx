import React, { Component } from 'react';
import auth from '../services/authService';
import { Link } from 'react-router-dom';
import AlertDialog from './common/alertDialog';
import MaterialTableS from './common/materialTableS';
import moment from 'moment';

class CalenderTable extends Component {
  isTrue = false;

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user.role === 'admin') {
      this.isTrue = true;
      this.columns.push(this.deleteColumn);
    } else {
      this.isTrue = false;
    }
    // if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  columns = [
    {
      path: 'title',
      type: 'alert',
      label: 'Holiday Title',
      titleAlign: 'left',
      cellAlign: 'left',
      content: (holidayCalendar, isTrue) =>
        isTrue ? (
          <Link to={`/calendar/${holidayCalendar.id}`}>{holidayCalendar.title}</Link>
        ) : (
          `${holidayCalendar.title}`
        )
    },
    { path: 'nepali_date', label: 'Nepali Date', titleAlign: 'left', cellAlign: 'left' },
    {
      path: 'start_date',
      label: 'Start Date',
      titleAlign: 'left',
      cellAlign: 'left',
      content: ({ start_date }, isAdmin) => moment(start_date).format('DD MMM, YYYY')
    },
    {
      path: 'end_date',
      label: 'End Date',
      titleAlign: 'left',
      cellAlign: 'left',
      content: ({ end_date }, isAdmin) => moment(end_date).format('DD MMM, YYYY')
    },
    { path: 'days', label: 'Days', titleAlign: 'left', cellAlign: 'left' },
    { path: 'remarks', label: 'Remarks', titleAlign: 'left', cellAlign: 'left' }
  ];

  deleteColumn = {
    key: 'delete',
    type: 'alert',
    content: holidayCalendar => (
      <AlertDialog
        label='Delete Calendar'
        iconType='delete'
        labelText={`Delete this calendar?`}
        onAction={() => this.props.onDelete(holidayCalendar)}
      />
      // <button
      //   onClick={() => this.props.onDelete(employee)}
      //   className='btn btn-outline-danger btn-sm'>
      //   Delete
      // </button>
    )
  };

  render() {
    const { holidayCalendar, sortColumn, onSort } = this.props;
    return (
      <MaterialTableS
        rows={holidayCalendar}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        isAdmin={this.isTrue}
      />
    );
  }
}

export default CalenderTable;
