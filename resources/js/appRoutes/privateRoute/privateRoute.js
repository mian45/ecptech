import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { LOGIN_ROUTE } from "../routeConstants";

const PrivateRoute = ({ component, exact, path, isAuthenticated }) => {
    return (
        <React.Fragment>
            {isAuthenticated ? (
                <Route exact={exact} path={path} component={component} />
            ) : (
                <Redirect to={LOGIN_ROUTE} />
            )}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
