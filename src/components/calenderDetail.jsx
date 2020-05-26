import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import CalenderTable from './calenderTable';
import { loadAllCalendar, deleteCalendar } from './../redux/actions/calendarActions';
import auth from '../services/authService';
// import { paginate } from './../utils/paginate';

class CalenderDetail extends Component {
  state = {
    showForm: false,
    holidayCalendar: {},
    sortColumn: { path: 'start_date', order: 'asc' }
  };

  componentDidMount() {
    const { loadAllCalendar } = this.props;
    loadAllCalendar();
  }

  handleDelete = async calendar => {
    await this.props.deleteCalendar(calendar);
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  pageDetail = {
    currentPage: 1,
    pageSize: 15
  };

  render() {
    const userAuth = auth.getCurrentUser().role === 'admin';
    const { sortColumn } = this.state;
    const { calendars: calendarLists } = this.props;
    const calendars = _.orderBy(calendarLists, [sortColumn.path], [sortColumn.order]);
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-5'>
            <h2>Holiday Calendar</h2>
          </div>

          <div className='col'>
            {userAuth && (
              <Link className='btn btn-primary btn-sm m-2 pull-right' to='/calendar/new'>
                Add Holiday
              </Link>
            )}
          </div>
        </div>
        <CalenderTable
          holidayCalendar={calendars}
          onDelete={this.handleDelete}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    calendars: state.calendars,
    loading: state.apiCallInProgress > 0
  };
}

const mapDispatchToProps = {
  loadAllCalendar,
  deleteCalendar
};

export default connect(mapStateToProps, mapDispatchToProps)(CalenderDetail);
