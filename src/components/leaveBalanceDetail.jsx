import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { materialStyles3 } from './common/materialStyle';
import { Container, CssBaseline } from '@material-ui/core';

import { loadAllLeaveTypes } from './../redux/actions/leaveTypeActions';
import auth from '../services/authService';
import MaterialTableS from './common/materialTableS';
import { loadUserLeaveBalances } from './../redux/actions/leaveBalanceActions';
import '../css/color.css';
import UpdateLeaveBalanceForm from './updateLeaveBalanceForm';
import { addFullName } from './helper/leaveBalanceHelper';
import { getFullname } from './helper/commonHelper';
import '../css/color.css';
import SingleSearchAutoComplete from './common/singleSearchAutoComplete';
import { getSearchEmployees } from '../redux/actions/employeesActions';

const useStyles = theme => materialStyles3(theme);

class LeaveBalanceDetail extends Component {
  isAdmin = false;
  state = {};

  constructor(props) {
    super(props);
    const userAuth = auth.getCurrentUser();
    this.state = {
      showForm: false,
      selectedEmployee: null,
      searchQuery: '',
      leaveBalances: [],
      leaveBalance: null,
      editBalance: false,
      sortColumn: { path: 'fullname', order: 'asc' }
    };
    this.isAdmin = userAuth.role === 'admin';
  }

  columns = [
    {
      path: 'fullname',
      label: 'Employee',
      first: true,
      titleAlign: 'center',
      cellAlign: 'left'
    },
    { path: 'leave_type.title', label: 'Leave Type', titleAlign: 'left', cellAlign: 'left' },
    { path: 'balance', label: 'Leave Balance', titleAlign: 'left', cellAlign: 'center' },
    { path: 'valid_from', label: 'From', titleAlign: 'center', cellAlign: 'left' },
    { path: 'valid_to', label: 'To', titleAlign: 'left', cellAlign: 'left' },
    {
      key: 'active',
      label: 'Active',
      titleAlign: 'left',
      cellAlign: 'left',
      content: leaveBalance =>
        leaveBalance.active === 1 ? (
          <i className='fa fa-check-circle-o fa-lg color-success' aria-hidden='true' />
        ) : (
          <i className='fa fa-times-circle-o fa-lg color-danger' aria-hidden='true' />
        )
    },
    {
      key: 'edit',
      type: 'alert',
      content: leaveBalance => (
        <button
          onClick={() => this.handleBalanceUpdate(leaveBalance)}
          className='btn btn-outline-success btn-sm'>
          <i className='fa fa-pencil-square-o fa-lg' aria-hidden='true'></i>
        </button>
      )
    }
  ];

  componentDidMount() {
    const { loadAllLeaveTypes } = this.props;
    loadAllLeaveTypes();
  }

  componentDidUpdate(prevProps) {
    const { leaveBalances } = this.props;
    if (!_.isEqual(prevProps.leaveBalances, leaveBalances)) {
      if (this.state.leaveBalances.length > 0) {
        const fullName = this.state.leaveBalances[0].fullname;
        const newLeaveBalances = addFullName(leaveBalances, fullName);
        this.setState({ leaveBalances: newLeaveBalances });
        // console.log('update leave balance', newLeaveBalances);
      }
    }
  }

  handleBalanceUpdate = leaveBalance => {
    if (leaveBalance) {
      this.setState({ leaveBalance });
    } else {
      this.setState({ leaveBalance: null });
    }
    // this.setState({ editBalance });
  };

  fetchSearchEmployee = async searchValue => {
    const searchArray = ['fname', 'like', searchValue + '%'];
    await this.props.getSearchEmployees(searchArray, 'array');
  };

  handleSelectChange = async searchEmp => {
    const { loadUserLeaveBalances } = this.props;
    await loadUserLeaveBalances(searchEmp.id);
    const leaveBalances = addFullName(this.props.leaveBalances, searchEmp.fullname);

    this.setState({ selectedEmployee: searchEmp, leaveBalances });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    // const userAuth = auth.getCurrentUser().role === 'admin';
    const { searchEmployees } = this.props;
    const { leaveBalance, leaveBalances, sortColumn } = this.state;
    const sortedLeaveBalances = _.orderBy(
      leaveBalances,
      [sortColumn.path],
      [sortColumn.order]
    );
    return (
      <React.Fragment>
        <div style={{ marginTop: '50px' }}>
          <Container component='main' maxWidth='lg'>
            <CssBaseline />
            <div>
              <div className='row '>
                <div className='col-6 justify-content-center'>
                  <h2>Employee Leave Balance Detail</h2>
                </div>

                <div className='col'>
                  <SingleSearchAutoComplete
                    name='fullname'
                    valueId='id'
                    onFetchData={this.fetchSearchEmployee}
                    resultOptions={searchEmployees}
                    handleOptionChange={this.handleSelectChange}
                    label='Search Employee'
                  />
                  {/*<SingleAutoComplete handleChange={this.handleSearch}/>*/}
                </div>
              </div>

              <div className='row justify-content-center'>
                {!leaveBalance && (
                  <div className='col'>
                    {leaveBalances.length > 0 && (
                      <MaterialTableS
                        rows={sortedLeaveBalances}
                        columns={this.columns}
                        isAdmin={this.isAdmin}
                        sortColumn={sortColumn}
                        onSort={this.handleSort}
                      />
                    )}
                  </div>
                )}
                {leaveBalance && (
                  <div className='col'>
                    {leaveBalances.length > 0 && (
                      <UpdateLeaveBalanceForm
                        leaveBalance={leaveBalance}
                        onUpdateCancel={this.handleBalanceUpdate}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    leaveTypes: state.leaveTypes,
    leaveBalances: state.leaveBalances,
    searchEmployees: state.employees.map(singleEmp => {
      return {
        ...singleEmp,
        fullname: singleEmp ? getFullname(singleEmp) : ''
      };
    }),

    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  loadAllLeaveTypes,
  getSearchEmployees,
  loadUserLeaveBalances
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(LeaveBalanceDetail));
