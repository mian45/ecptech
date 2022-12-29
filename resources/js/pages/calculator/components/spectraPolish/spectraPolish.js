import { Col, Radio, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./spectraPolish.module.scss";
import icon from "../../../../../images/calculator/additional-lens.svg";
import * as Yup from "yup";
import RollAndPolishTypes from "./components/spectraPolishType/spectraPolishType";
import SpectraPolishType from "./components/spectraPolishType/spectraPolishType";

const SpectraPolish = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const polishVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Polish"
        )?.visibility;

    const handleActiveFields = () => {
        return CompareStrings(values?.spectraPolish, "No") ||
            (CompareStrings(values?.spectraPolish, "Yes") &&
                values?.spectraPolishType)
            ? true
            : false;
    };

    const handlePolishChange = async (e) => {
        handleChange(e);

        if (e?.target?.value === "Yes") {
            const validationsObj = {};
            validationsObj.spectraPolishType = Yup.string().required(
                "Polish Type is required"
            );
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (e?.target?.value === "No") {
            await setFieldValue("spectraPolishType", "");
            const validations = { ...calValidations };
            delete validations.spectraPolishType;
            setCalValidations({
                ...validations,
            });
        }
    };

    return (
        <>
            {polishVisibility && values?.visionPlan === "VBA" ? (
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
                                title={"Polish ?"}
                                active={handleActiveFields()}
                            />
                            <Radio.Group
                                onChange={handlePolishChange}
                                value={values?.spectraPolish}
                                id="spectraPolish"
                                name="spectraPolish"
                                className={classes["custom-radio"]}
                            >
                                <CustomRadio
                                    label={"Yes"}
                                    value={"Yes"}
                                    active={values?.spectraPolish === "Yes"}
                                />
                                <CustomRadio
                                    label={"No"}
                                    value={"No"}
                                    active={values?.spectraPolish === "No"}
                                />
                            </Radio.Group>
                            <FormikError name={"spectraPolish"} />
                            <SpectraPolishType
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

export default connect(mapStateToProps)(SpectraPolish);
