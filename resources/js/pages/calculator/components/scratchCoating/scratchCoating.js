import { Col, Radio, Row } from "antd";
import React from "react";
import { connect, useDispatch } from "react-redux";
import classes from "./scratchCoating.module.scss";
import icon from "../../../../../images/calculator/scratchCoating.svg";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import QuestionIcon from "../questionIcon";
import { getAddons } from "../antireFlextive/helpers/addonsHelper";
import RetailError from "../photochromics/components/retailError/retailError";
import * as action from "../../../../store/actions";
import { retailErrorMessage } from "../sunglassLens/helpers/constants";

const ScratchCoating = ({
    formProps,
    calculatorObj,
    language,
    retailError,
}) => {
    const { values, handleChange } = formProps;
    const dispatch = useDispatch();
    const scratchVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Scratch Coating"
        )?.visibility;

    const handleActiveFields = () => {
        return values?.scratchCoating ? true : false;
    };

    const showAlert = (e) => {
        const material = getAddons(
            calculatorObj,
            "Scratch Coating",
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
                    type: "scratchCoating",
                    error: retailErrorMessage("Scratch Coating"),
                    plan: values?.visionPlan,
                })
            );
        }
    };

    return (
        <>
            {scratchVisibility &&
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
                                    title={"Scratch Coating ?"}
                                    active={handleActiveFields()}
                                />
                                <Radio.Group
                                    onChange={(e) => {
                                        handleChange(e);
                                        showAlert(e);
                                    }}
                                    value={values?.scratchCoating}
                                    id="scratchCoating"
                                    name="scratchCoating"
                                    className={classes["custom-radio"]}
                                >
                                    <CustomRadio
                                        label={"Yes"}
                                        value={"Yes"}
                                        active={CompareStrings(
                                            values?.scratchCoating,
                                            "Yes"
                                        )}
                                    />
                                    <CustomRadio
                                        label={"No"}
                                        value={"No"}
                                        active={CompareStrings(
                                            values?.scratchCoating,
                                            "No"
                                        )}
                                    />
                                </Radio.Group>
                                <FormikError name={"scratchCoating"} />{" "}
                                <RetailError
                                    error={
                                        retailError[values?.visionPlan]
                                            ?.scratchCoating
                                    }
                                />
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

export default connect(mapStateToProps)(ScratchCoating);
