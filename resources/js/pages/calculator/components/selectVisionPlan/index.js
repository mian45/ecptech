import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import classes from "./styles.module.scss";
import tickIcon from "../../../../../images/tick-green.svg";
import CustomRadio from "../../../../components/customRadio";
import visionIcon from "../../../../../images/calculator/vision.svg";
import { ErrorMessage } from "formik";

const SelectVisionPlan = ({ formProps }) => {
    const { values, handleChange, handleBlur } = formProps;
    return (
        <div className={classes["container"]}>
            <QuestionIcon icon={visionIcon} active={values?.visionPlan} />
            <div className={classes["vision-container"]}>
                <CalculatorHeading
                    title="Select Vision Plan"
                    active={values?.visionPlan}
                />
                <Radio.Group
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.visionPlan}
                    className={classes["radio-group"]}
                    id="visionPlan"
                    name="visionPlan"
                >
                    <CustomRadio
                        label={"VSP Signature"}
                        value={"VSP Signature"}
                        active={values?.visionPlan === "VSP Signature"}
                    />
                    <CustomRadio
                        label={"VSP Choice"}
                        value={"VSP Choice"}
                        active={values?.visionPlan === "VSP Choice"}
                        disabled={true}
                    />
                    <CustomRadio
                        label={"VSP Advantage"}
                        value={"VSP Advantage"}
                        active={values?.visionPlan === "VSP Advantage"}
                        disabled={true}
                    />
                    <CustomRadio
                        label={"Eyemed"}
                        value={"Eyemed"}
                        active={values?.visionPlan === "Eyemed"}
                        disabled={true}
                    />
                </Radio.Group>
                <FormikError name={"visionPlan"} />
            </div>
        </div>
    );
};

export default SelectVisionPlan;

export const CalculatorHeading = ({ title, active }) => {
    return (
        <div className={classes["heading"]}>
            <span>{title}</span>{" "}
            {active && (
                <img
                    src={tickIcon}
                    alt="icon"
                    className={classes["green-icon"]}
                />
            )}
        </div>
    );
};

export const FormikError = ({ name }) => {
    return (
        <ErrorMessage
            name={"dob"}
            component="div"
            className={classes["error"]}
        />
    );
};
