import { Col, Radio, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./licensedSpeciality.module.scss";
import icon from "../../../../../images/calculator/licensed.svg";
import LicensedSpecialityTypes from "./components/licensedSpecialityType/licensedSpecialityType";
import * as Yup from "yup";

const LicensedSpeciality = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const licensedVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Licensed Specialty Enhancement"
        )?.visibility;

    const handleActiveFields = () => {
        return CompareStrings(values?.isLicensedSpeciality, "No") ||
            (CompareStrings(values?.isLicensedSpeciality, "Yes") &&
                values?.licensedSpecialityType)
            ? true
            : false;
    };

    const handleLensSpecialityChange = async (e) => {
        handleChange(e);

        if (e?.target?.value === "Yes") {
            const validationsObj = {};
            validationsObj.licensedSpecialityType =
                Yup.string().required("Option is required");
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (e?.target?.value === "No") {
            await setFieldValue("licensedSpecialityType", "");
            const validations = { ...calValidations };
            delete validations.licensedSpecialityType;
            setCalValidations({
                ...validations,
            });
        }
    };

    return (
        <>
            {licensedVisibility && values?.visionPlan === "VBA" ? (
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
                                title={"Licensed Specialty Enhancement"}
                                active={handleActiveFields()}
                            />
                            <Radio.Group
                                onChange={handleLensSpecialityChange}
                                value={values?.isLicensedSpeciality}
                                id="isLicensedSpeciality"
                                name="isLicensedSpeciality"
                                className={classes["custom-radio"]}
                            >
                                <CustomRadio
                                    label={"Yes"}
                                    value={"Yes"}
                                    active={
                                        values?.isLicensedSpeciality === "Yes"
                                    }
                                />
                                <CustomRadio
                                    label={"No"}
                                    value={"No"}
                                    active={
                                        values?.isLicensedSpeciality === "No"
                                    }
                                />
                            </Radio.Group>
                            <FormikError name={"isLicensedSpeciality"} />
                            <LicensedSpecialityTypes
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

export default connect(mapStateToProps)(LicensedSpeciality);
