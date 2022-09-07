import React from "react";
import classes from "./styles.module.scss";
import { connect } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../../services";

const StaffLogin = ({
    dispatch,
    clientUser,
    isStaffAuthenticated,
    staffUser,
}) => {
    const createNewStaff = (values) => {
        const registerObject = {
            email: values.email,
            password: values.password,
            name: clientUser.name,
            clientId: clientUser.id,
            roleId: 3,
        };
        dispatch(AuthService.staffLogin(registerObject));
    };

    const updateStaff = (values) => {
        const staffObject = {
            email: values.email,
            password: values.password,
            id: staffUser.id,
        };
        dispatch(AuthService.updateStaffLogin(staffObject));
    };

    const handleClick = (values) => {
        if (isStaffAuthenticated) {
            updateStaff(values);
        } else {
            createNewStaff(values);
        }
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["title"]}>Staff Login</div>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={LoginValidation}
                onSubmit={handleClick}
            >
                {({ values, handleChange, handleSubmit, handleBlur }) => {
                    return (
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className={classes["sub-container"]}>
                                <div className={classes["input-wrapper"]}>
                                    <div className={classes["subtitle"]}>
                                        Email Address
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        className={classes["input"]}
                                        placeholder="Enter email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className={classes["error"]}
                                    />
                                </div>
                                <div className={classes["input-wrapper"]}>
                                    <div className={classes["subtitle"]}>
                                        Password
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={values.password}
                                        className={classes["input"]}
                                        name="password"
                                        placeholder="Enter password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className={classes["error"]}
                                    />
                                </div>
                            </div>
                            <div className="form-group ">
                                <button
                                    type="submit"
                                    className={classes["button"]}
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};
const mapStateToProps = (state) => ({
    clientUser: state.Auth.user,
    staffUser: state.Auth.staffUser,
    isStaffAuthenticated: state.Auth.isStaffAuthenticated,
});

export default connect(mapStateToProps)(StaffLogin);

const LoginValidation = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
        .min(8, "Must have 8 characters")
        .required("Password is required"),
});
