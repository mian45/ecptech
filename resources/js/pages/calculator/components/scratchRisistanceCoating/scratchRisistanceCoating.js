import { Col, Radio, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./scratchRisistanceCoating.module.scss";
import icon from "../../../../../images/calculator/scratch.svg";
import * as Yup from "yup";
import ScratchRisistanceCoatingType from "./components/scratchRisistanceCoatingType/scratchRisistanceCoatingType";

const ScratchRisistanceCoating = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const scratchVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Aspheric"
        )?.visibility;

    const handleActiveFields = () => {
        return CompareStrings(values?.isScratched, "No") ||
            (CompareStrings(values?.isScratched, "Yes") &&
                values?.scratchedType)
            ? true
            : false;
    };

    const handleScratchRisistanceChange = async (e) => {
        handleChange(e);

        if (e?.target?.value === "Yes") {
            const validationsObj = {};
            validationsObj.scratchedType =
                Yup.string().required("Option is required");
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (e?.target?.value === "No") {
            await setFieldValue("scratchedType", "");
            const validations = { ...calValidations };
            delete validations.scratchedType;
            setCalValidations({
                ...validations,
            });
        }
    };

    return (
        <>
            {scratchVisibility && values?.visionPlan === "VBA" ? (
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
                                title={"Scratch Resistant Coatings"}
                                active={handleActiveFields()}
                            />
                            <Radio.Group
                                onChange={handleScratchRisistanceChange}
                                value={values?.isScratched}
                                id="isScratched"
                                name="isScratched"
                                className={classes["custom-radio"]}
                            >
                                <CustomRadio
                                    label={"Yes"}
                                    value={"Yes"}
                                    active={values?.isScratched === "Yes"}
                                />
                                <CustomRadio
                                    label={"No"}
                                    value={"No"}
                                    active={values?.isScratched === "No"}
                                />
                            </Radio.Group>
                            <FormikError name={"isScratched"} />
                            <ScratchRisistanceCoatingType
                                formProps={formProps}
                                calculatorObj={calculatorObj && calculatorObj}
                                setCalValidations={setCalValidations}
                                calValidations={calValidations}
                            />
                        </div>
                    </Col>
                </Row>
            ) : null}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(ScratchRisistanceCoating);
