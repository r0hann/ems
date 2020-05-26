import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';
import * as Constants from '../constants/mainConstants';

const userAuth = auth.getCurrentUser();
const ProfileRoute = ({ path, component: Component, render, location, ...rest }) => {
  const isAdmin = userAuth.role === Constants.ADMIN;
  const paramId = location.pathname.split('/')[2];
  return (
    <Route
      {...rest}
      render={props => {
        if (isAdmin || paramId == userAuth.sub) {
          return <Component {...props} />;
        } else return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }}
    />
  );
};

export default ProfileRoute;
