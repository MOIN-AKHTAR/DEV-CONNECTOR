import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
const mapStateToProps = State => ({
  auth: State.auth
});
export default connect(mapStateToProps)(PrivateRoute);
