import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as UrlConst from '../constants/urlConstants';
import LeaveTypeForm from '../leaveTypeForm';
import LeaveTypeDetail from '../leaveTypeDetail';
import LeaveBalanceDetail from '../leaveBalanceDetail';
import LeaveBalanceAssignForm from '../leaveBalanceAssignForm';
import LeaveApplicationList from '../leaveApplicationList';
import AdminRoute from './adminRoute';

class LeaveRouteComponent extends Component {
  render() {
    return (
      <Switch>
        <AdminRoute path={UrlConst.LEAVE_TYPE_FORM_ID_URL} component={LeaveTypeForm} />
        <AdminRoute path={'/leave/typedetail/:id'} component={LeaveTypeDetail} />
        <AdminRoute path={UrlConst.LEAVE_TYPE_DETAIL_URL} component={LeaveTypeDetail} />
        <AdminRoute path={UrlConst.LEAVE_BALANCE_DETAIL_URL} component={LeaveBalanceDetail} />
        <AdminRoute
          path={UrlConst.LEAVE_BALANCE_ASSIGN_URL}
          component={LeaveBalanceAssignForm}
        />
        <Route path='/leave/applicationdetail' component={LeaveApplicationList} />
      </Switch>
    );
  }
}

export default LeaveRouteComponent;
