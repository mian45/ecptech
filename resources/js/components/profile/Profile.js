import React from "react";
import { connect } from "react-redux";
import classes from "./profile.module.scss";
import PhotoUpload from "./photoUpload/index.js";
import ColorTheme from "../colorTheme";
import ChangePassword from "../changePassword";
import CustomButton from "../customButton";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const defaultPasswordState = {
    businessName: "",
    profileImage: null,
    themeColor: "#6FA5CB",
    themeType: 0,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
};
const Profile = ({ userId }) => {
    const handleSaveClick = async (values) => {
        try {
            const personalInfo = {
                logo: values.profileImage,
                business_name: values.businessName,
                theme_color: values.themeColor,
                theme_mode: values.themeType,
                user_id: userId,
            };
            const passwordObject = {
                old_password: values.oldPassword,
                password: values.newPassword,
                password_confirmation: values.confirmPassword,
                user_id: userId,
            };
            await axios.post("/api/editProfile", personalInfo);
            await axios.post("/api/changePassword", passwordObject);
        } catch (err) {
            console.log("error while save changes", err);
        }
    };

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
        handleSaveClick(values);
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
                    dirty,
                    isValid,
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
                                    disabled={
                                        !(isValid && dirty) || isSubmitting
                                    }
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

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
});
export default connect(mapStateToProps)(Profile);

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
