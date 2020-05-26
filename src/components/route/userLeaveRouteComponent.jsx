import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import LeaveRequestForm from '../leaveRequestForm';
import UserLeaveAppDetail from '../userLeaveAppDetail';
import UserLeaveBalanceDetail from '../userLeaveBalanceDetail';
import * as UrlConst from '../constants/urlConstants';

class UserLeaveRouteComponent extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute
          path={UrlConst.USER_LEAVE_APP_DETAIL_URL}
          component={UserLeaveAppDetail}
        />
        <ProtectedRoute
          path={UrlConst.USER_LEAVE_BALANCE_DETAIL_URL}
          component={UserLeaveBalanceDetail}
        />
        <ProtectedRoute
          path={UrlConst.USER_LEAVE_REQUEST_URL}
          component={LeaveRequestForm}
        />
      </Switch>
    );
  }
}

export default UserLeaveRouteComponent;
