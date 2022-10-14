import React from "react";
import { useEffect } from "react";
import { connect,useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "./appRoutes/routes";
import Header from "./Header";
import SideBar from "./Side-bar";
const AppRoot = ({ isAuthenticated }) => {
    return (

            <Router>
                {isAuthenticated && <Header />}
                {isAuthenticated && <SideBar />}
                <Switch>
                    <Routes />
                </Switch>
            </Router>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(AppRoot);
