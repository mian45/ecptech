import { Col, Radio, Row } from "antd";
import React from "react";
import { connect, useDispatch } from "react-redux";
import classes from "./edgeCoating.module.scss";
import icon from "../../../../../images/calculator/edgeCoating.svg";
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

const EdgeCoating = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
    retailError,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const dispatch = useDispatch();
    const edgeCoatingVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Edge Coating"
        )?.visibility;

    const handleActiveFields = () => {
        return CompareStrings(values?.isEdgeCoating, "No") ||
            (CompareStrings(values?.isEdgeCoating, "Yes") &&
                values?.edgeCoatingType)
            ? true
            : false;
    };
    const showAlert = (e) => {
        const material = getAddons(
            calculatorObj,
            "Edge Coating",
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
                    type: "edgeCoating",
                    error: retailErrorMessage("Edge Coating"),
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
            validationsObj.edgeCoatingType = Yup.string().required(
                "Edge coating is required"
            );
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (CompareStrings(e?.target?.value, "No")) {
            await setFieldValue("edgeCoatingType", "");
            const validations = { ...calValidations };
            delete validations.edgeCoatingType;
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
            {edgeCoatingVisibility &&
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
                                    title={"Edge Coating ?"}
                                    active={handleActiveFields()}
                                />
                                <Radio.Group
                                    onChange={handleEdgeCoatingChange}
                                    value={values?.isEdgeCoating}
                                    id="isEdgeCoating"
                                    name="isEdgeCoating"
                                    className={classes["custom-radio"]}
                                >
                                    <CustomRadio
                                        label={"Yes"}
                                        value={"Yes"}
                                        active={CompareStrings(
                                            values?.isEdgeCoating,
                                            "Yes"
                                        )}
                                    />
                                    <CustomRadio
                                        label={"No"}
                                        value={"No"}
                                        active={CompareStrings(
                                            values?.isEdgeCoating,
                                            "No"
                                        )}
                                    />
                                </Radio.Group>
                                <FormikError name={"isEdgeCoating"} />
                                <RetailError
                                    error={
                                        retailError[values?.visionPlan]
                                            ?.edgeCoating
                                    }
                                />
                                {CompareStrings(values?.isLensBenifit, "Yes") &&
                                    CompareStrings(
                                        values?.isEdgeCoating,
                                        "Yes"
                                    ) && (
                                        <CalculatorInput
                                            onChange={handleInputChange}
                                            value={values?.edgeCoatingType}
                                            name={"edgeCoatingType"}
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

export default connect(mapStateToProps)(EdgeCoating);
