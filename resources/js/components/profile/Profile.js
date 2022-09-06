import React from "react";
import "./profil.scss";
import PhotoUpload from "./PhotoUpload.js";
import ColorTheme from "../colorTheme";
import ChangePassword from "../changePassword";
import CustomButton from "../customButton";
import { Formik } from "formik";
import * as Yup from "yup";

const defaultPasswordState = {
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
        //success case
    };
    return (
        <div className="profile">
            <Formik
                initialValues={{
                    ...defaultPasswordState,
                }}
                validationSchema={profileValidations}
                onSubmit={handleClick}
            >
                {({ values, handleChange, handleSubmit, handleBlur }) => {
                    return (
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="busniss-info">
                                <p className="busniess-label">
                                    Business Information
                                </p>
                                <PhotoUpload />
                                <div>
                                    <label>Business Name</label>
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Enter business name"
                                        className="business-name"
                                    />
                                </div>
                            </div>
                            <ColorTheme />
                            <ChangePassword
                                values={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                            />
                            <div className="save-button">
                                <CustomButton
                                    onClick={handleSubmit}
                                    type={"submit"}
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
    oldPassword: Yup.string()
        .min(8, "Must have 8 characters")
        .max(15, "Enter maximum 15 charecter")
        .required("Must have 8 characters"),
    newPassword: Yup.string()
        .min(8, "Must have 8 characters")
        .max(15, "Enter maximum 15 charecter")
        .required("Must have 8 characters"),
    confirmPassword: Yup.string()
        .min(8, "Must have 8 characters")
        .max(15, "Enter maximum 15 charecter")
        .required("Must have 8 characters"),
});
