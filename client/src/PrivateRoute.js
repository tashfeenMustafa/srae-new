import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={( props ) => (
      Auth.isAuthenticated === true 
        ? <Component {...props} />
        : (<Redirect 
            to={{
              pathname: '/sign-in',
              state: { from: props.location }
            }} />)
    )}/>
);

export default PrivateRoute