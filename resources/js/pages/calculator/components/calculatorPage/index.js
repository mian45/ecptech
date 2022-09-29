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
    mappedEditValues,
} from "../../data/validationHelper";
import { useHistory } from "react-router";
import Axios from "../../../../Http";

const CalculatorScreen = () => {
    const history = useHistory();
    const [showInvoice, setShowInvoice] = useState(false);
    const [calculatorObj, setCalculatorObj] = useState(null);
    const [calValidations, setCalValidations] = useState(null);
    const [calValues, setCalValues] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [calculatorState, setCalculatorState] = useState({
        ...CalculatorInitialValues,
    });
    const editInvoiceState = history?.location?.state?.invoice;

    useEffect(() => {
        if (editInvoiceState?.id) {
            const values = mappedEditValues(editInvoiceState);
            setCalculatorState({ ...values });
            const vpState = JSON.parse(editInvoiceState?.vp_state);

            const editUserInfo = {
                dob: editInvoiceState?.customer?.dob,
                email: editInvoiceState?.customer?.email,
                firstName: editInvoiceState?.customer?.fname,
                lastName: editInvoiceState?.customer?.lname,
                phoneNo: editInvoiceState?.customer?.phone,
            };
            setUserInfo({ ...editUserInfo });
            const editCalObject = {
                lens_material: vpState?.lens_material,
                lens_types: vpState?.lens_types,
                questions: vpState?.questions,
                sheet_data: vpState?.sheet_data,
                shipping: vpState?.shipping,
            };
            setCalculatorObj(editCalObject);
            if (editInvoiceState && editInvoiceState?.vp_state) {
                const parsedJson = JSON.parse(editInvoiceState?.vp_state);
                const questionsData = parsedJson?.questions;
                const validations = CreateCalculatorValidations(
                    questionsData["VSP Signature"]
                );
                setCalValidations(validations);
            }
        } else {
            const userDetails = history.location?.state?.user;
            setUserInfo(userDetails || {});
            getCalculatorObject();
        }
    }, [history?.location?.state]);
    const getCalculatorObject = async () => {
        try {
            const res = await Axios.get("/api/calculater-data");
            setCalculatorObj(res?.data?.data);
            const questions = res?.data?.data?.questions;
            const validations = CreateCalculatorValidations(
                questions && questions["VSP Signature"]
            );
            setCalValidations(validations);
        } catch (err) {
            console.log("error while fetching Data");
        }
    };

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
                initialValues={{ ...calculatorState }}
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
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
                                    invoiceId={editInvoiceState?.id || ""}
                                />
                            )}
                            <InvoiceInfo formProps={formProps} />
                            <div className={classes["sub-container"]}>
                                <SelectVisionPlan
                                    formProps={formProps}
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
                                />
                                <VisionBenifits
                                    formProps={formProps}
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
                                />
                                <FrameOrder
                                    formProps={formProps}
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
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
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
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
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
                                />
                                <LensMeterials
                                    formProps={formProps}
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
                                />
                                <Photochromics
                                    formProps={formProps}
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
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
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
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
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
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
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
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
                                    calculatorObj={
                                        calculatorObj && calculatorObj
                                    }
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
