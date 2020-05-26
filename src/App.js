import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './components/route/protectedRoute';
import SignInForm from './components/signInForm';
import NotFound from './components/notFound';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './sidebar.css';
import _ from 'lodash';
import EmployeeDetails from './components/employeeDetails';
import Logout from './components/logout';
import auth from './services/authService';
import NavBar from './components/navbar';
import DepartmentForm from './components/departmentForm';
import DesignationForm from './components/designationForm';
import UserForm from './components/userForm';
import LinearLoading from './components/common/linearLoading';
import PropTypes from 'prop-types';
import ConfigDetail from './components/configDetails';
import DepartmentLists from './components/departmentLists';
import DesignationLists from './components/designationLists';
import CalendarDetail from './components/calenderDetail';
import UserProfile from './components/userProfile';
import HolidayCalendarForm from './components/holidayCalendarForm';
import { loadAllCalendar } from './redux/actions/calendarActions';
import LoggedInRoute from './components/route/loggedInRoute';
import * as UrlConst from './components/constants/urlConstants';
import UserLeaveRouteComponent from './components/route/userLeaveRouteComponent';
import LeaveRouteComponent from './components/route/leaveRouteComponent';
// import SpatialNavigation from 'spatial-navigation-js';
import { loadEmployeeDetail } from './redux/actions/employeeDetailActions';
import ProfileRoute from './components/route/profileRoute';

class App extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { toggle: true, holidayCalendar: null, username: '' };
  }

  // spatialNavigation = () => {
  //   window.addEventListener('load', () => {
  //     SpatialNavigation.init();
  //     SpatialNavigation.add({
  //       selector: '.focusable',
  //       straightOnly: false
  //     });
  //     SpatialNavigation.makeFocusable();
  //     SpatialNavigation.focus();
  //   });
  // };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    // this.spatialNavigation();
    this.setState({ user });
    if (user && !this.props.calendars.length > 0) {
      await this.props.loadEmployeeDetail(user.sub);
      const { employeeDetail } = this.props;
      this.setState({ username: employeeDetail.fname });
      this.props.loadAllCalendar();
      this.checkHoliday();
    }
  }

  /**
   *
   * @param {*} prevProps, previous props
   */
  componentDidUpdate(prevProps) {
    const { calendars } = this.props;
    if (!_.isEqual(prevProps.calendars, calendars)) this.checkHoliday();
  }

  checkHoliday = () => {
    const { calendars } = this.props;
    const todayDate = new Date().toISOString().slice(0, 10);
    let i = 0;
    while (calendars[i]) {
      this.setState({ holidayCalendar: null });
      if (todayDate >= calendars[i].start_date && todayDate <= calendars[i].end_date) {
        this.setState({ holidayCalendar: this.props.calendars[i] });
        break;
      }
      i++;
    }
  };

  handleToggle = event => {
    event.preventDefault();
    const toggle = !this.state.toggle;
    this.setState({ toggle });
  };

  render() {
    const { user, holidayCalendar, username } = this.state;
    // const {apiError} = this.props;
    return (
      <React.Fragment>
        {this.props.loading && <LinearLoading />}
        <ToastContainer autoClose={3000} hideProgressBar />
        <div className={this.state.toggle ? 'd-flex toggled' : 'd-flex'} id='wrapper'>
          {/* <SideBar /> */}
          <div id='page-content-wrapper'>
            {user && (
              <NavBar user={user} handleToggle={this.handleToggle} username={username} />
            )}

            <main className='container'>
              {user && holidayCalendar && (
                <div className='alert alert-warning' role='alert'>
                  {holidayCalendar.remarks} for {holidayCalendar.days} days, from{' '}
                  {holidayCalendar.nepali_date}
                </div>
              )}
              <Switch>
                <ProtectedRoute path='/logout' component={Logout} />
              </Switch>
              {/*{!apiError.error && (*/}
              <Switch>
                <ProtectedRoute path='/logout' component={Logout} />
                <LoggedInRoute path='/login' component={SignInForm} />
                <ProtectedRoute path='/config' component={ConfigDetail} />
                <ProtectedRoute path='/leave' component={LeaveRouteComponent} />
                <ProtectedRoute path='/user/leave' component={UserLeaveRouteComponent} />

                <ProtectedRoute path='/calendar/:id' component={HolidayCalendarForm} />
                <ProtectedRoute path='/calendar' component={CalendarDetail} />
                <ProtectedRoute path='/user/:id' component={UserForm} />
                <ProfileRoute path='/user-profile/:id/:slug' component={UserProfile} />
                {/* <ProtectedRoute path='/user-profile' component={UserProfile} /> */}
                <ProtectedRoute path='/department/:id' component={DepartmentForm} />
                <ProtectedRoute path='/designation/:id' component={DesignationForm} />
                <ProtectedRoute path='/department-lists' component={DepartmentLists} />
                <ProtectedRoute path='/designation-lists' component={DesignationLists} />
                <ProtectedRoute
                  path={UrlConst.EMPLOYEE_DETAIL_URL}
                  component={EmployeeDetails}
                />

                <Redirect from='/user-profile/:id' exact to={'/user-profile/:id/user'} />
                <Redirect from='/' exact to={UrlConst.EMPLOYEE_DETAIL_URL} />
                <NotFound />
              </Switch>
              {/*)}*/}
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    loading: state.apiCallInProgress > 0,
    apiError: state.apiError,
    calendars: state.calendars,
    employeeDetail: state.employeeDetail
  };
}

const mapDispatchToProps = {
  loadEmployeeDetail,
  loadAllCalendar
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
