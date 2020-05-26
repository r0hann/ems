import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const userAuth = auth.getCurrentUser();
const LoggedInRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (userAuth) {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        } else return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default LoggedInRoute;
