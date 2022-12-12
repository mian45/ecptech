import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Col, Row, Radio } from "antd";
import { AllPlans } from "../../data/plansList";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./additionalLensTreatment.module.scss";
import icon from "../../../../../images/calculator/additional-lens.svg";
import { Plans } from "../../data/plansJson";
import CustomRadio from "../../../../components/customRadio";
import SlabOff from "./components/slabOff/slabOff";
import SpecialtyLens from "./components/specialtyLens/specialtyLens";
import Polish from "./components/polish/polish";

const AdditionalLensTreatment = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    language,
}) => {
    const { values, handleChange } = formProps;
    const eyemedPlan = AllPlans[language]?.eyemed;
    const additionalLensTitle =
        Plans[language][values?.visionPlan]?.additionalLens?.question;
    const additionalLensYes =
        Plans[language][values?.visionPlan]?.additionalLens?.options?.yes;
    const additionalLensNo =
        Plans[language][values?.visionPlan]?.additionalLens?.options?.no;
    const currentPlanVisibility = calculatorObj?.questions?.find(
        (item) => item?.title === values?.visionPlan
    )?.question_permissions;

    const slabOffVisibility = currentPlanVisibility?.find(
        (ques) => ques.question === "Slab Off"
    )?.visibility;
    const specialityVisibility = currentPlanVisibility?.find(
        (ques) => ques.question === "Speciality Lens"
    )?.visibility;
    const polishVisibility = currentPlanVisibility?.find(
        (ques) => ques.question === "Polish"
    )?.visibility;

    const handleActiveFields = () => {
        if (values?.isAdditionalLensOptions) return true;
        return false;
    };
    const handleAdditionalLensTreatmentChange = (e) => {
        handleChange(e);
        if (e?.target?.value === additionalLensYes) {
            const slabOff =
                data?.find((ques) => ques?.question == "Slab Off")?.optional ===
                "true";
            const specialityLens =
                data?.find((ques) => ques?.question == "Speciality Lens")
                    ?.optional === "true";
            const polish =
                data?.find((ques) => ques?.question == "Polish")?.optional ===
                "true";
            const validationObject = {};
            if (slabOff) {
                validationObject.isSlabOff = Yup.string().required(
                    "Slab off is required"
                );
            }
            if (specialityLens) {
                validationObject.isSpecialtyLens = Yup.string().required(
                    "Speciality Lens is required"
                );
            }
            if (polish) {
                validationObject.isPolish =
                    Yup.string().required("Polish is required");
            }
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else {
            const validations = { ...calValidations };
            delete validations.isSlabOff;
            delete validations.slabOffPrice;
            delete validations.isSpecialtyLens;
            delete validations.specialityLensPrice;
            delete validations.isPolish;
            delete validations.polishType;
            delete validations.polishPrice;
            setCalValidations({
                ...validations,
            });
        }
    };

    const isNoOptionHidden = () => {
        const slabOff =
            data?.find((ques) => ques?.question == "Slab Off")?.optional ===
            "true";
        const specialityLens =
            data?.find((ques) => ques?.question == "Speciality Lens")
                ?.optional === "true";
        const polish =
            data?.find((ques) => ques?.question == "Polish")?.optional ===
            "true";
        return values?.visionPlan === eyemedPlan &&
            (slabOff || specialityLens || polish)
            ? true
            : false;
    };

    const actionProps = {
        formProps,
        calculatorObj,
        setCalValidations,
        calValidations,
        data,
    };
    const renderAddiotionalTreatment = () => {
        return (
            <Row className={classes["container"]}>
                <Col sx={0} sm={0} md={5}>
                    <QuestionIcon icon={icon} active={handleActiveFields()} />
                </Col>
                <Col sx={24} sm={24} md={19}>
                    <div className={classes["vision-container"]}>
                        <CalculatorHeading
                            title={additionalLensTitle}
                            active={handleActiveFields()}
                        />
                        <Radio.Group
                            onChange={handleAdditionalLensTreatmentChange}
                            value={values?.isAdditionalLensOptions}
                            id="isAdditionalLensOptions"
                            name="isAdditionalLensOptions"
                            className={classes["custom-radio"]}
                        >
                            <CustomRadio
                                label={additionalLensYes}
                                value={additionalLensYes}
                                active={
                                    values?.isAdditionalLensOptions ===
                                    additionalLensYes
                                }
                            />

                            {!isNoOptionHidden() && (
                                <CustomRadio
                                    label={additionalLensNo}
                                    value={additionalLensNo}
                                    active={
                                        values?.isAdditionalLensOptions ===
                                        additionalLensNo
                                    }
                                />
                            )}
                        </Radio.Group>
                        <FormikError name={"isAdditionalLensOptions"} />
                        {values?.isAdditionalLensOptions ===
                            additionalLensYes && (
                            <>
                                {slabOffVisibility && (
                                    <SlabOff {...actionProps} />
                                )}
                                {specialityVisibility && (
                                    <SpecialtyLens {...actionProps} />
                                )}
                                {polishVisibility && (
                                    <Polish {...actionProps} />
                                )}
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        );
    };
    return (
        <>
            {values?.visionPlan === eyemedPlan &&
            (slabOffVisibility || specialityVisibility || polishVisibility) ? (
                renderAddiotionalTreatment()
            ) : (
                <></>
            )}
        </>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(AdditionalLensTreatment);
