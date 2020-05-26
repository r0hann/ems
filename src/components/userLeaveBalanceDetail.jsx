import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { materialStyles3 } from './common/materialStyle';
import { Container, CssBaseline } from '@material-ui/core';

import auth from '../services/authService';
import MaterialTableS from './common/materialTableS';
import { loadUserLeaveBalances } from './../redux/actions/leaveBalanceActions';
import '../css/color.css';

const useStyles = theme => materialStyles3(theme);

class UserLeaveBalanceDetail extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      leaveBalances: [],
      userId: auth.getUserId(),
      sortColumn: { path: 'leave_type.title', order: 'asc' }
    };
  }

  columns = [
    {
      path: 'leave_type.title',
      label: 'Leave Type',
      first: true,
      titleAlign: 'left',
      cellAlign: 'left'
    },
    { path: 'balance', label: 'Leave Balance', titleAlign: 'left', cellAlign: 'left' },
    { path: 'valid_from', label: 'From', titleAlign: 'left', cellAlign: 'left' },
    { path: 'valid_to', label: 'To', titleAlign: 'left', cellAlign: 'left' }
  ];

  componentDidMount() {
    const { loadUserLeaveBalances } = this.props;
    loadUserLeaveBalances(this.state.userId);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.leaveBalances, this.props.leaveBalances)) {
      this.setState({ leaveBalances: this.props.leaveBalances });
    }
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { leaveBalances: balanceList } = this.props;
    const { sortColumn } = this.state;
    const leaveBalances = _.orderBy(balanceList, [sortColumn.path], [sortColumn.order]);
    return (
      <React.Fragment>
        <div style={{ marginTop: '50px' }}>
          <Container component='main' maxWidth='lg'>
            <CssBaseline />
            <div>
              <div className='row '>
                <div className='col-6 justify-content-center'>
                  <h2>My Leave Balance Detail</h2>
                </div>
              </div>

              <div className='row justify-content-center'>
                <div className='col'>
                  {leaveBalances.length > 0 && (
                    <MaterialTableS
                      rows={leaveBalances}
                      columns={this.columns}
                      isAdmin={this.isAdmin}
                      sortColumn={sortColumn}
                      onSort={this.handleSort}
                    />
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

// const setLeaveBalance = (leaveBalances) => {
//     return leaveBalances.length > 0
//         ? leaveBalances.filter(obj => {
//             if (obj.active === 1) {
//                 return {
//                     ...obj,
//                     leavetype: obj.leave_type ? obj.leave_type.title : ''
//                 };
//             }
//         })
//         : [];
// };

function mapStateToProps(state, ownProps) {
  return {
    leaveTypes: state.leaveTypes,
    leaveBalances: state.leaveBalances.filter(leaveBalance => leaveBalance.active === 1),

    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  loadUserLeaveBalances
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(UserLeaveBalanceDetail));
