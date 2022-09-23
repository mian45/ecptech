import React from "react";
import { ErrorMessage } from "formik";
import CustomInput from "../customInput";
import classes from "./styles.module.scss";

const ChangePassword = ({ handleChange, handleBlur, values }) => {
    return (
        <div className={classes.container}>
            <div className={classes.title}>Change Password</div>
            <label className={classes.subtitle}>Enter Old Password</label>
            <CustomInput
                type={"password"}
                placeholder={"Old Password"}
                value={values.oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                id="oldPassword"
                name="oldPassword"
            />
            <ErrorMessage
                name="oldPassword"
                component="div"
                className={classes["error"]}
            />
            <label className={classes.subtitle}>Enter New Password</label>
            <CustomInput
                type={"password"}
                placeholder={"New Password"}
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                id="newPassword"
                name="newPassword"
            />
            <ErrorMessage
                name="newPassword"
                component="div"
                className={classes["error"]}
            />
            <label className={classes.subtitle}>Confirm New Password</label>
            <CustomInput
                type={"password"}
                placeholder={"Confirm New Password"}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                id="confirmPassword"
                name="confirmPassword"
            />
            <ErrorMessage
                name="confirmPassword"
                component="div"
                className={classes["error"]}
            />
        </div>
    );
};

export default ChangePassword;
