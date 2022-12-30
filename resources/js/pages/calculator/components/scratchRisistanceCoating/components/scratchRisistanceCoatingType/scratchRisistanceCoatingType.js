import { Radio } from "antd";
import React from "react";
import { connect, useDispatch } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./scratchRisistanceCoatingType.module.scss";
import {
    getAddons,
    getAddonsList,
} from "../../../antireFlextive/helpers/addonsHelper";
import * as action from "../../../../../../store/actions";
import RetailError from "../../../photochromics/components/retailError/retailError";
import { retailErrorMessage } from "../../../sunglassLens/helpers/constants";

const ScratchRisistanceCoatingType = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
    retailError,
}) => {
    const { values, handleChange } = formProps;
    const dispatch = useDispatch();

    const getScratchRisistanceTypesList = () => {
        return (
            calculatorObj?.addons
                ?.find((plan) => plan?.title === values?.visionPlan)
                ?.addon_types?.find(
                    (item) => item?.title === "Scratch Resistant Coatings"
                )?.addons || []
        );
    };
    const showAlert = (e) => {
        const material = getAddons(
            calculatorObj,
            "Scratch Resistant Coatings",
            e?.target?.value,
            values?.visionPlan
        );
        const invoiceData = localStorage.getItem("CALCULATOR_DATA");
        let parsedInvoiceData = false;
        if (invoiceData) {
            const data = JSON.parse(invoiceData);
            parsedInvoiceData = data?.invoicePriceData || false;
        }

        if (!material?.price && !parsedInvoiceData) {
            dispatch(action.showRetailPopup());
        }
        if (!material?.price && parsedInvoiceData) {
            dispatch(
                action.retailError({
                    type: "scratchRistanceCoating",
                    error: retailErrorMessage("Scratch Resistant Coatings"),
                    plan: values?.visionPlan,
                })
            );
        }
    };
    return (
        <>
            {CompareStrings(values?.isScratched, "Yes") && (
                <>
                    <div className={classes["label"]}>Please Choose</div>
                    <Radio.Group
                        onChange={(e) => {
                            handleChange(e);
                            showAlert(e);
                        }}
                        value={values?.scratchedType}
                        id="scratchedType"
                        name="scratchedType"
                        className={classes["radio-group"]}
                    >
                        {getScratchRisistanceTypesList()?.map(
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
                                        headClass={classes["radio"]}
                                        active={
                                            values?.scratchedType ===
                                            value?.title
                                        }
                                    />
                                );
                            }
                        )}
                    </Radio.Group>
                    <FormikError name={"scratchedType"} />{" "}
                    <RetailError
                        error={
                            retailError[values?.visionPlan]
                                ?.scratchRistanceCoating
                        }
                    />
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
    retailError: state?.persistStore?.retailError,
});

export default connect(mapStateToProps)(ScratchRisistanceCoatingType);
