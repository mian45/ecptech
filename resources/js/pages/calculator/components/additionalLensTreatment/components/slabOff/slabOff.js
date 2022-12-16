import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { Plans } from "../../../../data/plansJson";
import { AllPlans } from "../../../../data/plansList";
import CalculatorInput from "../../../frameOrder/components/calculatorInput/calculatorInput";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./slabOff.module.scss";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import * as action from "../../../../../../store/actions";

const SlabOff = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    language,
}) => {
    const { values, handleChange } = formProps;
    const dipatch = useDispatch();
    const eyemedPlan = AllPlans[language]?.eyemed;
    const slapOffTitle =
        Plans()[language][values?.visionPlan]?.additionalLens?.subQuestion
            ?.slabOff?.question;
    const slabOffYes =
        Plans()[language][values?.visionPlan]?.additionalLens?.subQuestion
            ?.slabOff?.options?.yes;
    const slabOffNo =
        Plans()[language][values?.visionPlan]?.additionalLens?.subQuestion
            ?.slabOff?.options?.no;
    const lensBenifitYes =
        Plans()[language][values?.visionPlan]?.lensBenifit?.options?.yes;
    const additionalLensYes =
        Plans()[language][values?.visionPlan]?.additionalLens?.options?.yes;
    const showAlert = (e) => {
        const material = calculatorObj?.additional_lense_setting
            ?.find((item) => item?.title === data?.visionPlan)
            ?.addon_types?.find((val) => val?.title === "Slab Off")
            ?.addons?.find((ele) => ele?.title === "Slab Off");
        const invoiceData = localStorage.getItem("CALCULATOR_DATA");
        let parsedInvoiceData = false;
        if (invoiceData) {
            const data = JSON.parse(invoiceData);
            parsedInvoiceData = data?.invoicePriceData || false;
        }

        if (!material?.price && !parsedInvoiceData) {
            dipatch(action.showRetailPopup());
        }
        if (!material?.price && parsedInvoiceData) {
            setError(
                "The Retail Price for this brand is not added from the settings. Are you sure you want to continue?"
            );
        }
    };
    const handleSlabOffChange = (e) => {
        handleChange(e);
        showAlert(e);
        if (
            values?.visionPlan === eyemedPlan &&
            values?.isLensBenifit === lensBenifitYes &&
            values?.isAdditionalLensOptions === additionalLensYes &&
            e?.target?.value === slabOffYes
        ) {
            const validationObject = {};
            validationObject.slabOffPrice =
                Yup.string().required("Price is required");
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else {
            const validations = { ...calValidations };
            delete validations.slabOffPrice;
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
            <div className={classes["label"]}>{slapOffTitle}</div>
            <Radio.Group
                onChange={handleSlabOffChange}
                value={values?.isSlabOff}
                id="isSlabOff"
                name="isSlabOff"
                className={classes["custom-radio"]}
            >
                <CustomRadio
                    label={slabOffYes}
                    value={slabOffYes}
                    active={values?.isSlabOff === slabOffYes}
                />

                <CustomRadio
                    label={slabOffNo}
                    value={slabOffNo}
                    active={values?.isSlabOff === slabOffNo}
                />
            </Radio.Group>
            <FormikError name={"isSlabOff"} />
            {values?.visionPlan === eyemedPlan &&
                values?.isLensBenifit === lensBenifitYes &&
                values?.isAdditionalLensOptions === additionalLensYes &&
                values?.isSlabOff === slabOffYes && (
                    <CalculatorInput
                        onChange={handleInputChange}
                        value={values?.slabOffPrice}
                        name={"slabOffPrice"}
                    />
                )}
        </>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(SlabOff);
