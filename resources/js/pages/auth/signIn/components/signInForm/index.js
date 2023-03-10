import { Button, Checkbox, Col, Form, Input, Row, message } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./styles.module.scss";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../../../../../services";
import { useHistory } from "react-router";
import {
    HOME_ROUTE,
    INVOICES_ROUTE,
} from "../../../../../appRoutes/routeConstants";
import Icon from "@ant-design/icons";
import CustomLoader from "../../../../../components/customLoader";
import CustomCheckbox from "../../../../../components/customCheckbox";
import logo from "../../../../../../images/logo.png";
const EyeSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
    >
        <g
            id="Group_4"
            data-name="Group 4"
            transform="translate(-0.945 -0.945)"
        >
            <rect
                id="Rectangle_244"
                data-name="Rectangle 244"
                width="30"
                height="30"
                transform="translate(0.945 0.945)"
                fill="none"
            />
            <line
                id="Line_34"
                data-name="Line 34"
                x2="2.857"
                y2="4.948"
                transform="translate(25.107 15.858)"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            />
            <line
                id="Line_35"
                data-name="Line 35"
                x2="0.891"
                y2="5.053"
                transform="translate(19.224 18.608)"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            />
            <line
                id="Line_36"
                data-name="Line 36"
                x1="0.891"
                y2="5.054"
                transform="translate(11.763 18.605)"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            />
            <line
                id="Line_37"
                data-name="Line 37"
                x1="2.871"
                y2="4.972"
                transform="translate(3.907 15.854)"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            />
            <path
                id="Path_26"
                data-name="Path 26"
                d="M32,104.875a15.2,15.2,0,0,0,24.048,0"
                transform="translate(-28.079 -91.827)"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            />
        </g>
    </svg>
);

const EyeCloseSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
    >
        <g
            id="Group_4"
            data-name="Group 4"
            transform="translate(-0.945 -0.945)"
        >
            <rect
                id="Rectangle_244"
                data-name="Rectangle 244"
                width="30"
                height="30"
                transform="translate(0.945 0.945)"
                fill="none"
            />
            <line
                id="Line_34"
                data-name="Line 34"
                y1="4.948"
                x2="2.857"
                transform="translate(25.107 10.187)"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            />
            <line
                id="Line_35"
                data-name="Line 35"
                y1="5.053"
                x2="0.891"
                transform="translate(19.225 7.332)"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            />
            <line
                id="Line_36"
                data-name="Line 36"
                x1="0.891"
                y1="5.054"
                transform="translate(11.764 7.334)"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            />
            <line
                id="Line_37"
                data-name="Line 37"
                x1="2.871"
                y1="4.972"
                transform="translate(3.908 10.167)"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            />
            <path
                id="Path_26"
                data-name="Path 26"
                d="M32,110.777a15.2,15.2,0,0,1,24.047,0"
                transform="translate(-28.078 -92.833)"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            />
            <g
                id="Ellipse_22"
                data-name="Ellipse 22"
                transform="translate(11.945 16.945)"
                fill="#fff"
                stroke="#a1a1a1"
                stroke-width="1.5"
            >
                <circle cx="4" cy="4" r="4" stroke="none" />
                <circle cx="4" cy="4" r="3.25" fill="none" />
            </g>
        </g>
    </svg>
);

const EyeIcon = (props) => <Icon component={EyeSVG} {...props} />;
const EyeCloseIcon = (props) => <Icon component={EyeCloseSVG} {...props} />;

const SignInForm = ({ userRole, dispatch, tempSet, templogout }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [buttonLoader, setButtonLoader] = useState(false);
    const history = useHistory();
    const handleClick = async (values) => {
        setButtonLoader(true);
        try {
            message.destroy();
            await dispatch(AuthService.login(values, messageApi));
            if (JSON.parse(templogout) !== true) {
                if (userRole === "staff") {
                    history.push(INVOICES_ROUTE);
                    return;
                } else {
                    history.push(HOME_ROUTE);
                }
            }
            tempSet("false");
            setButtonLoader(false);
        } catch (err) {
            console.log("error while login");
            setButtonLoader(false);
        }
    };
    return (
        <>
           {contextHolder}
            <Formik
                initialValues={LoginInitialValues}
                validationSchema={LoginValidation}
                onSubmit={handleClick}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    handleBlur,
                    isSubmitting,
                    isValid,
                    dirty,
                }) => {
                    return (
                        <>
                            <Col xs={22} md={24} lg={18}>
                            <img
                        src={logo}
                        alt="logo"
                        className={classes["page-logo"]}
                    />
                            <div className={classes["login-title"]}>
                                    Log in
                                </div>
                                <div className={classes["login-subtitle"]}>
                                    Welcome to Urban Optics. Please put your
                                    login credentials below to start using the
                                    app.
                                </div>
                                <Form
                                    name="basic"
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 19 }}
                                    onFinish={handleSubmit}
                                    autoComplete="off"
                                    className={classes["form-width"]}
                                >
                                    <Row align="middle">
                                        <Col xs={24}>
                                            <Form.Item
                                                name="email"
                                                label="Email"
                                                labelAlign="left"
                                                labelCol={{
                                                    span: 5,
                                                }}
                                                wrapperCol={{
                                                    span: 20,
                                                }}
                                            >
                                                <Input
                                                    size="large"
                                                    name="email"
                                                    className={
                                                        classes["email-input"]
                                                    }
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />

                                                <ErrorMessage
                                                    name={"email"}
                                                    component="div"
                                                    className={classes["error"]}
                                                />
                                            </Form.Item>{" "}
                                        </Col>
                                    </Row>
                                    <Row align="middle">
                                        <Col xs={24}>
                                            <Form.Item
                                                name="password"
                                                label="Password"
                                                labelAlign="left"
                                                labelCol={{
                                                    span: 5,
                                                }}
                                                wrapperCol={{
                                                    span: 20,
                                                }}
                                                className={classes["form-Item"]}
                                            >
                                                <Input.Password
                                                    id="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    className={
                                                        classes[
                                                            "password-container"
                                                        ]
                                                    }
                                                    iconRender={(visible) =>
                                                        visible ? (
                                                            <EyeCloseIcon />
                                                        ) : (
                                                            <EyeIcon />
                                                        )
                                                    }
                                                />
                                                <ErrorMessage
                                                    name={"password"}
                                                    component="div"
                                                    className={classes["error"]}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row align="middle">
                                        <Col xs={24}>
                                            <div
                                                className={
                                                    classes["forgot-password"]
                                                }
                                            >
                                                Forgot Password?
                                            </div>
                                            <div
                                                className={classes["divider"]}
                                            />

                                            <Col
                                                xs={24}
                                                sm={24}
                                                md={24}
                                                lg={24}
                                                xl={24}
                                            >
                                                <Row justify="space-between">
                                                    <Col xs={12} 
                                                        className={
                                                            classes["chk-wrapper"]
                                                        } >
                                                        <CustomCheckbox
                                                            label="Remember me"
                                                            id="remember"
                                                            name="remember"
                                                            containerClass={
                                                                classes["tag-wrapper"]
                                                            } 
                                                            defaultChecked={
                                                                values?.remember ||
                                                                false
                                                            }
                                                            active={
                                                                values?.remember ||
                                                                false
                                                            }
                                                            c
                                                            onValueChange={(
                                                                e
                                                            ) =>
                                                                setFieldValue(
                                                                    "remember",
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    </Col>
                                                    <Col
                                                        xs={12}
                                                        className={
                                                            classes[
                                                                "btn-wrapper"
                                                            ]
                                                        }
                                                    >
                                                        <Button
                                                            type="primary"
                                                            htmlType="submit"
                                                            className={
                                                                isValid? classes[
                                                                "submit-button"
                                                                ]:classes[
                                                                    "submit-button-disabled"
                                                                    ]
                                                            }
                                                            disabled={!isValid}
                                                        >
                                                            {buttonLoader ===
                                                            true ? (
                                                                <span>
                                                                    <p>Login</p>
                                                                    <CustomLoader
                                                                        buttonBool={
                                                                            true
                                                                        }
                                                                    />
                                                                </span>
                                                            ) : (
                                                                "Login"
                                                            )}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row></Row>
                                </Form>
                            </Col>
                        </>
                    );
                }}
            </Formik>
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    userRole: state.Auth.userRole?.name,
});

export default connect(mapStateToProps)(SignInForm);

const LoginValidation = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email address").required("Email is required"),
    password: Yup.string()
        .min(6, "Must have 6 characters")
        .max(15, "Maximum 15 charecter allowed")
        .required("Please enter a valid password"),
});

const LoginInitialValues = {
    email: "",
    password: "",
    dob: "",
    remember: false,
};
