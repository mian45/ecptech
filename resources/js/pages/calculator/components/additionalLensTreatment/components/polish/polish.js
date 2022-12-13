import { Radio } from "antd";
import React from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { Plans } from "../../../../data/plansJson";
import { AllPlans } from "../../../../data/plansList";
import CalculatorInput from "../../../frameOrder/components/calculatorInput/calculatorInput";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./polish.module.scss";

const Polish = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    language,
}) => {
    const { values, handleChange } = formProps;
    const eyemedPlan = AllPlans[language]?.eyemed;
    const polishTitle =
        Plans[language][values?.visionPlan]?.additionalLens?.subQuestion?.polish
            ?.question;
    const polishTypeTitle =
        Plans[language][values?.visionPlan]?.additionalLens?.subQuestion?.polish
            ?.subQuestion?.question;
    const polishYes =
        Plans[language][values?.visionPlan]?.additionalLens?.subQuestion?.polish
            ?.options?.yes;
    const polishNo =
        Plans[language][values?.visionPlan]?.additionalLens?.subQuestion?.polish
            ?.options?.no;
    const lensBenifitYes =
        Plans[language][values?.visionPlan]?.lensBenifit?.options?.yes;
    const additionalLensYes =
        Plans[language][values?.visionPlan]?.additionalLens?.options?.yes;

    const handleInputChange = (e) => {
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value)) {
            handleChange(e);
        } else if (e.target.value == "") {
            handleChange(e);
        }
    };

    const handlePolishChange = (e) => {
        handleChange(e);
        if (e?.target?.value === polishYes) {
            const validationObject = {};
            validationObject.polishType = Yup.string().required(
                "Polish type is required"
            );
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else if (e?.target?.value === polishNo) {
            const validations = { ...calValidations };
            delete validations.polishType;
            delete validations.polishPrice;
            setCalValidations({
                ...validations,
            });
        }
    };

    const handlePolishTypeChange = (e) => {
        handleChange(e);
        if (
            values?.visionPlan === eyemedPlan &&
            values?.isLensBenifit === lensBenifitYes &&
            values?.isAdditionalLensOptions === additionalLensYes &&
            values?.isPolish === polishYes &&
            e?.target?.value
        ) {
            const validationObject = {};
            validationObject.polishPrice =
                Yup.string().required("Price is required");
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else {
            const validations = { ...calValidations };
            delete validations.polishPrice;
            setCalValidations({
                ...validations,
            });
        }
    };

    const getPolishTypes = () => {
        return (
            calculatorObj?.additional_lense_setting
                ?.find((plan) => plan?.title === values?.visionPlan)
                ?.addon_types?.find((item) => item?.title === "Polish")
                ?.addons || []
        );
    };
    return (
        <>
            <div className={classes["label"]}>{polishTitle}</div>
            <Radio.Group
                onChange={handlePolishChange}
                value={values?.isPolish}
                id="isPolish"
                name="isPolish"
                className={classes["polish-radio"]}
            >
                <CustomRadio
                    label={polishYes}
                    value={polishYes}
                    active={values?.isPolish === polishYes}
                />

                <CustomRadio
                    label={polishNo}
                    value={polishNo}
                    active={values?.isPolish === polishNo}
                />
            </Radio.Group>
            <FormikError name={"isPolish"} />
            {values?.isPolish === polishYes && (
                <>
                    <div className={classes["choose-label"]}>
                        {polishTypeTitle}
                    </div>
                    <Radio.Group
                        onChange={handlePolishTypeChange}
                        value={values?.polishType}
                        id="polishType"
                        name="polishType"
                        className={classes["custom-radio"]}
                    >
                        {getPolishTypes()?.map((value, index) => {
                            return (
                                <CustomRadio
                                    key={index}
                                    label={
                                        value?.display_name
                                            ? value?.display_name
                                            : value?.title
                                    }
                                    value={value?.title}
                                    headClass={classes["radio-margin"]}
                                    active={values?.polishType === value?.title}
                                />
                            );
                        })}
                    </Radio.Group>
                    <FormikError name={"polishType"} />
                </>
            )}
            {values?.visionPlan === eyemedPlan &&
                values?.isLensBenifit === lensBenifitYes &&
                values?.isAdditionalLensOptions === additionalLensYes &&
                values?.isPolish === polishYes &&
                values?.polishType && (
                    <CalculatorInput
                        onChange={handleInputChange}
                        value={values?.polishPrice}
                        name={"polishPrice"}
                    />
                )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(Polish);