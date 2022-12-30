import { Radio } from "antd";
import React from "react";
import { connect, useDispatch } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { getAddons } from "../../../antireFlextive/helpers/addonsHelper";
import RetailError from "../../../photochromics/components/retailError/retailError";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./asphericTypes.module.scss";
import * as action from "../../../../../../store/actions";
import { retailErrorMessage } from "../../../sunglassLens/helpers/constants";

const AsphericTypes = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
    retailError,
}) => {
    const { values, handleChange } = formProps;
    const dispatch = useDispatch();

    const getAsphericTypesList = () => {
        return (
            calculatorObj?.addons
                ?.find((plan) => plan?.title === values?.visionPlan)
                ?.addon_types?.find((item) => item?.title === "Aspheric")
                ?.addons || []
        );
    };
    const showAlert = (e) => {
        const material = getAddons(
            calculatorObj,
            "Aspheric",
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
                    type: "aspheric",
                    error: retailErrorMessage("this Aspheric"),
                    plan: values?.visionPlan,
                })
            );
        }
    };
    return (
        <>
            {CompareStrings(values?.isAspheric, "Yes") && (
                <>
                    <div className={classes["label"]}>Please Choose</div>
                    <Radio.Group
                        onChange={(e) => {
                            handleChange(e);
                            showAlert(e);
                        }}
                        value={values?.asphericType}
                        id="asphericType"
                        name="asphericType"
                        className={classes["radio-group"]}
                    >
                        {getAsphericTypesList()?.map((value, index) => {
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
                                        values?.asphericType === value?.title
                                    }
                                />
                            );
                        })}
                    </Radio.Group>
                    <FormikError name={"asphericType"} />
                    <RetailError
                        error={retailError[values?.visionPlan]?.aspheric}
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

export default connect(mapStateToProps)(AsphericTypes);
