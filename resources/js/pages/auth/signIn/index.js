import { Col, Row } from 'antd';
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { HOME_ROUTE, INVOICES_ROUTE } from "../../../appRoutes/routeConstants";
import SignInForm from "./components/signInForm";
import SignInSlider from "./components/signInSlider";
import classes from "./styles.module.scss";
import logo from "../../../../images/logo.png";

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
        <>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={24}>
                            <img
                                src={logo}
                                alt="logo"
                                className={classes["page-logo"]}
                            />
                        </Col>
                    </Row>
                    <Row justify="space-around" align="middle">
                        <SignInForm />
                    </Row>
                </Col>
                <Col span={12}>
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
