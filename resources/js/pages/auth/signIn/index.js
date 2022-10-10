import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { HOME_ROUTE, INVOICES_ROUTE } from "../../../appRoutes/routeConstants";
import SignInForm from "./components/signInForm";
import SignInSlider from "./components/signInSlider";
import classes from "./styles.module.scss";

const SignIn = ({ isAuthenticated, userRole }) => {
    const history = useHistory();
    useEffect(() => {
        if (isAuthenticated) {
            if (userRole === "staff") {
                history.push(INVOICES_ROUTE);
            } else {
                history.push(HOME_ROUTE);
            }
        }
    }, []);
    return (
        <div className={classes["container"]}>
            <div className={classes["login-section"]}>
                <SignInForm />
            </div>
            <div className={classes["slider-section"]}>
                <SignInSlider />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    userRole: state.Auth.userRole?.name,
});

export default connect(mapStateToProps)(SignIn);
