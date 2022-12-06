import React from "react";
import { ErrorMessage } from "formik";
import ButtonComponent from "../Button";
import InputField from "../inputField";
import classes from "./styles.module.scss";

const InvoicesForm = ({ formProps, handleSearch }) => {
    const { values, handleChange, isSubmitting, isValid, dirty } = formProps;
    return (
        <div className={classes["container"]}>
            <div className={classes["form-slot"]}>
                <InputField
                    className={classes["input"]}
                    label={"First Name"}
                    placeholder={"Enter first name"}
                    id="firstName"
                    name="firstName"
                    value={values.firstName}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />

                <InputField
                    className={classes["input"]}
                    label={"Last Name"}
                    placeholder={"Enter last name"}
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
            </div>
            <div className={classes["form-slot"]}>
                <div className={classes["dob-wrapper"]}>
                    <div className={classes["dob-label"]}>Date of Birth</div>
                    <input
                        className={classes["dob-input"]}
                        type={"date"}
                        placeholder={"Enter date of birth"}
                        id="dob"
                        name="dob"
                        value={values.dob}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                    <ErrorMessage
                        name={"dob"}
                        component="div"
                        className={classes["error"]}
                    />
                </div>
                <InputField
                    className={classes["input"]}
                    label={"Email Address"}
                    placeholder={"Enter email address"}
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                <InputField
                    className={classes["input"]}
                    label={"Phone Number"}
                    placeholder={"Enter Phone (Optional)"}
                    id="phoneNo"
                    name="phoneNo"
                    value={values.phoneNo}
                    onChange={(e) => {
                        if (e.target.value.length <= 10) {
                            handleChange(e);
                        }
                    }}
                    type={"number"}
                />
            </div>
            <div className={classes["form-slot-button"]}>
                <ButtonComponent
                    className={classes["search-button"]}
                    disabled={
                        !(
                            values.firstName ||
                            values.lastName ||
                            values.dob ||
                            values.phoneNo ||
                            values.email
                        )
                    }
                    onClick={() => handleSearch(formProps)}
                    type={"button"}
                >
                    Search Invoices
                </ButtonComponent>
                <ButtonComponent disabled={!(isValid && dirty)} type={"submit"}>
                    Create New Glasses Estimate under the invoice search filter
                </ButtonComponent>
            </div>
        </div>
    );
};

export default InvoicesForm;
