import { Radio } from "antd";
import React from "react";
import { connect, useDispatch } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./licensedSpecialityType.module.scss";
import {
    getAddons,
    getAddonsList,
} from "../../../antireFlextive/helpers/addonsHelper";
import * as action from "../../../../../../store/actions";
import RetailError from "../../../photochromics/components/retailError/retailError";
import { retailErrorMessage } from "../../../sunglassLens/helpers/constants";

const LicensedSpecialityTypes = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
    retailError,
}) => {
    const { values, handleChange } = formProps;
    const dispatch = useDispatch();

    const getLicensedSpecialityTypesList = () => {
        return (
            calculatorObj?.addons
                ?.find((plan) => plan?.title === values?.visionPlan)
                ?.addon_types?.find(
                    (item) => item?.title === "Licensed Specialty Enhancement"
                )?.addons || []
        );
    };
    const showAlert = (e) => {
        const material = getAddons(
            calculatorObj,
            "Licensed Specialty Enhancement",
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
                    type: "licensedspeciality",
                    error: retailErrorMessage("Licensed Specialty Enhancement"),
                    plan: values?.visionPlan,
                })
            );
        }
    };
    return (
        <>
            {CompareStrings(values?.isLicensedSpeciality, "Yes") && (
                <>
                    <div className={classes["label"]}>Please Choose</div>
                    <Radio.Group
                        onChange={(e) => {
                            handleChange(e);
                            showAlert(e);
                        }}
                        value={values?.licensedSpecialityType}
                        id="licensedSpecialityType"
                        name="licensedSpecialityType"
                        className={classes["radio-group"]}
                    >
                        {getLicensedSpecialityTypesList()?.map(
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
                                            values?.licensedSpecialityType ===
                                            value?.title
                                        }
                                    />
                                );
                            }
                        )}
                    </Radio.Group>
                    <FormikError name={"licensedSpecialityType"} />
                    <RetailError
                        error={
                            retailError[values?.visionPlan]?.licensedspeciality
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

export default connect(mapStateToProps)(LicensedSpecialityTypes);
