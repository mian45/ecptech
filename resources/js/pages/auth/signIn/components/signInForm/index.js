import { Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./styles.module.scss";
import eyeSvg from "../../../../../../images/eye.svg";
import eyeCloseSvg from "../../../../../../images/eye-close.svg";
import CustomCheckbox from "../../../../../components/customCheckbox";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../../../../../services";
import { useHistory } from "react-router";
import {
    HOME_ROUTE,
    INVOICES_ROUTE,
} from "../../../../../appRoutes/routeConstants";
import Icon from '@ant-design/icons';

const EyeSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
        <g id="Group_4" data-name="Group 4" transform="translate(-0.945 -0.945)">
            <rect id="Rectangle_244" data-name="Rectangle 244" width="30" height="30" transform="translate(0.945 0.945)" fill="none"/>
            <line id="Line_34" data-name="Line 34" x2="2.857" y2="4.948" transform="translate(25.107 15.858)" fill="none" stroke="#a1a1a1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <line id="Line_35" data-name="Line 35" x2="0.891" y2="5.053" transform="translate(19.224 18.608)" fill="none" stroke="#a1a1a1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <line id="Line_36" data-name="Line 36" x1="0.891" y2="5.054" transform="translate(11.763 18.605)" fill="none" stroke="#a1a1a1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <line id="Line_37" data-name="Line 37" x1="2.871" y2="4.972" transform="translate(3.907 15.854)" fill="none" stroke="#a1a1a1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <path id="Path_26" data-name="Path 26" d="M32,104.875a15.2,15.2,0,0,0,24.048,0" transform="translate(-28.079 -91.827)" fill="none" stroke="#a1a1a1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </g>
    </svg>
);

const EyeCloseSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
        <g id="Group_4" data-name="Group 4" transform="translate(-0.945 -0.945)">
            <rect id="Rectangle_244" data-name="Rectangle 244" width="30" height="30" transform="translate(0.945 0.945)" fill="none"/>
            <line id="Line_34" data-name="Line 34" y1="4.948" x2="2.857" transform="translate(25.107 10.187)" fill="none" stroke="#a1a1a1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <line id="Line_35" data-name="Line 35" y1="5.053" x2="0.891" transform="translate(19.225 7.332)" fill="none" stroke="#a1a1a1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <line id="Line_36" data-name="Line 36" x1="0.891" y1="5.054" transform="translate(11.764 7.334)" fill="none" stroke="#a1a1a1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <line id="Line_37" data-name="Line 37" x1="2.871" y1="4.972" transform="translate(3.908 10.167)" fill="none" stroke="#a1a1a1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <path id="Path_26" data-name="Path 26" d="M32,110.777a15.2,15.2,0,0,1,24.047,0" transform="translate(-28.078 -92.833)" fill="none" stroke="#a1a1a1" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <g id="Ellipse_22" data-name="Ellipse 22" transform="translate(11.945 16.945)" fill="#fff" stroke="#a1a1a1" stroke-width="1.5">
                <circle cx="4" cy="4" r="4" stroke="none"/>
                <circle cx="4" cy="4" r="3.25" fill="none"/>
            </g>
        </g>
    </svg>
);

const EyeIcon = (props) => <Icon component={EyeSVG} {...props} />;
const EyeCloseIcon = (props) => <Icon component={EyeCloseSVG} {...props} />;

const SignInForm = ({ userRole, dispatch }) => {
    const history = useHistory();
    const [isShowPassword, setShowPassword] = useState(false);

    const handleClick = async (values) => {
        try {
            await dispatch(AuthService.login(values));
            if (userRole === "staff") {
                history.push(INVOICES_ROUTE);
                return;
            } else {
                history.push(HOME_ROUTE);
            }
        } catch (err) {
            console.log("error while login");
        }
    };
    const onFinish = async (values) => {
        await dispatch(AuthService.login(values));
        if (userRole === "staff") {
            history.push(INVOICES_ROUTE);
            return;
        } else {
            history.push(HOME_ROUTE);
        }
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Formik
            initialValues={LoginInitialValues}
            validationSchema={LoginValidation}
            onSubmit={handleClick}
        >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                isValid,
                dirty,
            }) => {
                return (
                    <>

                        <div className={classes["login-title"]}>
                            Log in
                        </div>
                        <div className={classes["login-subtitle"]}>
                            Welcome to Urban Optics. Please put your
                            login credentials below to start using the
                            app.
                        </div>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className={classes["login-form"]}>
                                <div className={classes["login-wrapper"]}>
                                    <div className={classes["label"]}>
                                        Email
                                    </div>
                                    <div className={classes["error-input"]}>
                                        <input
                                            className={classes["email-input"]}
                                            id="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <ErrorMessage
                                            name={"email"}
                                            component="div"
                                            className={classes["error"]}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={classes["login-wrapper"]}
                                    style={{ marginTop: "30px" }}
                                >
                                    <div className={classes["label"]}>
                                        Password
                                    </div>
                                    <div className={classes["error-input"]}>
                                        <div
                                            className={
                                                classes["password-container"]
                                            }
                                        >
                                            <input
                                                className={
                                                    classes["password-input"]
                                                }
                                                type={
                                                    isShowPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <img
                                                src={
                                                    isShowPassword
                                                        ? eyeSvg
                                                        : eyeCloseSvg
                                                }
                                                alt={"icon"}
                                                className={classes["eye-icon"]}
                                                onClick={() =>
                                                    setShowPassword(
                                                        !isShowPassword
                                                    )
                                                }
                                            />
                                        </div>
                                        <ErrorMessage
                                            name={"password"}
                                            component="div"
                                            className={classes["error"]}
                                        />
                                    </div>
                                </div>

                                <div className={classes["forgot-password"]}>
                                    Forgot Password?
                                </div>
                                <div className={classes["divider"]} />
                                <div className={classes["submit-wrapper"]}>
                                    <CustomCheckbox
                                        style={{ transform: "scale(1.2)" }}
                                        label={"Remember me"}
                                        defaultChecked={
                                            values?.remember || false
                                        }
                                        onValueChange={(e) =>
                                            setFieldValue("remember", e)
                                        }
                                        id="remember"
                                        name="remember"
                                        labelClass={classes["checkbox"]}
                                        containerClass={
                                            classes["checkbox-container"]
                                        }
                                    />
                                    <button
                                        disabled={!(isValid && dirty)}
                                        className={classes["submit-button"]}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                        <Form
                            name="basic"
                            labelCol={{span: 6,}}
                            wrapperCol={{span: 19,}}
                            initialValues={{remember: true,}}
                            onFinish={handleClick}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Login"
                                labelAlign="left"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="large size"
                                    className="email-input"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                labelAlign="left"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="input password"
                                    iconRender={(visible) => (visible ? <EyeIcon/> : <EyeCloseIcon/>)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item

                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    userRole: state.Auth.userRole?.name,
});

export default connect(mapStateToProps)(SignInForm);

const LoginValidation = Yup.object().shape({
    email: Yup.string().email().required("Please enter a valid email address"),
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
