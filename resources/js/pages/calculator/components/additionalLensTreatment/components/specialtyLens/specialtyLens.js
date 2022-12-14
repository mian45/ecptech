import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { Plans } from "../../../../data/plansJson";
import { AllPlans } from "../../../../data/plansList";
import CalculatorInput from "../../../frameOrder/components/calculatorInput/calculatorInput";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./specialtyLens.module.scss";
import * as Yup from "yup";

const SpecialtyLens = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    language,
}) => {
    const { values, handleChange } = formProps;
    const eyemedPlan = AllPlans[language]?.eyemed;
    const specialtyLensTitle =
        Plans[language][values?.visionPlan]?.additionalLens?.subQuestion
            ?.specialtyLens?.question;
    const specialtyLensYes =
        Plans[language][values?.visionPlan]?.additionalLens?.subQuestion
            ?.specialtyLens?.options?.yes;
    const specialtyLensNo =
        Plans[language][values?.visionPlan]?.additionalLens?.subQuestion
            ?.specialtyLens?.options?.no;
    const lensBenifitYes =
        Plans[language][values?.visionPlan]?.lensBenifit?.options?.yes;
    const additionalLensYes =
        Plans[language][values?.visionPlan]?.additionalLens?.options?.yes;
    const handleSpecialityLensChange = (e) => {
        handleChange(e);
        if (
            values?.visionPlan === eyemedPlan &&
            values?.isLensBenifit === lensBenifitYes &&
            values?.isAdditionalLensOptions === additionalLensYes &&
            e?.target?.value === specialtyLensYes
        ) {
            const validationObject = {};
            validationObject.specialityLensPrice =
                Yup.string().required("Price is required");
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else {
            const validations = { ...calValidations };
            delete validations.specialityLensPrice;
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
            <div className={classes["label"]}>{specialtyLensTitle}</div>
            <Radio.Group
                onChange={handleSpecialityLensChange}
                value={values?.isSpecialtyLens}
                id="isSpecialtyLens"
                name="isSpecialtyLens"
                className={classes["custom-radio"]}
            >
                <CustomRadio
                    label={specialtyLensYes}
                    value={specialtyLensYes}
                    active={values?.isSpecialtyLens === specialtyLensYes}
                />

                <CustomRadio
                    label={specialtyLensNo}
                    value={specialtyLensNo}
                    active={values?.isSpecialtyLens === specialtyLensNo}
                />
            </Radio.Group>
            <FormikError name={"isSpecialtyLens"} />
            {values?.visionPlan === eyemedPlan &&
                values?.isLensBenifit === lensBenifitYes &&
                values?.isAdditionalLensOptions === additionalLensYes &&
                values?.isSpecialtyLens === specialtyLensYes && (
                    <CalculatorInput
                        onChange={handleInputChange}
                        value={values?.specialityLensPrice}
                        name={"specialityLensPrice"}
                    />
                )}
        </>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(SpecialtyLens);
