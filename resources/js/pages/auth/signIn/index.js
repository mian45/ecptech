import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { HOME_ROUTE, INVOICES_ROUTE } from "../../../appRoutes/routeConstants";
import SignInForm from "./components/signInForm";
import SignInSlider from "./components/signInSlider";
import classes from "./styles.module.scss";
import logo from "../../../../images/logo.png";
import { Col, Row } from "antd";

const SignIn = ({ isAuthenticated, userRole, tempSet, templogout }) => {
    const history = useHistory();
    const [darkTheme, setDarkTheme] = useState(false);
    useEffect(() => {
        if (isAuthenticated && templogout !== "true") {
            if (userRole === "staff") {
                history.push(INVOICES_ROUTE);
            } else {
                history.push(HOME_ROUTE);
            }
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root?.style.setProperty("--text-color", darkTheme ? "#fff" : "#262833");
        root?.style.setProperty(
            "--login-background-color",
            darkTheme ? "#6FA5CB" : "#F9F9FB"
        );
        root?.style.setProperty(
            "--slider-background-color",
            darkTheme ? "#F9F9FB" : "#6FA5CB"
        );
    }, [darkTheme]);
    return (
        <>
            <Row className={classes["container-logo"]}>
                <Col xs={24}>
                    <img
                        src={logo}
                        alt="logo"
                        className={classes["page-logo"]}
                    />
                </Col>
            </Row>
            <Row justify="center" align="middle">
                <Col
                    span={12}
                    className={classes["container"]}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                >
                    <Row justify="space-around" align="middle">
                        <SignInForm
                            tempSet={(e) => {
                                tempSet(e);
                            }}
                            templogout={templogout}
                        />
                    </Row>
                </Col>
                <Col
                    span={12}
                    className={classes["slider-section"]}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                >
                    <Row justify="space-around" align="middle">
                        <SignInSlider />
                    </Row>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    userRole: state.Auth.userRole?.name,
});

export default connect(mapStateToProps)(SignIn);
