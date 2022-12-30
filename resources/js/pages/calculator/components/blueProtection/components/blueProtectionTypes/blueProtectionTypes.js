import { Radio } from "antd";
import React from "react";
import { connect, useDispatch } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings, groupBy } from "../../../../../../utils/utils";
import {
    getAddons,
    getAddonsList,
} from "../../../antireFlextive/helpers/addonsHelper";
import { FormikError } from "../../../selectVisionPlan";
import classes from "../blueProectionCategory/blueProtectionCategory.module.scss";
import * as action from "../../../../../../store/actions";
import RetailError from "../../../photochromics/components/retailError/retailError";
import { retailErrorMessage } from "../../../sunglassLens/helpers/constants";

const BlueProtectionTypes = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
    retailError,
}) => {
    const { values, handleChange } = formProps;
    const dispatch = useDispatch();

    const getBlueProtectionTypes = () => {
        const addons = getAddonsList(calculatorObj, "VBA", "Blue Protection");
        const groupByAddons = groupBy("category", addons);
        return groupByAddons[values?.blueProtectionCategory] || [];
    };
    const showAlert = (e) => {
        const material = getAddons(
            calculatorObj,
            "Blue Protection",
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
                    type: "blueProtection",
                    error: retailErrorMessage("this Blue Protection"),
                    plan: values?.visionPlan,
                })
            );
        }
    };
    return (
        <>
            {CompareStrings(values?.isBlueProtection, "Yes") &&
                values?.blueProtectionCategory && (
                    <>
                        <div className={classes["label"]}>Please Choose</div>
                        <Radio.Group
                            onChange={(e) => {
                                handleChange(e);
                                showAlert(e);
                            }}
                            value={values?.blueProtectionType}
                            id="blueProtectionType"
                            name="blueProtectionType"
                            className={classes["radio-group"]}
                        >
                            {getBlueProtectionTypes()?.map((value, index) => {
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
                                            values?.blueProtectionType ===
                                            value?.title
                                        }
                                    />
                                );
                            })}
                        </Radio.Group>
                        <FormikError name={"blueProtectionType"} />
                        <RetailError
                            error={
                                retailError[values?.visionPlan]?.blueProtection
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

export default connect(mapStateToProps)(BlueProtectionTypes);
