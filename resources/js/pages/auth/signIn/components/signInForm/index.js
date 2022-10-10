import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./styles.module.scss";
import eyeIcon from "../../../../../../images/eye.svg";
import CustomCheckbox from "../../../../../components/customCheckbox";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../../../../../services";
import { useHistory } from "react-router";
import {
    HOME_ROUTE,
    INVOICES_ROUTE,
} from "../../../../../appRoutes/routeConstants";
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
    return (
        <div className={classes["container"]}>
            <img src="logo.png" alt="logo" className={classes["page-logo"]} />
            <div className={classes["login-title"]}>Log in</div>
            <div className={classes["login-subtitle"]}>
                Welcome to Urban Optics. Please put your login credentials below
                to start using the app.
            </div>
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
                                            autoComplete={"off"}
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
                                                autocomplete="new-password"
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
                                                src={eyeIcon}
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
                                        disabled={
                                            !(isValid && dirty) || isSubmitting
                                        }
                                        className={classes["submit-button"]}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    userRole: state.Auth.userRole?.name,
});

export default connect(mapStateToProps)(SignInForm);

const LoginValidation = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
        .min(6, "Must have 6 characters")
        .max(15, "Maximum 15 charecter allowed")
        .required("Password is Required"),
});

const LoginInitialValues = {
    email: "",
    password: "",
    dob: "",
    remember: false,
};
