import React from "react";
import { connect } from "react-redux";
import classes from "./profile.module.scss";
import PhotoUpload from "./photoUpload/index.js";
import ColorTheme from "../colorTheme";
import ChangePassword from "../changePassword";
import CustomButton from "../customButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { Row, Col, Drawer, message } from "antd";
import Axios from "../../Http";
const Profile = ({
    userId,
    closeModal,
    user,
    userRole,
    open,
    getAuthentication,
}) => {
    return (
        <Drawer
            title=""
            placement={"right"}
            closable={false}
            open={open}
            key={"right"}
            onClose={closeModal}
            bodyStyle={{ padding: "24px 0px" }}
        >
            <Col
                className={`${classes["profile"]} ${
                    userRole === "staff" && classes["staff"]
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <ProfileInfoSection
                    userId={userId}
                    user={user}
                    getAuthentication={() => {
                        getAuthentication();
                    }}
                />
                {userRole !== "staff" && (
                    <ProfilePasswordValidations userId={userId} />
                )}
            </Col>
        </Drawer>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
    user: state.Auth.user,
    userRole: state.Auth.userRole?.name,
});
export default connect(mapStateToProps)(Profile);

const profileValidations = Yup.object().shape({
    profileImage: Yup.mixed().required("Image is Required"),
    businessName: Yup.string()
        .min(2, "Must have 3 characters")
        .required("Name is Required"),
});

const ProfileInfoSection = ({ userId, user, getAuthentication }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const defaultProfileState = {
        businessName: user?.buisnessName ? user?.buisnessName : "",
        profileImage: user?.logo || null,
        themeColor: user?.themeColor ? user?.themeColor : "#6FA5CB",
        themeType: (user?.themeType).toString() ? user?.themeType : 0,
    };

    const handleSaveClick = async (values, actions) => {
        try {
            const personalInfo = new FormData();
            user?.logo !== values?.profileImage &&
                personalInfo.append("logo", values?.profileImage);
            user?.buisnessName !== values?.businessName &&
                personalInfo.append("business_name", values?.businessName);
            user?.themeColor !== values?.themeColor &&
                personalInfo.append("theme_color", values?.themeColor);
            parseInt(user?.themeType) !== parseInt(values?.themeType) &&
                personalInfo.append(
                    "theme_mode",
                    values?.themeType?.toString()
                );
            personalInfo.append("userId", userId);

            const response = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/edit-profile`,
                personalInfo
            );
            getAuthentication();
            actions.setSubmitting(false);
            message.destroy();
            messageApi.open({
                type: "success",
                content: response.data.message,
                duration: 5,
                className: "custom-postion",
            });
        } catch (err) {
            message.destroy();
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
            });
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
        handleSaveClick(values, actions);
    };
    return (
        <Formik
            initialValues={{
                ...defaultProfileState,
            }}
            validationSchema={profileValidations}
            onSubmit={handleClick}
            enableReinitialize
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
                        <div>{contextHolder}</div>
                        <PhotoUpload
                            values={values}
                            handleChange={(e) => {
                                handleChange(e);
                            }}
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
    const [messageApi, contextHolder] = message.useMessage();
    const defaultPasswordState = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const handleSaveClick = async (values, actions) => {
        try {
            const passwordObject = {
                old_password: values.oldPassword,
                password: values.newPassword,
                password_confirmation: values.confirmPassword,
                user_id: userId,
            };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/change-password`,
                passwordObject
            );
            message.destroy();
            messageApi.open({
                type: "success",
                content: res?.data?.message,
                duration: 5,
                className: "custom-postion",
            });
            actions?.resetForm();
        } catch (err) {
            actions?.setSubmitting(false);
            actions?.resetForm();
            message.destroy();
            messageApi.open({
                type: "error",
                content: err?.response?.data?.message,
                duration: 5,
                className: "custom-postion-error",
            });
        }
    };

    const handleClick = (values, actions) => {
        if (values.newPassword !== values.confirmPassword) {
            actions.setFieldError("newPassword", "Password must match");
            return;
        }

        handleSaveClick(values, actions);
    };
    return (
        <div style={{ width: "100%" }}>
            <div>{contextHolder}</div>
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
