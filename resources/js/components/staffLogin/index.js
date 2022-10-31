import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { connect } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../../services";

const defaultValues = {
    email: "",
    password: "",
    confirmPassword:"",
};

const StaffLogin = ({ dispatch, clientUser, staffUser }) => {
    const [loginInitialValues, setInitialValues] = useState(defaultValues);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (staffUser?.id) {
            const editValues = {
                email: staffUser?.email,
                password: "",
            };
            setInitialValues(editValues);
        }
    }, []);

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
        if (staffUser?.id) {
            updateStaff(values);
        } else {
            createNewStaff(values);
        }
        setIsEdit(false);
    };
    const handleEdit = () => {
        if (isEdit) {
            setIsEdit(false);
        } else {
            setIsEdit(true);
        }
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["title"]}>Staff Login</div>
            <Formik
                initialValues={loginInitialValues}
                validationSchema={LoginValidation}
                onSubmit={handleClick}
                enableReinitialize={true}
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
                                        disabled={!isEdit && staffUser?.id}
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
                                        placeholder="Enter Password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={!isEdit && staffUser?.id}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className={classes["error"]}
                                    />
                                </div>
                            </div>
                            <div className={classes["sub-container"]}>
                              
                                <div className={`${classes["input-wrapper"]} ${classes['margin-top-container']}`}>
                                    <div className={classes["subtitle"]}>
                                        Confirm Password
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={values.confirmPassword}
                                        className={classes["input"]}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={!isEdit && staffUser?.id}
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="div"
                                        className={classes["error"]}
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className={classes["button"]}
                                    disabled={!isEdit && staffUser?.id}
                                >
                                    {staffUser?.id ? "Update" : "Save"}
                                </button>
                                {staffUser?.id && (
                                    <button
                                        type="button"
                                        className={classes["edit-button"]}
                                        onClick={handleEdit}
                                    >
                                        {isEdit ? "Cancel" : "Edit"}
                                    </button>
                                )}
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
});

export default connect(mapStateToProps)(StaffLogin);

const LoginValidation = Yup.object().shape({
    email: Yup.string().email().required("Please enter a valid email address"),
    password: Yup.string()
        .min(8, "Password must have 8 characters")
        .required("Please enter a valid password")
        .test("isValidPass", "must have UpperCase Letter", (value, context) => {
            const hasUpperCase = /[A-Z]/.test(value);
            let validConditions = 0;
            const numberOfMustBeValidConditions = 1;
            const conditions = [hasUpperCase];
            conditions.forEach((condition) =>
              condition ? validConditions++ : null
            );
            if (validConditions >= numberOfMustBeValidConditions) {
              return true;
            }
            return false;
          })
        .test("isValidPass", "must have LowerCase Letter", (value, context) => {
            const hasLowerCase = /[a-z]/.test(value);
            let validConditions = 0;
            const numberOfMustBeValidConditions = 1;
            const conditions = [hasLowerCase];
            conditions.forEach((condition) =>
              condition ? validConditions++ : null
            );
            if (validConditions >= numberOfMustBeValidConditions) {
              return true;
            }
            return false;
          })
        .test("isValidPass", "must have Numbers", (value, context) => {
            const hasNumber = /[0-9]/.test(value);
           
            let validConditions = 0;
            const numberOfMustBeValidConditions = 1;
            const conditions = [hasNumber];
            conditions.forEach((condition) =>
              condition ? validConditions++ : null
            );
            if (validConditions >= numberOfMustBeValidConditions) {
              return true;
            }
            return false;
          })
        .test("isValidPass", "must have Symbole", (value, context) => {
            const hasSymbole = /[!@#%&]/.test(value);
            let validConditions = 0;
            const numberOfMustBeValidConditions = 1;
            const conditions = [hasSymbole];
            conditions.forEach((condition) =>
              condition ? validConditions++ : null
            );
            if (validConditions >= numberOfMustBeValidConditions) {
              return true;
            }
            return false;
          }),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required'),
});
