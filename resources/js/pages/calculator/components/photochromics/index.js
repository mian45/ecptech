import React, { useState } from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import icon from "../../../../../images/calculator/photochromics.svg";
import * as Yup from "yup";

const Photochromics = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
}) => {
    const { values, handleChange, handleBlur } = formProps;
    const photochromicsVisibility = calculatorObj?.questions
        ?.find((item) => item.title === "VSP Signature")
        ?.question_permissions?.find(
            (ques) => ques.question === "Photochromics"
        )?.visibility;
    const [error, setError] = useState("");

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

    const handlePhotochromicsChange = (e) => {
        handleChange(e);
        if (
            e?.target?.value === "Yes" &&
            !data?.find((ques) => ques.question === "Photochromics")?.optional
        ) {
            const photochromicsType =
                Yup.string().required("Option is required");
            setCalValidations({
                ...calValidations,
                photochromicsType,
            });
        } else if (e?.target?.value === "No") {
            const validations = { ...calValidations };
            delete validations.photochromicsType;
            setCalValidations({
                ...validations,
            });
        }
        if (values.isCopayPhotochromic && e.target.value === "No") {
            setError("Are you sure? You don't want to avail discount");
        } else {
            setError("");
        }
    };

    return (
        <>
            {photochromicsVisibility ? (
                <div className={classes["container"]}>
                    <QuestionIcon icon={icon} active={handleActiveState()} />
                    <div className={classes["vision-container"]}>
                        <CalculatorHeading
                            title="Photochromics?"
                            active={handleActiveState()}
                        />
                        <Radio.Group
                            onBlur={handleBlur}
                            onChange={handlePhotochromicsChange}
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
                        {error && (
                            <div className={classes["error"]}>{error}</div>
                        )}
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
                                    {PHOTOCHROMICS_VALUES.map(
                                        (value, index) => {
                                            return (
                                                <CustomRadio
                                                    key={index}
                                                    label={value}
                                                    value={value}
                                                    headClass={classes["radio"]}
                                                    active={
                                                        values?.photochromicsType ===
                                                        value
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </Radio.Group>
                                <FormikError name={"photochromicsType"} />
                            </>
                        )}
                    </div>
                </div>
            ) : null}
        </>
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
    "Transition Vantage",
];
