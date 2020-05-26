import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';
import * as Constants from '../constants/mainConstants';

const userAuth = auth.getCurrentUser();
const AdminRoute = ({ path, component: Component, render, ...rest }) => {
  const isAdmin = userAuth.role === Constants.ADMIN;
  const isHR = userAuth.role === Constants.HR;
  return (
    <Route
      {...rest}
      render={props => {
        if (isAdmin|| isHR) {
          return <Component {...props} />;
        } else
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default AdminRoute;
