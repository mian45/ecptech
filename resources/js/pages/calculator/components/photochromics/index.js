import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import icon from "../../../../../images/calculator/photochromics.svg";

const Photochromics = ({ formProps }) => {
    const { values, handleChange, handleBlur } = formProps;

    const handleActiveState = () => {
        if (values?.isPhotochromics === "No") {
            return true;
        } else {
            if (values?.photochromicsType) {
                return true;
            }
            return false;
        }
    };

    return (
        <div className={classes["container"]}>
            <QuestionIcon icon={icon} active={handleActiveState()} />
            <div className={classes["vision-container"]}>
                <CalculatorHeading
                    title="Photochromics?"
                    active={handleActiveState()}
                />
                <Radio.Group
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.isPhotochromics}
                    id="isPhotochromics"
                    name="isPhotochromics"
                    className={classes["radio-group"]}
                >
                    <CustomRadio
                        label={"Yes"}
                        value={"Yes"}
                        active={values?.isPhotochromics === "Yes"}
                    />
                    <CustomRadio
                        label={"No"}
                        value={"No"}
                        active={values?.isPhotochromics === "No"}
                    />
                </Radio.Group>
                <FormikError name={"isPhotochromics"} />
                {values?.isPhotochromics === "Yes" && (
                    <>
                        <div className={classes["label"]}>
                            Select Photochromics
                        </div>
                        <Radio.Group
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.photochromicsType}
                            id="photochromicsType"
                            name="photochromicsType"
                            className={classes["radio-group"]}
                        >
                            {PHOTOCHROMICS_VALUES.map((value, index) => {
                                return (
                                    <CustomRadio
                                        key={index}
                                        label={value}
                                        value={value}
                                        headClass={classes["radio"]}
                                        active={
                                            values?.photochromicsType === value
                                        }
                                    />
                                );
                            })}
                        </Radio.Group>
                        <FormikError name={"photochromicsType"} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Photochromics;

const PHOTOCHROMICS_VALUES = [
    "Transition Signature",
    "Transition XTRActive",
    "SunSync / Drive XT",
    "SunSync Elite / Elite XT",
    "Sensity Photochromic",
    "ZEISS Photofusion",
];
