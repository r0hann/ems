import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import auth from '../services/authService';

import Pagination from './common/pagination';
import EmployeeTable from './employeeTable';
import { loadDepartments } from '../redux/actions/departmentsActions';
import { loadDesignations } from '../redux/actions/designationsActions';
import {
  loadEmployeesByPage,
  deleteEmployee,
  getSearchEmployees
} from '../redux/actions/employeesActions';
import SelectOptions from './common/selectOptions';
import InputSearchBox from './common/inputSearchBox';

class EmployeeDetails extends Component {
  state = {
    currentPage: 1,
    selectedDepartmentId: '',
    searchQuery: '',
    sortColumn: { path: 'fullname', order: 'asc' }
  };

  componentDidMount() {
    const { currentPage } = this.state;
    const { loadEmployeesByPage, loadDepartments, loadDesignations } = this.props;
    loadDepartments();
    loadDesignations();
    loadEmployeesByPage(currentPage);
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(prevProps.pageDetail, this.props.pageDetail)) {
  //     console.log('pagedetail', this.props.pageDetail);
  //   }
  // }

  handlePageChange = async page => {
    const { loadEmployeesByPage } = this.props;
    await loadEmployeesByPage(page);
    this.setState({ currentPage: page });
  };

  handleSelectChange = async ({ target }) => {
    const selectedDepartmentId = target.value;
    const employeeSearchKey = { department: target.value };
    this.setState({ selectedDepartmentId, searchQuery: '', currentPage: 1 });
    if (selectedDepartmentId !== '')
      await this.props.getSearchEmployees(employeeSearchKey, 'params');
    else await this.props.loadEmployeesByPage(1);
  };

  handleSearch = async searchValue => {
    const searchKey = ['fname', 'like', searchValue + '%'];
    await this.props.getSearchEmployees(searchKey, 'array');
    this.setState({
      selectedDepartmentId: '',
      searchQuery: searchValue,
      currentPage: 1
    });
  };

  handleDelete = async employee => {
    await this.props.deleteEmployee(employee);
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const { currentPage, sortColumn } = this.state;
    const { total, per_page } = this.props.pageDetail;
    const employees = _.orderBy(this.props.employees, [sortColumn.path], [sortColumn.order]);

    return {
      currentPage,
      totalCount: total ? total : 0,
      perPage: per_page ? per_page : 0,
      employees,
      sortColumn
    };
  };

  render() {
    const { departments } = this.props;
    const userAuth = auth.getCurrentUser().role === 'admin';
    const { searchQuery, selectedDepartmentId } = this.state;
    const { currentPage, totalCount, perPage, employees, sortColumn } = this.getPageData();

    return (
      <React.Fragment>
        {/* {!loading && ( */}
        <div>
          <div className='row'>
            <div className='col-5'>
              <h2>Employee Details</h2>
            </div>
            <div className='col'>
              {userAuth && (
                <Link className='btn btn-primary btn-sm m-2 pull-right' to='/user/new'>
                  Add User
                </Link>
              )}
            </div>
          </div>

          <div className='row'>
            <div className='col-5 m-2'>
              <InputSearchBox
                placeholder='Search firstname....'
                value={searchQuery}
                onSearch={this.handleSearch}
              />
              {/* <SearchBox
                value={searchQuery}
                placeholder='Search First name....'
                onChange={this.handleSearch}
              /> */}
            </div>
            <div className='col'>
              <div className='pull-right'>
                <SelectOptions
                  options={departments}
                  name='department'
                  itemName='name'
                  valueId='id'
                  label='Select Department'
                  selectedOption={selectedDepartmentId}
                  handleChange={this.handleSelectChange}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <EmployeeTable
              employees={employees}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />

            <Pagination
              itemCount={totalCount}
              currentPage={currentPage}
              pageSize={perPage}
              onPageClick={this.handlePageChange}
            />
          </div>
        </div>
        {/* )} */}
      </React.Fragment>
    );
  }
}

EmployeeDetails.propTypes = {
  loadEmployeesByPage: PropTypes.func.isRequired,
  loadDesignations: PropTypes.func.isRequired,
  loadDepartments: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired
};

const getFullname = userDetail => {
  const { salutation, fname, mname, lname } = userDetail;
  let fullname = fname ? [fname, mname, lname].filter(x => x !== '').join(' ') : '';
  if (salutation) fullname = salutation + '.' + fullname;
  // console.log(userDetail.email, fullname.length, fname, mname);
  return fullname;
};

const getContactNumber = userDetail => {
  const { phone_personal, phone_mobile } = userDetail;
  return `${phone_personal}/ ${phone_mobile}`;
};

/**Add  department & designation name, fullname and contact number in employees props */
const redefinedEmployees = (employees, departments, designations) => {
  return employees.length > 0
    ? employees.map(singleEmp => {
        let department = departments.find(d => singleEmp && d.id === singleEmp.department);
        department = department || {};

        let designation = designations.find(d => singleEmp && d.id === singleEmp.designation);
        designation = designation || {};
        return {
          ...singleEmp,
          fullname: singleEmp ? getFullname(singleEmp) : '',
          departmentName: singleEmp && departments.length > 0 ? department.name : '',
          designationName: singleEmp && designations.length > 0 ? designation.name : '',
          contact_number: singleEmp ? getContactNumber(singleEmp) : ''
        };
      })
    : [];
};

function mapStateToProps(state, ownProps) {
  return {
    departments: [{ id: '', name: 'All Departments' }, ...state.departments],
    designations: state.designations,
    employees: redefinedEmployees(state.employees, state.departments, state.designations),
    pageDetail: state.pageDetail,
    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  getSearchEmployees,
  loadEmployeesByPage,
  loadDesignations,
  loadDepartments,
  deleteEmployee
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
