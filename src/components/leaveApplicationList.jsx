import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { materialStyles3 } from './common/materialStyle';
import { Container, CssBaseline } from '@material-ui/core';

import { loadAllLeaveTypes } from './../redux/actions/leaveTypeActions';
import auth from '../services/authService';
import AlertDialog from './common/alertDialog';
// import MaterialTableS from './common/materialTableS';
import {
  loadLeaveApplications,
  approveLeaveApplication,
  cancelLeaveApplication,
  loadLeaveApplicationByLeaveAppId
} from './../redux/actions/leaveAppActions';
import * as mainConstants from './constants/mainConstants';
import * as appConstants from './constants/applicationConstant';
import '../css/color.css';
import Pagination from './common/pagination';
import MaterialTableT from './common/materialTableT';

const useStyles = theme => materialStyles3(theme);

class LeaveApplicationList extends Component {
  isAdmin = false;
  state = {};

  constructor(props) {
    super(props);
    const userAuth = auth.getCurrentUser();
    this.state = {
      currentPage: 1,
      sortColumn: { path: 'fullname', order: 'asc' },
      selectedLeaveApp: null
    };

    if (userAuth.role === mainConstants.ADMIN) {
      this.isAdmin = true;
      //   this.columns.push(this.deleteColumn);
    } else {
      this.isAdmin = false;
    }
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.leaveApps, this.props.leaveApps)) {
      this.loadData();
    }
  }

  loadData = async () => {
    const { loadAllLeaveTypes, loadLeaveApplications } = this.props;
    await loadAllLeaveTypes();
    await loadLeaveApplications(this.state.currentPage);
  };

  setApproveContent = (leaveApp, isAdmin) => {
    if (leaveApp.approved === 0 && leaveApp.cancelled === 0) {
      return (
        <AlertDialog
          label={appConstants.LEAVE_APPROVAL_LABEL}
          iconType='pending'
          cancelBtn={true}
          className='btn btn-outline-warning btn-sm'
          labelText={appConstants.LEAVE_APPROVAL_LABEL_TXT}
          onAction={() => this.acceptApproval(leaveApp)}
          onDisagree={() => this.declineApproval(leaveApp)}
        />
      );
    } else if (leaveApp.approved === 0 && leaveApp.cancelled === 1) {
      return (
        <i
          className='fa fa-times-circle-o fa-lg color-danger'
          data-toggle='tooltip'
          data-placement='bottom'
          title='Cancelled'
          aria-hidden='true'
        />
      );
    } else
      return (
        <i
          className='fa fa-check-circle-o fa-lg color-success'
          data-toggle='tooltip'
          data-placement='bottom'
          title='Approved'
          aria-hidden='true'
        />
      );
  };

  acceptApproval = async leaveApp => {
    await this.props.loadLeaveApplicationByLeaveAppId(leaveApp.id);
    const { cancelled } = this.props.leaveApp;
    if (cancelled === 1) toast.error('Employee cancel this application.');
    else this.props.approveLeaveApplication(leaveApp);
  };

  declineApproval = leaveApp => {
    this.props.cancelLeaveApplication(leaveApp);
  };

  handlePageChange = async page => {
    const { loadLeaveApplications } = this.props;
    window.scrollTo(0, 0);
    await loadLeaveApplications(page);
    this.setState({ currentPage: page });
  };

  getPageData = () => {
    const { currentPage, sortColumn } = this.state;
    const { total, per_page } = this.props.leaveAppResponses;
    const leaveApps = _.orderBy(this.props.leaveApps, [sortColumn.path], [sortColumn.order]);
    return {
      currentPage,

      totalCount: total ? total : 0,
      perPage: per_page ? per_page : 0,
      leaveApps,
      sortColumn
    };
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  setLeaveTypeDetail = leaveApp => {
    return (
      <p>
        <u>{leaveApp.leave_type}</u>

        <br />
        {leaveApp.detail}
      </p>
    );
  };

  columns = [
    {
      path: 'fullname',
      label: 'Employee',
      first: true,
      titleAlign: 'left',
      cellAlign: 'left'
    },
    {
      path: 'leave_type',
      label: 'Leave Type',
      titleAlign: 'left',
      cellAlign: 'left',
      content: (leaveApp, isAdmin) => this.setLeaveTypeDetail(leaveApp)
    },
    {
      path: 'leave_from',
      label: 'From',
      titleAlign: 'center',
      cellAlign: 'center',
      maxWidth: '100px'
    },
    {
      path: 'leave_to',
      label: 'To',
      titleAlign: 'left',
      cellAlign: 'center',
      maxWidth: '100px'
    },
    { path: 'days', label: 'Days', titleAlign: 'center', cellAlign: 'center', rowSpan: 2 },
    {
      path: 'txt_half_day',
      label: 'Half Day',
      titleAlign: 'center',
      cellAlign: 'center'
    },
    {
      path: 'approved',
      label: 'Status',
      type: 'alert',
      titleAlign: 'left',
      cellAlign: 'center',
      content: (leaveApp, isAdmin) => this.setApproveContent(leaveApp, isAdmin)
    }
  ];

  // columnDetail = { path: 'detail', label: 'Detail', titleAlign: 'left', cellAlign: 'left' };

  render() {
    const { currentPage, totalCount, perPage, leaveApps, sortColumn } = this.getPageData();

    return (
      <React.Fragment>
        <div style={{ marginTop: '50px' }}>
          <Container component='main' maxWidth='xl'>
            <CssBaseline />

            <div className='row '>
              <div className='col-6 justify-content-center'>
                <h2>Leave Applications</h2>
              </div>
            </div>

            <div className='row justify-content-center'>
              <MaterialTableT
                rows={leaveApps}
                columns={this.columns}
                isAdmin={this.isAdmin}
                sortColumn={sortColumn}
                // detailCol={this.columnDetail}
                onSort={this.handleSort}
              />
            </div>
            <Pagination
              itemCount={totalCount}
              currentPage={currentPage}
              pageSize={perPage}
              onPageClick={this.handlePageChange}
            />
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const getFullname = userDetail => {
  const { fname, mname, lname } = userDetail;
  let fullname = [fname, mname, lname].filter(x => x !== '').join(' ');
  return fullname;
};

const setLeaveTypeInLeaveApp = (leaveTypeId, leaveTypes) => {
  const leaveType = leaveTypes.find(single => single.id === leaveTypeId);
  return leaveType ? leaveType.title : '';
};

const setLeaveApp = (leaveApps, leaveTypes) => {
  return leaveApps.length > 0
    ? leaveApps.map(obj => {
        return {
          ...obj,
          fullname: obj.user_details ? getFullname(obj.user_details) : '',
          leave_type: setLeaveTypeInLeaveApp(obj.leave_type_id, leaveTypes),
          txt_half_day: obj.half_day ? (obj.half_day === 1 ? '1st' : '2nd') : '-'
        };
      })
    : [];
};

function mapStateToProps(state, ownProps) {
  return {
    leaveTypes: state.leaveTypes,
    leaveApp: state.leaveApp,
    leaveApps: setLeaveApp(state.leaveApps, state.leaveTypes),
    leaveAppResponses: state.leaveAppResponses,

    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  loadAllLeaveTypes,
  loadLeaveApplications,
  loadLeaveApplicationByLeaveAppId,
  approveLeaveApplication,
  cancelLeaveApplication
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(LeaveApplicationList));
