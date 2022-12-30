import { Radio } from "antd";
import React from "react";
import { connect, useDispatch } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./rollAndPolishTypes.module.scss";
import { getAddons } from "../../../antireFlextive/helpers/addonsHelper";
import * as action from "../../../../../../store/actions";
import RetailError from "../../../photochromics/components/retailError/retailError";
import { retailErrorMessage } from "../../../sunglassLens/helpers/constants";

const RollAndPolishTypes = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
    retailError,
}) => {
    const { values, handleChange } = formProps;
    const dispatch = useDispatch();

    const getRollAndPolishTypesList = () => {
        return (
            calculatorObj?.addons
                ?.find((plan) => plan?.title === values?.visionPlan)
                ?.addon_types?.find((item) => item?.title === "Roll & Polish")
                ?.addons || []
        );
    };

    const showAlert = (e) => {
        const material = getAddons(
            calculatorObj,
            "Roll & Polish",
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
                    type: "rollAndPolish",
                    error: retailErrorMessage("this Roll & Polish"),
                    plan: values?.visionPlan,
                })
            );
        }
    };
    return (
        <>
            {CompareStrings(values?.isRollAndPolish, "Yes") && (
                <>
                    <div className={classes["label"]}>Please Choose</div>
                    <Radio.Group
                        onChange={(e) => {
                            handleChange(e);
                            showAlert(e);
                        }}
                        value={values?.rollAndPolishTypes}
                        id="rollAndPolishTypes"
                        name="rollAndPolishTypes"
                        className={classes["radio-group"]}
                    >
                        {getRollAndPolishTypesList()?.map((value, index) => {
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
                                        values?.rollAndPolishTypes ===
                                        value?.title
                                    }
                                />
                            );
                        })}
                    </Radio.Group>
                    <FormikError name={"rollAndPolishTypes"} />
                    <RetailError
                        error={retailError[values?.visionPlan]?.rollAndPolish}
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

export default connect(mapStateToProps)(RollAndPolishTypes);
