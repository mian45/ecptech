import { Col, Radio, Row } from "antd";
import React from "react";
import { connect, useDispatch } from "react-redux";
import classes from "./miscLensOptions.module.scss";
import icon from "../../../../../images/calculator/lensOption.svg";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import CalculatorInput from "../frameOrder/components/calculatorInput/calculatorInput";
import QuestionIcon from "../questionIcon";
import * as Yup from "yup";
import { getAddons } from "../antireFlextive/helpers/addonsHelper";
import RetailError from "../photochromics/components/retailError/retailError";
import * as action from "../../../../store/actions";
import { retailErrorMessage } from "../sunglassLens/helpers/constants";

const MiscLensOptions = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
    retailError,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const dispatch = useDispatch();
    const lensOptionVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Miscellaneous Lens Options"
        )?.visibility;

    const handleActiveFields = () => {
        return CompareStrings(values?.islensOptions, "No") ||
            (CompareStrings(values?.islensOptions, "Yes") &&
                values?.lensOptionsType)
            ? true
            : false;
    };
    const showAlert = (e) => {
        const material = getAddons(
            calculatorObj,
            "Miscellaneous Lens Options",
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
                    type: "lensOptions",
                    error: retailErrorMessage("Miscellaneous Lens Options"),
                    plan: values?.visionPlan,
                })
            );
        }
    };
    const handleEdgeCoatingChange = async (e) => {
        handleChange(e);
        showAlert(e);
        if (CompareStrings(e?.target?.value, "Yes")) {
            const validationsObj = {};
            validationsObj.lensOptionsType = Yup.string().required(
                "Miscellaneous Lens Options is required"
            );
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (CompareStrings(e?.target?.value, "No")) {
            await setFieldValue("lensOptionsType", "");
            const validations = { ...calValidations };
            delete validations.lensOptionsType;
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
            {lensOptionVisibility &&
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
                                    title={"Miscellaneous Lens Options ?"}
                                    active={handleActiveFields()}
                                />
                                <Radio.Group
                                    onChange={handleEdgeCoatingChange}
                                    value={values?.islensOptions}
                                    id="islensOptions"
                                    name="islensOptions"
                                    className={classes["custom-radio"]}
                                >
                                    <CustomRadio
                                        label={"Yes"}
                                        value={"Yes"}
                                        active={CompareStrings(
                                            values?.islensOptions,
                                            "Yes"
                                        )}
                                    />
                                    <CustomRadio
                                        label={"No"}
                                        value={"No"}
                                        active={CompareStrings(
                                            values?.islensOptions,
                                            "No"
                                        )}
                                    />
                                </Radio.Group>
                                <FormikError name={"islensOptions"} />{" "}
                                <RetailError
                                    error={
                                        retailError[values?.visionPlan]
                                            ?.lensOptions
                                    }
                                />
                                {CompareStrings(values?.isLensBenifit, "Yes") &&
                                    CompareStrings(
                                        values?.islensOptions,
                                        "Yes"
                                    ) && (
                                        <CalculatorInput
                                            onChange={handleInputChange}
                                            value={values?.lensOptionsType}
                                            name={"lensOptionsType"}
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

export default connect(mapStateToProps)(MiscLensOptions);
