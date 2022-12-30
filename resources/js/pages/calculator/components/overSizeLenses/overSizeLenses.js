import { Col, Radio, Row } from "antd";
import React from "react";
import { connect, useDispatch } from "react-redux";
import classes from "./overSizeLenses.module.scss";
import icon from "../../../../../images/calculator/overSize.svg";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import CalculatorInput from "../frameOrder/components/calculatorInput/calculatorInput";
import QuestionIcon from "../questionIcon";
import * as Yup from "yup";
import * as action from "../../../../store/actions";
import { retailErrorMessage } from "../sunglassLens/helpers/constants";
import { getAddons } from "../antireFlextive/helpers/addonsHelper";
import RetailError from "../photochromics/components/retailError/retailError";

const OverSizeLenses = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
    retailError,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const dispatch = useDispatch();
    const overSizeVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Oversize Lenses"
        )?.visibility;

    const handleActiveFields = () => {
        return CompareStrings(values?.isOverSizeLens, "No") ||
            (CompareStrings(values?.isOverSizeLens, "Yes") &&
                values?.overSizeLenseType)
            ? true
            : false;
    };

    const showAlert = (e) => {
        const material = getAddons(
            calculatorObj,
            "Oversize Lenses",
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
                    type: "overSizeLens",
                    error: retailErrorMessage("Oversize Lenses"),
                    plan: values?.visionPlan,
                })
            );
        }
    };

    const handleOverSizeChange = async (e) => {
        handleChange(e);
        showAlert(e);
        if (CompareStrings(e?.target?.value, "Yes")) {
            const validationsObj = {};
            validationsObj.overSizeLenseType = Yup.string().required(
                "Oversize lenses is required"
            );
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (CompareStrings(e?.target?.value, "No")) {
            await setFieldValue("overSizeLenseType", "");
            const validations = { ...calValidations };
            delete validations.overSizeLenseType;
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
            {overSizeVisibility &&
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
                                    title={"Oversize Lenses ?"}
                                    active={handleActiveFields()}
                                />
                                <Radio.Group
                                    onChange={handleOverSizeChange}
                                    value={values?.isOverSizeLens}
                                    id="isOverSizeLens"
                                    name="isOverSizeLens"
                                    className={classes["custom-radio"]}
                                >
                                    <CustomRadio
                                        label={"Yes"}
                                        value={"Yes"}
                                        active={CompareStrings(
                                            values?.isOverSizeLens,
                                            "Yes"
                                        )}
                                    />
                                    <CustomRadio
                                        label={"No"}
                                        value={"No"}
                                        active={CompareStrings(
                                            values?.isOverSizeLens,
                                            "No"
                                        )}
                                    />
                                </Radio.Group>
                                <FormikError name={"isOverSizeLens"} />
                                <RetailError
                                    error={
                                        retailError[values?.visionPlan]
                                            ?.overSizeLens
                                    }
                                />
                                {CompareStrings(values?.isLensBenifit, "Yes") &&
                                    CompareStrings(
                                        values?.isOverSizeLens,
                                        "Yes"
                                    ) && (
                                        <CalculatorInput
                                            onChange={handleInputChange}
                                            value={values?.overSizeLenseType}
                                            name={"overSizeLenseType"}
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

export default connect(mapStateToProps)(OverSizeLenses);
