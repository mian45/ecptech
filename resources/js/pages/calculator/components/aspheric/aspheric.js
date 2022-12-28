import { Col, Radio, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./aspheric.module.scss";
import icon from "../../../../../images/calculator/additional-lens.svg";
import AsphericTypes from "./components/ashpericTypes/asphericTypes";
import * as Yup from "yup";

const Aspheric = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const asphericVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Aspheric"
        )?.visibility;

    const handleActiveFields = () => {
        return CompareStrings(values?.isAspheric, "No") ||
            (CompareStrings(values?.isAspheric, "Yes") && values?.asphericType)
            ? true
            : false;
    };

    const handleAsphericChange = async (e) => {
        handleChange(e);

        if (e?.target?.value === "Yes") {
            const validationsObj = {};
            validationsObj.asphericType = Yup.string().required(
                "Aspheric Type is required"
            );
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (e?.target?.value === "No") {
            await setFieldValue("asphericType", "");
            const validations = { ...calValidations };
            delete validations.asphericType;
            setCalValidations({
                ...validations,
            });
        }
    };

    return (
        <>
            {asphericVisibility && values?.visionPlan === "VBA" ? (
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
                                title={"Aspheric"}
                                active={handleActiveFields()}
                            />
                            <Radio.Group
                                onChange={handleAsphericChange}
                                value={values?.isAspheric}
                                id="isAspheric"
                                name="isAspheric"
                                className={classes["custom-radio"]}
                            >
                                <CustomRadio
                                    label={"Yes"}
                                    value={"Yes"}
                                    active={values?.isAspheric === "Yes"}
                                />
                                <CustomRadio
                                    label={"No"}
                                    value={"No"}
                                    active={values?.isAspheric === "No"}
                                />
                            </Radio.Group>
                            <FormikError name={"isAspheric"} />
                            <AsphericTypes
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

export default connect(mapStateToProps)(Aspheric);
