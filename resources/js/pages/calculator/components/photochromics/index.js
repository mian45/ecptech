import React, { useState } from "react";
import { Col, Radio, Row } from "antd";
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
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const photochromicsVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Photochromics"
        )?.visibility;
    const [error, setError] = useState("");

    const getPhotochromicList = () => {
        return (
            calculatorObj?.addons?.find(
                (item) => item?.title === "Photochromic"
            )?.addons || []
        );
    };

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

    const handlePhotochromicsChange = async (e) => {
        handleChange(e);
        if (
            e?.target?.value === "Yes" &&
            data?.find((ques) => ques.question === "Photochromics")
                ?.optional === "true"
        ) {
            const photochromicsType =
                Yup.string().required("Option is required");
            setCalValidations({
                ...calValidations,
                photochromicsType,
            });
        } else if (e?.target?.value === "No") {
            await setFieldValue("isCopayPhotochromic", null);
            await setFieldValue("isCopayPhotochromicAmount", "");
            await setFieldValue("copayPhotochromicAmount", "");
            const validations = { ...calValidations };
            delete validations.isCopayPhotochromicAmount;
            delete validations.copayPhotochromicAmount;
            delete validations.photochromicsType;
            setCalValidations({
                ...validations,
            });
        }
        if (values.isCopayPhotochromic && e.target.value === "No") {
            setError(
                "Are you sure, you don't want to use the available discount?"
            );
        } else {
            setError("");
        }
    };

    return (
        <>
            {photochromicsVisibility ? (
                <Row className={classes["container"]}>
                    {" "}
                    <Col sx={0} sm={0} md={5}>
                        <QuestionIcon
                            icon={icon}
                            active={handleActiveState()}
                        />
                    </Col>
                    <Col sx={24} sm={24} md={19}>
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title="Photochromics ?"
                                active={handleActiveState()}
                            />
                            <Radio.Group
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
                                        onChange={handleChange}
                                        value={values?.photochromicsType}
                                        id="photochromicsType"
                                        name="photochromicsType"
                                        className={classes["radio-group"]}
                                    >
                                        {getPhotochromicList()?.map(
                                            (value, index) => {
                                                return (
                                                    <CustomRadio
                                                        key={index}
                                                        label={
                                                            value?.display_name
                                                                ? value?.display_name
                                                                : value?.title
                                                        }
                                                        value={value?.title}
                                                        headClass={
                                                            classes["radio"]
                                                        }
                                                        active={
                                                            values?.photochromicsType ===
                                                            value?.title
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
                    </Col>
                </Row>
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
