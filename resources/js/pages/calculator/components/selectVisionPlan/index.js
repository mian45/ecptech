import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import classes from "./styles.module.scss";
import tickIcon from "../../../../../images/tick-green.svg";
import CustomRadio from "../../../../components/customRadio";
import visionIcon from "../../../../../images/calculator/vision.svg";
import { ErrorMessage } from "formik";
import { BenifitTypeEnums } from "../../data/initialValues";
import * as Yup from "yup";

const SelectVisionPlan = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
}) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const plansList = calculatorObj?.questions?.map((plan) => plan?.title);
    const handlePlanChange = (event) => {
        if (event?.target?.value === "Private Pay") {
            const validations = { ...calValidations };
            delete validations?.isloweredCopay;
            delete validations?.isLensBenifit;
            delete validations?.isFrameBenifit;
            setCalValidations({ ...validations });
            setFieldValue("benifitType", BenifitTypeEnums.both);
        } else {
            setFieldValue("benifitType", "");
            const validationObject = {};
            if (
                data?.find(
                    (ques) =>
                        ques.question === "Any copay lowered than standard"
                )?.optional === "true"
            ) {
                validationObject.isloweredCopay =
                    Yup.string().required("Option is required");
            }
            if (
                data?.find(
                    (ques) => ques.question === "Frame Benefit Available"
                )?.optional === "true"
            ) {
                validationObject.isFrameBenifit = Yup.string().required(
                    "Frame benefit is required"
                );
            }
            if (
                data?.find(
                    (ques) => ques.question === "Lens Benefit Available"
                ) === "true"
            ) {
                validationObject.isLensBenifit = Yup.string().required(
                    "Lens benefit is required"
                );
            }
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        }
        handleChange(event);
    };

    const visionPlan = () => {
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
                        onChange={handlePlanChange}
                        value={values?.visionPlan}
                        className={classes["radio-group"]}
                        id="visionPlan"
                        name="visionPlan"
                    >
                        {plansList?.map((plan, index) => {
                            return (
                                <CustomRadio
                                    headClass={classes["radio"]}
                                    key={index}
                                    label={plan}
                                    value={plan}
                                    active={values?.visionPlan === plan}
                                />
                            );
                        })}
                    </Radio.Group>
                    <FormikError name={"visionPlan"} />
                </div>
            </div>
        );
    };
    const renderVisionPlan = () => {
        const permission = calculatorObj?.questions
            ?.find((item) => item.title === values?.visionPlan)
            ?.question_permissions?.find(
                (ques) => ques.question === "Select Vision Plan"
            )?.visibility;
        if (permission) return visionPlan();
        else {
            return null;
        }
    };
    return renderVisionPlan();
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
            name={name}
            component="div"
            className={classes["error"]}
        />
    );
};
