import React from "react";
import { ErrorMessage } from "formik";
import ButtonComponent from "../Button";
import InputField from "../inputField";
import classes from "./styles.module.scss";

const InvoicesForm = ({ formProps, isSearched, handleSearch }) => {
    const { values, handleChange, handleBlur, isSubmitting, isValid, dirty } =
        formProps;
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                />

                <InputField
                    className={classes["input"]}
                    label={"Last Name"}
                    placeholder={"Enter last name"}
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    onBlur={handleBlur}
                    type={"number"}
                />
            </div>
            <div className={classes["form-slot-button"]}>
                <ButtonComponent
                    className={classes["search-button"]}
                    type={"button"}
                    disabled={!(isValid && dirty) || isSubmitting || isSearched}
                    onClick={() => handleSearch(values)}
                >
                    Search Invoices
                </ButtonComponent>
                <ButtonComponent
                    disabled={!(isValid && dirty) || !isSearched}
                    type={"submit"}
                >
                    Create New Glasses Estimates
                </ButtonComponent>
            </div>
        </div>
    );
};

export default InvoicesForm;
