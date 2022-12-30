import { Col, Radio, Row } from "antd";
import React from "react";
import { connect, useDispatch } from "react-redux";
import classes from "./chemistrieClip.module.scss";
import icon from "../../../../../images/calculator/chemistreClip.svg";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import CalculatorInput from "../frameOrder/components/calculatorInput/calculatorInput";
import QuestionIcon from "../questionIcon";
import * as Yup from "yup";
import {
    getAddons,
    getAddonsList,
} from "../antireFlextive/helpers/addonsHelper";
import * as action from "../../../../store/actions";
import RetailError from "../photochromics/components/retailError/retailError";
import { retailErrorMessage } from "../sunglassLens/helpers/constants";

const ChemistrieClip = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
    retailError,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const dispatch = useDispatch();
    const chemistrieVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Chemistrie Clip"
        )?.visibility;

    const handleActiveFields = () => {
        return CompareStrings(values?.isChemistrieClip, "No") ||
            (CompareStrings(values?.isChemistrieClip, "Yes") &&
                values?.chemistrieClipType)
            ? true
            : false;
    };
    const showAlert = (e) => {
        const material = getAddons(
            calculatorObj,
            "Chemistrie Clip",
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
                    type: "chemistrieClip",
                    error: retailErrorMessage("Chemistrie Clip"),
                    plan: values?.visionPlan,
                })
            );
        }
    };

    const handleChemistrieClipChange = async (e) => {
        handleChange(e);
        showAlert(e);
        if (CompareStrings(e?.target?.value, "Yes")) {
            const validationsObj = {};
            validationsObj.chemistrieClipType = Yup.string().required(
                "Chemistrie clip is required"
            );
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (CompareStrings(e?.target?.value, "No")) {
            await setFieldValue("chemistrieClipType", "");
            const validations = { ...calValidations };
            delete validations.chemistrieClipType;
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
            {chemistrieVisibility &&
                CompareStrings(values?.visionPlan, "Spectra") && (
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
                                    title={"Chemistrie Clip ?"}
                                    active={handleActiveFields()}
                                />
                                <Radio.Group
                                    onChange={handleChemistrieClipChange}
                                    value={values?.isChemistrieClip}
                                    id="isChemistrieClip"
                                    name="isChemistrieClip"
                                    className={classes["custom-radio"]}
                                >
                                    <CustomRadio
                                        label={"Yes"}
                                        value={"Yes"}
                                        active={CompareStrings(
                                            values?.isChemistrieClip,
                                            "Yes"
                                        )}
                                    />
                                    <CustomRadio
                                        label={"No"}
                                        value={"No"}
                                        active={CompareStrings(
                                            values?.isChemistrieClip,
                                            "No"
                                        )}
                                    />
                                </Radio.Group>
                                <FormikError name={"isChemistrieClip"} />{" "}
                                <RetailError
                                    error={
                                        retailError[values?.visionPlan]
                                            ?.chemistrieClip
                                    }
                                />
                                {CompareStrings(values?.isLensBenifit, "Yes") &&
                                    CompareStrings(
                                        values?.isChemistrieClip,
                                        "Yes"
                                    ) && (
                                        <CalculatorInput
                                            onChange={handleInputChange}
                                            value={values?.chemistrieClipType}
                                            name={"chemistrieClipType"}
                                        />
                                    )}
                            </div>
                        </Col>
                    </Row>
                )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
    retailError: state?.persistStore?.retailError,
});

export default connect(mapStateToProps)(ChemistrieClip);
