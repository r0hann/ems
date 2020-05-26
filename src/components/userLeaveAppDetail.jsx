import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { materialStyles3 } from './common/materialStyle';
import { Container, CssBaseline } from '@material-ui/core';

// import {loadAllLeaveTypes} from './../redux/actions/leaveTypeActions';
import { loadEmployeeDetail } from '../redux/actions/employeeDetailActions';
import auth from '../services/authService';
import AlertDialog from './common/alertDialog';
import {
  leaveApplicationsByUserId,
  loadLeaveApplicationByLeaveAppId,
  cancelLeaveApplication
} from './../redux/actions/leaveAppActions';
import '../css/color.css';
import * as AppConstants from './constants/applicationConstant';
import MaterialTableT from './common/materialTableT';

const useStyles = theme => materialStyles3(theme);

class UserLeaveAppDetail extends Component {
  isAdmin = false;
  state = {};

  constructor(props) {
    super(props);
    const userAuth = auth.getCurrentUser();
    this.state = {
      selectedLeaveApp: null,
      userId: userAuth.sub,
      sortColumn: { path: 'fullname', order: 'asc' }
    };
  }

  columns = [
    {
      path: 'fullname',
      label: 'Employee',
      first: true,
      titleAlign: 'left',
      cellAlign: 'left',
      rowSpan: 2
    },
    { path: 'leave_type_title', label: 'Leave Type', titleAlign: 'left', cellAlign: 'left' },

    { path: 'days', label: 'Days', titleAlign: 'center', cellAlign: 'center', rowSpan: 2 },
    {
      path: 'txt_half_day',
      label: 'Half Day',
      titleAlign: 'left',
      cellAlign: 'left',
      rowSpan: 2
    },
    { path: 'leave_from', label: 'From', titleAlign: 'left', cellAlign: 'left', rowSpan: 2 },
    { path: 'leave_to', label: 'To', titleAlign: 'left', cellAlign: 'left', rowSpan: 2 },
    {
      path: 'approved',
      label: 'Status',
      titleAlign: 'center',
      cellAlign: 'center',
      rowSpan: 2,
      content: (leaveApp, isAdmin) => this.setApproveContent(leaveApp, isAdmin)
    },
    {
      key: 'delete',
      type: 'alert',
      label: 'Action',
      titleAlign: 'left',
      cellAlign: 'left',
      rowSpan: 2,
      content: leaveApp =>
        leaveApp.cancelled === 0 && leaveApp.approved === 0 ? (
          <AlertDialog
            iconType='cross'
            label={AppConstants.CANCEL_LEAVE_APP_LABEL}
            labelText={AppConstants.CANCEL_LEAVE_APP_QUESTION_TEXT}
            onAction={() => this.employeeLeaveCancel(leaveApp)}
          />
        ) : (
          ''
        )
    }
  ];

  columnDetail = {
    path: 'detail',
    label: 'Detail',
    titleAlign: 'left',
    cellAlign: 'left'
  };

  componentDidMount() {
    const {
      // loadAllLeaveTypes,
      leaveApplicationsByUserId,
      loadEmployeeDetail
    } = this.props;
    // loadAllLeaveTypes();
    leaveApplicationsByUserId();
    loadEmployeeDetail(this.state.userId);
  }

  employeeLeaveCancel = async leaveApp => {
    const { loadLeaveApplicationByLeaveAppId, cancelLeaveApplication } = this.props;
    await loadLeaveApplicationByLeaveAppId(leaveApp.id);
    const { approved, cancelled } = this.props.leaveApp;
    if (approved === 0 && cancelled === 0) {
      await cancelLeaveApplication(leaveApp);
      // await leaveApplicationsByUserId();
    }
  };

  setApproveContent = leaveApp => {
    if (leaveApp.approved === 1 && leaveApp.cancelled === 0) {
      return <i className='fa fa-check-circle-o fa-lg color-success' aria-hidden='true' />;
    } else if (leaveApp.approved === 0 && leaveApp.cancelled === 1) {
      return <i className='fa fa-times-circle-o fa-lg color-danger' aria-hidden='true' />;
    } else return <i className='fa fa-minus-circle fa-lg color-warning' aria-hidden='true' />;
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    // const userAuth = auth.getCurrentUser().role === 'admin';
    const { leaveApps } = this.props;
    const { sortColumn } = this.state;
    const sortLeaveApps = _.orderBy(leaveApps, [sortColumn.path], [sortColumn.order]);
    return (
      <React.Fragment>
        <div style={{ marginTop: '50px' }}>
          <Container component='main' maxWidth='lg'>
            <CssBaseline />
            <div>
              <div className='row '>
                <div className='col-6 justify-content-center'>
                  <h2>Leave Applications</h2>
                </div>
              </div>

              <div className='row justify-content-center'>
                <MaterialTableT
                  rows={sortLeaveApps}
                  columns={this.columns}
                  detailCol={this.columnDetail}
                  isAdmin={this.isAdmin}
                  sortColumn={sortColumn}
                  onSort={this.handleSort}
                />
              </div>
            </div>
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

const setLeaveApp = (leaveApps, leaveTypes, userDetail) => {
  return leaveApps.length > 0
    ? leaveApps.map(obj => {
        return {
          ...obj,
          fullname: userDetail ? getFullname(userDetail) : '',
          leave_type_title: obj.leave_type ? obj.leave_type.title : '',
          txt_half_day: obj.half_day ? (obj.half_day === 1 ? '1st' : '2nd') : '-'
        };
      })
    : [];
};

function mapStateToProps(state, ownProps) {
  return {
    leaveApp: state.leaveApp,
    leaveApps: setLeaveApp(state.leaveApps, state.leaveTypes, state.employeeDetail),
    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  // loadAllLeaveTypes,
  leaveApplicationsByUserId,
  loadLeaveApplicationByLeaveAppId,
  cancelLeaveApplication,
  loadEmployeeDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(UserLeaveAppDetail));
