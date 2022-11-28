import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "./appRoutes/routes";
import Header from "./Header";
import SideBar from "./Side-bar";
import SignIn from "./pages/auth/signIn";
const AppRoot = ({ isAuthenticated }) => {
    const [templogout, setTempLogout] = useState(localStorage.getItem("temp"));
    useEffect(() => {
        setInterval(() => {
            setTempLogout(localStorage.getItem("temp"));
        }, 5000);
    }, []);
    return (
        <Router>
            {JSON.parse(templogout) === true ? (
                <SignIn
                    tempSet={(e) => {
                        setTempLogout(e);
                    }}
                    templogout={templogout}
                />
            ) : null}
            {isAuthenticated && JSON.parse(templogout) !== true ? (
                <Header />
            ) : null}
            {isAuthenticated && JSON.parse(templogout) !== true ? (
                <SideBar />
            ) : null}
            <div
                className={
                    JSON.parse(templogout) !== true ? "d-block" : "d-none"
                }
            >
                <Switch>
                    <Routes
                        tempSet={(e) => {
                            setTempLogout(e);
                        }}
                        templogout={templogout}
                    />
                </Switch>
            </div>
        </Router>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(AppRoot);
