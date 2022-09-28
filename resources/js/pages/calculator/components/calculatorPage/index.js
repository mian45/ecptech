import React, { useEffect, useState } from "react";
import AntireFlextive from "../antireFlextive";
import FrameOrder from "../frameOrder";
import GlassesProtection from "../glassesProtection";
import InvoiceInfo from "../invoiceInfo";
import LensMeterials from "../lensMeterial";
import LensType from "../lensType";
import LoweredCopay from "../loweredCopay";
import Photochromics from "../photochromics";
import ProtectionPlan from "../protectionPlan";
import SelectVisionPlan from "../selectVisionPlan";
import SunglassLens from "../sunglassLens";
import ViewInvoice from "../viewInvoice";
import VisionBenifits from "../visionBenifits";
import classes from "./styles.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { CalculatorInitialValues } from "../../data/initialValues";
import { calculatorObject } from "../../data/dataObject";
import {
    CreateCalculatorValidations,
    GetMappedPayload,
} from "../../data/validationHelper";
import { useHistory } from "react-router";
import Axios from "../../../../Http";

const CalculatorScreen = () => {
    const history = useHistory();
    const [showInvoice, setShowInvoice] = useState(false);
    const [calculatorObj, setCalculatorObj] = useState(calculatorObject?.data);
    const [calValidations, setCalValidations] = useState(null);
    const [calValues, setCalValues] = useState(null);
    const userInfo = history.location?.state;
    useEffect(() => {
        const getCalculatorObject = async () => {
            try {
                const res = await Axios.get("/api/calculater-data");
                console.log("res", res);
            } catch (err) {
                console.log("error while fetching Data");
            }
        };
        getCalculatorObject();

        if (calculatorObject?.data?.questions) {
            const validations = CreateCalculatorValidations(
                calculatorObj?.questions["VSP Signature"]
            );
            setCalValidations(validations);
        }
    }, []);

    const HideInvoice = () => {
        setShowInvoice(false);
    };

    const handleClick = (values) => {
        setShowInvoice(true);
        const arrangedValues = GetMappedPayload(values);
        setCalValues(arrangedValues);
    };
    return (
        <div className={classes["container"]}>
            <Formik
                initialValues={CalculatorInitialValues}
                validationSchema={Yup.object().shape({ ...calValidations })}
                onSubmit={handleClick}
                enableReinitialize
            >
                {(formProps) => {
                    return (
                        <form
                            onSubmit={formProps.handleSubmit}
                            autoComplete="off"
                        >
                            {showInvoice && (
                                <ViewInvoice
                                    onClose={HideInvoice}
                                    calValues={calValues}
                                    userInfo={userInfo}
                                />
                            )}
                            <InvoiceInfo formProps={formProps} />
                            <div className={classes["sub-container"]}>
                                <SelectVisionPlan
                                    formProps={formProps}
                                    calculatorObj={calculatorObj}
                                />
                                <VisionBenifits
                                    formProps={formProps}
                                    calculatorObj={calculatorObj}
                                />
                                <FrameOrder
                                    formProps={formProps}
                                    calculatorObj={calculatorObj}
                                    setCalValidations={setCalValidations}
                                    calValidations={calValidations}
                                    data={
                                        calculatorObject?.data?.questions &&
                                        calculatorObj?.questions[
                                            "VSP Signature"
                                        ]
                                    }
                                />
                                <LoweredCopay
                                    formProps={formProps}
                                    calculatorObj={calculatorObj}
                                    setCalValidations={setCalValidations}
                                    calValidations={calValidations}
                                    data={
                                        calculatorObject?.data?.questions &&
                                        calculatorObj?.questions[
                                            "VSP Signature"
                                        ]
                                    }
                                />
                                <LensType
                                    formProps={formProps}
                                    calculatorObj={calculatorObj}
                                />
                                <LensMeterials
                                    formProps={formProps}
                                    calculatorObj={calculatorObj}
                                />
                                <Photochromics
                                    formProps={formProps}
                                    calculatorObj={calculatorObj}
                                    setCalValidations={setCalValidations}
                                    calValidations={calValidations}
                                    data={
                                        calculatorObject?.data?.questions &&
                                        calculatorObj?.questions[
                                            "VSP Signature"
                                        ]
                                    }
                                />
                                <SunglassLens
                                    formProps={formProps}
                                    calculatorObj={calculatorObj}
                                    setCalValidations={setCalValidations}
                                    calValidations={calValidations}
                                    data={
                                        calculatorObject?.data?.questions &&
                                        calculatorObj?.questions[
                                            "VSP Signature"
                                        ]
                                    }
                                />
                                <AntireFlextive
                                    formProps={formProps}
                                    calculatorObj={calculatorObj}
                                    setCalValidations={setCalValidations}
                                    calValidations={calValidations}
                                    data={
                                        calculatorObject?.data?.questions &&
                                        calculatorObj?.questions[
                                            "VSP Signature"
                                        ]
                                    }
                                />
                                <ProtectionPlan
                                    formProps={formProps}
                                    calculatorObj={calculatorObj}
                                    setCalValidations={setCalValidations}
                                    calValidations={calValidations}
                                    data={
                                        calculatorObject?.data?.questions &&
                                        calculatorObj?.questions[
                                            "VSP Signature"
                                        ]
                                    }
                                />
                                <GlassesProtection
                                    formProps={formProps}
                                    calculatorObj={calculatorObj}
                                />
                                <button
                                    className={classes["submit-button"]}
                                    type={"submit"}
                                >
                                    Create Invoice
                                </button>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default CalculatorScreen;
