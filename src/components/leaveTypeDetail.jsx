import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { materialStyles3 } from './common/materialStyle';
import { Container, CssBaseline } from '@material-ui/core';

import { loadAllLeaveTypes, deleteLeaveType } from './../redux/actions/leaveTypeActions';
import auth from '../services/authService';
import LeaveTypeForm from './leaveTypeForm';
import AlertDialog from './common/alertDialog';
import MaterialTableS from './common/materialTableS';
// import * as UrlConst from './constants/urlConstants';
import '../css/color.css';

const useStyles = theme => materialStyles3(theme);

class LeaveTypeDetail extends Component {
  isAdmin = false;
  state = {};
  constructor(props) {
    super(props);
    const userAuth = auth.getCurrentUser();

    this.state = {
      leaveForm: false,
      showForm: false,
      selectedLeaveType: null,
      sortColumn: { path: 'title', order: 'asc' }
    };
    if (userAuth.role === 'admin') {
      this.isAdmin = true;
      this.columns.push(this.deleteColumn);
    } else {
      this.isAdmin = false;
    }
  }

  setTitleContent = (leaveType, isAdmin) => {
    let titleClass = 'btn btn-link';
    if (leaveType.active === 0) titleClass += ' color-disabled';
    return isAdmin ? (
      <button
        className={titleClass}
        onClick={() => this.props.history.push(`/leave/typedetail/${leaveType.id}`)}>
        {leaveType.title}
      </button>
    ) : (
      `${leaveType.title}`
    );
  };

  columns = [
    {
      path: 'title',
      label: 'Title',
      type: 'alert',
      titleAlign: 'left',
      cellAlign: 'left',
      content: (leaveType, isAdmin) => this.setTitleContent(leaveType, isAdmin),
      first: true
    },
    {
      path: 'half_day',
      label: 'Half Day',
      titleAlign: 'left',
      cellAlign: 'left',
      content: ({ half_day }, isAdmin) =>
        half_day ? <i className='fa fa-check color-gray' aria-hidden='true' /> : ''
    },
    {
      path: 'apply_before',
      label: 'Apply Before',
      titleAlign: 'center',
      cellAlign: 'center',
      content: ({ apply_before }, isAdmin) => (apply_before ? `${apply_before} days` : '-')
    },
    { path: 'days', label: 'Days' }
  ];

  deleteColumn = {
    key: 'delete',
    type: 'alert',
    titleAlign: 'center',
    cellAlign: 'left',
    content: leaveType => (
      <AlertDialog
        iconType='delete'
        label='Delete Leave Type'
        labelText={`Do you want to delete this leave type?`}
        onAction={() => this.handleDelete(leaveType)}
      />
    )
  };

  componentDidMount() {
    const typeId = this.props.match.params.id;
    const { loadAllLeaveTypes } = this.props;
    if (typeId) this.setState({ leaveForm: true });
    loadAllLeaveTypes();
  }

  componentDidUpdate(prevProps) {
    const { leaveTypes } = this.props;
    const currentLeaveTypeId = this.props.match.params.id;
    const prevLeaveTypeId = prevProps.match.params.id;
    if (!currentLeaveTypeId && currentLeaveTypeId !== prevLeaveTypeId) {
      this.setState({ selectedLeaveType: null });
    }
    if (
      currentLeaveTypeId &&
      currentLeaveTypeId !== prevLeaveTypeId &&
      leaveTypes.length > 0
    ) {
      this.handleLeaveType(currentLeaveTypeId);
      this.setState({ leaveForm: false });
    }
    if (currentLeaveTypeId && this.state.leaveForm && leaveTypes.length > 0) {
      this.handleLeaveType(currentLeaveTypeId);
      this.setState({ leaveForm: false });
    }
  }

  /**
   * @param {Object}leaveType
   * @param {boolean} isEdit
   */
  //function to add or edit LeaveType
  handleLeaveType = leaveTypeId => {
    const { leaveTypes } = this.props;
    let leaveType = null;
    if (!leaveTypeId) this.props.history.push('/leave/typedetail');
    if (typeof leaveTypeId === 'object') leaveType = {};
    else {
      leaveType = leaveTypeId ? leaveTypes.find(type => type.id == leaveTypeId) : null;
    }
    this.setState({
      selectedLeaveType: leaveType
    });
  };

  handleDelete = async leaveType => {
    await this.props.deleteLeaveType(leaveType);
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { leaveTypes: typeList, loading, ...rest } = this.props;
    const { selectedLeaveType, sortColumn } = this.state;
    const leaveTypes = _.orderBy(typeList, [sortColumn.path], [sortColumn.order]);
    return (
      <React.Fragment>
        {!loading && (
          <div style={{ marginTop: '50px' }}>
            {!selectedLeaveType && (
              <Container component='main' maxWidth='lg'>
                <CssBaseline />
                <div>
                  <div className='row '>
                    <div className='col-6 justify-content-center'>
                      <h2>Leave Type</h2>
                    </div>

                    <div className='col'>
                      <button
                        className='btn btn-primary pull-right'
                        onClick={() => this.handleLeaveType({})}>
                        Add
                      </button>
                    </div>
                  </div>

                  <div className='row justify-content-center'>
                    <MaterialTableS
                      rows={leaveTypes}
                      columns={this.columns}
                      isAdmin={this.isAdmin}
                      sortColumn={sortColumn}
                      onSort={this.handleSort}
                    />
                  </div>
                </div>
              </Container>
            )}
            {selectedLeaveType && (
              <LeaveTypeForm
                leaveType={selectedLeaveType}
                onCancel={this.handleLeaveType}
                {...rest}
              />
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    leaveTypes: state.leaveTypes,
    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  loadAllLeaveTypes,
  deleteLeaveType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(LeaveTypeDetail));
