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

const Profile = ({ userId, closeModal,user }) => {
    return (
        <div className={classes["backdrop"]} onClick={closeModal}>
            <div
                className={`${classes["profile"]} ${
                    userRole === "staff" && classes["staff"]
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <ProfileInfoSection userId={userId} user={user}/>
                <ProfilePasswordValidations userId={userId} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
    user:state.Auth.user
});
export default connect(mapStateToProps)(Profile);

const profileValidations = Yup.object().shape({
    profileImage: Yup.mixed().required("Image is Required"),
    businessName: Yup.string()
        .min(2, "Must have 3 characters")
        .required("Name is Required"),
});

const ProfileInfoSection = ({ userId,user }) => {
    const defaultProfileState = {
        businessName: user?.buisnessName?user?.buisnessName:'',
        profileImage: null,
        themeColor: user?.themeColor?user?.themeColor:"#6FA5CB",
        themeType: 0,
    };

    const handleSaveClick = async (values) => {
        try {
            const personalInfo = new FormData();
            personalInfo.append("logo", values.profileImage);
            personalInfo.append("business_name", values.businessName);
            personalInfo.append("theme_color", values.themeColor);
            personalInfo.append("theme_mode", values.themeType);
            personalInfo.append("userId", userId);

            await axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/edit-profile`,
                personalInfo
            );
        } catch (err) {
            console.log("error while save changes", err);
        }
    };

    const handleClick = (values, actions) => {
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
        <Formik
            initialValues={{
                ...defaultProfileState,
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
                isValid,
                dirty,
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

                        <div className={classes["save-button"]}>
                            <CustomButton
                                onClick={handleSubmit}
                                type={"submit"}
                                disabled={!(isValid && dirty) || isSubmitting}
                            >
                                Save
                            </CustomButton>
                        </div>
                        <div className={classes["divider"]} />
                    </form>
                );
            }}
        </Formik>
    );
};

const passwordValidations = Yup.object().shape({
    oldPassword: Yup.string()
        .min(6, "Must have 6 characters")
        .max(15, "Enter maximum 15 charecter")
        .required("Password is Required"),
    newPassword: Yup.string()
        .min(6, "Must have 6 characters")
        .max(15, "Enter maximum 15 charecter")
        .required("Password is Required"),
    confirmPassword: Yup.string()
        .min(6, "Must have 6 characters")
        .max(15, "Enter maximum 15 charecter")
        .required("Password is Required"),
});
const ProfilePasswordValidations = ({ userId }) => {
    const defaultPasswordState = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const handleSaveClick = async (values) => {
        try {
            const passwordObject = {
                old_password: values.oldPassword,
                password: values.newPassword,
                password_confirmation: values.confirmPassword,
                user_id: userId,
            };
            await axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/change-password`,
                passwordObject
            );
        } catch (err) {
            console.log("error while save password", err);
        }
    };

    const handleClick = (values, actions) => {
        if (values.newPassword !== values.confirmPassword) {
            actions.setFieldError("newPassword", "Password must match");
            return;
        }

        handleSaveClick(values);
    };
    return (
        <div style={{ width: "100%" }}>
            <Formik
                initialValues={{
                    ...defaultPasswordState,
                }}
                validationSchema={passwordValidations}
                onSubmit={handleClick}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    isValid,
                    dirty,
                    isSubmitting,
                }) => {
                    return (
                        <form onSubmit={handleSubmit} autoComplete="off">
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
