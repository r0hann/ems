import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
// import Table from './common/table';
import AlertDialog from './common/alertDialog';
import MaterialTableS from './common/materialTableS';

class EmployeeTable extends Component {
  isTrue = false;
  columns = [
    {
      path: 'fullname',
      type: 'alert',
      label: 'Full name',
      titleAlign: 'center',
      cellAlign: 'left',
      // <i class="fa fa-user" aria-hidden="true"></i>
      content: (employee, isTrue) =>
        isTrue ? (
          <Link to={`/user-profile/${employee.id}/user`}>
            {employee.fullname ? (
              employee.fullname
            ) : (
              <i className='fa fa-user' aria-hidden='true' />
            )}
          </Link>
        ) : (
          `${employee.fullname}`
        )
    },
    { path: 'employee_id', label: 'Employee Id', titleAlign: 'left', cellAlign: 'left' },
    { path: 'email', label: 'Email', titleAlign: 'left', cellAlign: 'left' },
    {
      path: 'designationName',
      label: 'Designation',
      titleAlign: 'left',
      cellAlign: 'left'
    },
    // {
    //   path: 'departmentName',
    //   label: 'Department',
    //   titleAlign: 'center',
    //   cellAlign: 'left'
    // },
    {
      path: 'phone_mobile',
      label: 'Contact number',
      titleAlign: 'left',
      cellAlign: 'left'
    }
  ];

  deleteColumn = {
    key: 'delete',
    type: 'alert',
    titleAlign: 'center',
    cellAlign: 'left',
    content: employee => (
      <AlertDialog
        iconType='delete'
        label='Delete Employee'
        labelText={`Do you want to delete this employee?`}
        onAction={() => this.props.onDelete(employee)}
      />
      // <button
      //   onClick={() => this.props.onDelete(employee)}
      //   className='btn btn-outline-danger btn-sm'>
      //   Delete
      // </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user.role === 'admin') {
      this.isTrue = true;
      // this.columns.push(this.deleteColumn);
    } else {
      this.isTrue = false;
    }
  }

  render() {
    const { employees, sortColumn, onSort } = this.props;

    return (
      <MaterialTableS
        rows={employees}
        columns={this.columns}
        isAdmin={this.isTrue}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      // <Table
      //   data={employees}
      //   isTrue={this.isTrue}
      //   columns={this.columns}
      // />
    );
  }
}

export default EmployeeTable;
