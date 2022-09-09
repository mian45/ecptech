import React from "react";
import classes from "./profile.module.scss";
import PhotoUpload from "./photoUpload/index.js";
import ColorTheme from "../colorTheme";
import ChangePassword from "../changePassword";
import CustomButton from "../customButton";
import { Formik } from "formik";
import * as Yup from "yup";

const defaultPasswordState = {
    businessName: "",
    profileImage: null,
    themeColor: "#6FA5CB",
    themeType: 0,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
};
const Profile = () => {
    const handleClick = (values, actions) => {
        if (values.newPassword !== values.confirmPassword) {
            actions.setFieldError("newPassword", "Password must match");
            return;
        }
        if (
            !values.themeColor.match(
                /#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})/g
            )
        ) {
            actions.setFieldError("themeColor", "Invalid color code");
            return;
        }
        //success case
        console.log("values", values);
    };
    return (
        <div className={classes["profile"]}>
            <Formik
                initialValues={{
                    ...defaultPasswordState,
                }}
                validationSchema={profileValidations}
                onSubmit={handleClick}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    setFieldValue,
                    setFieldError,
                    isSubmitting,
                }) => {
                    return (
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <PhotoUpload
                                values={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                setFieldError={setFieldError}
                            />
                            <div className={classes["divider"]} />
                            <ColorTheme
                                values={values}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                            />
                            <div className={classes["divider"]} />
                            <ChangePassword
                                values={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                            />
                            <div className={classes["save-button"]}>
                                <CustomButton
                                    onClick={handleSubmit}
                                    type={"submit"}
                                    disabled={isSubmitting}
                                >
                                    Save
                                </CustomButton>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default Profile;

const profileValidations = Yup.object().shape({
    profileImage: Yup.mixed().required("Image is Required"),
    businessName: Yup.string()
        .min(2, "Must have 3 characters")
        .required("Name is Required"),
    oldPassword: Yup.string()
        .min(8, "Must have 8 characters")
        .max(15, "Enter maximum 15 charecter")
        .required("Password is Required"),
    newPassword: Yup.string()
        .min(8, "Must have 8 characters")
        .max(15, "Enter maximum 15 charecter")
        .required("Password is Required"),
    confirmPassword: Yup.string()
        .min(8, "Must have 8 characters")
        .max(15, "Enter maximum 15 charecter")
        .required("Password is Required"),
});
