import React, { useState } from "react";
import { Radio } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/antireflictive.svg";
import { AntireflectiveTypeEnum } from "../../data/enums";
import * as Yup from "yup";

const AntireFlextive = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
}) => {
    const { values, handleChange, handleBlur } = formProps;
    const antireflectiveVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Antireflective Properties"
        )?.visibility;
    const [error, setError] = useState("");

    const handleActiveFields = () => {
        if (values?.isAntireflective === "No") {
            return true;
        } else {
            if (values?.antireflectiveType) {
                return true;
            }
            return false;
        }
    };

    const handleAntireflectiveChange = (e) => {
        handleChange(e);
        if (
            e?.target?.value === "Yes" &&
            !data?.find((ques) => ques.question === "Antireflective Properties")
                .optional
        ) {
            const antireflectiveType =
                Yup.string().required("Option is required");
            setCalValidations({
                ...calValidations,
                antireflectiveType,
            });
        } else if (e?.target?.value === "No") {
            const validations = { ...calValidations };
            delete validations.antireflectiveType;
            setCalValidations({
                ...validations,
            });
        }
        if (values.isCopayAntiReflective && e.target.value === "No") {
            setError("Are you sure? You don't want to avail discount");
        } else {
            setError("");
        }
    };

    return (
        <>
            {antireflectiveVisibility && (
                <div className={classes["container"]}>
                    <QuestionIcon icon={icon} active={handleActiveFields()} />
                    <div className={classes["vision-container"]}>
                        <CalculatorHeading
                            title="Antireflective Properties?"
                            active={handleActiveFields()}
                        />
                        <Radio.Group
                            onBlur={handleBlur}
                            onChange={handleAntireflectiveChange}
                            value={values?.isAntireflective}
                            id="isAntireflective"
                            name="isAntireflective"
                            className={classes["radio-group"]}
                        >
                            <CustomRadio
                                label={"Yes"}
                                value={"Yes"}
                                active={values?.isAntireflective === "Yes"}
                            />

                            <CustomRadio
                                label={"No"}
                                value={"No"}
                                active={values?.isAntireflective === "No"}
                            />
                        </Radio.Group>
                        <FormikError name={"isAntireflective"} />
                        {error && (
                            <div className={classes["error"]}>{error}</div>
                        )}
                        {values?.isAntireflective === "Yes" && (
                            <>
                                <div className={classes["label"]}>
                                    Select Properties
                                </div>
                                <Radio.Group
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values?.antireflectiveType}
                                    id="antireflectiveType"
                                    name="antireflectiveType"
                                    className={classes["radio-group"]}
                                >
                                    <CustomRadio
                                        headClass={classes["margin"]}
                                        label={
                                            AntireflectiveTypeEnum.shamirGlacierPlusUV
                                        }
                                        value={
                                            AntireflectiveTypeEnum.shamirGlacierPlusUV
                                        }
                                        active={
                                            values?.antireflectiveType ===
                                            AntireflectiveTypeEnum.shamirGlacierPlusUV
                                        }
                                    />
                                    <CustomRadio
                                        headClass={classes["margin"]}
                                        label={
                                            AntireflectiveTypeEnum.techShieldPlusUVR
                                        }
                                        value={
                                            AntireflectiveTypeEnum.techShieldPlusUVR
                                        }
                                        active={
                                            values?.antireflectiveType ===
                                            AntireflectiveTypeEnum.techShieldPlusUVR
                                        }
                                    />
                                    <CustomRadio
                                        label={
                                            AntireflectiveTypeEnum.crizalSunshield
                                        }
                                        value={
                                            AntireflectiveTypeEnum.crizalSunshield
                                        }
                                        active={
                                            values?.antireflectiveType ===
                                            AntireflectiveTypeEnum.crizalSunshield
                                        }
                                    />
                                </Radio.Group>
                                <FormikError name={"antireflectiveType"} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AntireFlextive;
