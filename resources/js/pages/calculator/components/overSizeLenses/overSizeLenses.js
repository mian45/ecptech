import { Col, Radio, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import classes from "./overSizeLenses.module.scss";
import icon from "../../../../../images/calculator/overSize.svg";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import CalculatorInput from "../frameOrder/components/calculatorInput/calculatorInput";
import QuestionIcon from "../questionIcon";
import * as Yup from "yup";

const OverSizeLenses = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const overSizeVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Oversize Lenses"
        )?.visibility;

    const handleActiveFields = () => {
        return CompareStrings(values?.isOverSizeLens, "No") ||
            (CompareStrings(values?.isOverSizeLens, "Yes") &&
                values?.overSizeLenseType)
            ? true
            : false;
    };

    const handleOverSizeChange = async (e) => {
        handleChange(e);
        if (CompareStrings(e?.target?.value, "Yes")) {
            const validationsObj = {};
            validationsObj.overSizeLenseType = Yup.string().required(
                "Oversize lenses is required"
            );
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (CompareStrings(e?.target?.value, "No")) {
            await setFieldValue("overSizeLenseType", "");
            const validations = { ...calValidations };
            delete validations.overSizeLenseType;
            setCalValidations({
                ...validations,
            });
        }
    };

    const handleInputChange = (e) => {
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value)) {
            handleChange(e);
        } else if (e.target.value == "") {
            handleChange(e);
        }
    };

    return (
        <>
            {overSizeVisibility &&
                CompareStrings(values?.visionPlan, "Spectra") && (
                    <Row className={classes["container"]}>
                        <Col xs={24} sm={24} md={5} lg={5}>
                            <QuestionIcon
                                icon={icon}
                                active={handleActiveFields()}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={19} lg={19}>
                            <div className={classes["vision-container"]}>
                                <CalculatorHeading
                                    title={"Oversize Lenses ?"}
                                    active={handleActiveFields()}
                                />
                                <Radio.Group
                                    onChange={handleOverSizeChange}
                                    value={values?.isOverSizeLens}
                                    id="isOverSizeLens"
                                    name="isOverSizeLens"
                                    className={classes["custom-radio"]}
                                >
                                    <CustomRadio
                                        label={"Yes"}
                                        value={"Yes"}
                                        active={CompareStrings(
                                            values?.isOverSizeLens,
                                            "Yes"
                                        )}
                                    />
                                    <CustomRadio
                                        label={"No"}
                                        value={"No"}
                                        active={CompareStrings(
                                            values?.isOverSizeLens,
                                            "No"
                                        )}
                                    />
                                </Radio.Group>
                                <FormikError name={"isOverSizeLens"} />
                                {CompareStrings(values?.isLensBenifit, "Yes") &&
                                    CompareStrings(
                                        values?.isOverSizeLens,
                                        "Yes"
                                    ) && (
                                        <CalculatorInput
                                            onChange={handleInputChange}
                                            value={values?.overSizeLenseType}
                                            name={"overSizeLenseType"}
                                        />
                                    )}
                            </div>
                        </Col>
                    </Row>
                )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(OverSizeLenses);
