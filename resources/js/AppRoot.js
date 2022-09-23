import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "./appRoutes/routes";
import Header from "./Header";
import SideBar from "./Side-bar";

const AppRoot = ({ isAuthenticated }) => {
    return (
        <div>
            <Router>
                {isAuthenticated && <Header />}
                {isAuthenticated && <SideBar />}
                <Switch>
                    <Routes />
                </Switch>
            </Router>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(AppRoot);
