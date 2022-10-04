import React, { useEffect, useRef, useState } from "react";
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
import VisionBenifits, { GetValidations } from "../visionBenifits";
import classes from "./styles.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    BenifitTypeEnums,
    CalculatorInitialValues,
} from "../../data/initialValues";
import {
    CreateCalculatorValidations,
    GetMappedPayload,
    mappedEditValues,
} from "../../data/validationHelper";
import { useHistory } from "react-router";
import Axios from "../../../../Http";
import {
    FrameBenifitAvailableEnum,
    LensBenifitAvailableEnum,
} from "../../data/enums";

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
    let scrollRef = useRef();

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
                price_calculation_data: vpState?.price_calculation_data,
                shipping: vpState?.shipping,
                tax: vpState?.tax,
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

    const handleClick = (values, actions) => {
        if (values?.benifitType === "") {
            setShowInvoice(true);
            const arrangedValues = GetMappedPayload(values);
            setCalValues(arrangedValues);
            submitBenifitType;
        } else if (values?.benifitType === BenifitTypeEnums?.frame) {
            if (
                !calculatorObj?.questions["VSP Signature"]?.frameOrder?.optional
            ) {
                const validationObject = {
                    frameOrderType: Yup.string().required(
                        "Frame Order is required"
                    ),
                };
                setCalValidations({
                    ...calValidations,
                    ...validationObject,
                });
            }
            actions.setFieldValue("submitBenifitType", BenifitTypeEnums.frame);
            actions.setFieldValue("benifitType", "");
            window.scrollTo({
                behavior: "smooth",
                top: scrollRef.current.offsetTop,
            });
            actions.setErrors({});
            actions.setTouched({}, false);
        } else if (values?.benifitType === BenifitTypeEnums?.lens) {
            const validationObject = GetValidations(
                calculatorObj?.questions["VSP Signature"],
                false
            );
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
            actions.setFieldValue("submitBenifitType", BenifitTypeEnums.lens);
            actions.setFieldValue("benifitType", "");
            window.scrollTo({
                behavior: "smooth",
                top: scrollRef.current.offsetTop,
            });
            actions.setErrors({});
            actions.setTouched({}, false);
        }
    };
    const RenderFrameOrder = ({
        formProps,
        calculatorObj,
        setCalValidations,
        calValidations,
        isFrame = false,
    }) => {
        return (
            <FrameOrder
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
                data={
                    calculatorObj?.questions &&
                    calculatorObj?.questions["VSP Signature"]
                }
                isFrame={isFrame}
            />
        );
    };

    const RenderLensFields = ({
        formProps,
        calculatorObj,
        setCalValidations,
        calValidations,
    }) => {
        return (
            <>
                <LensType
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                />
                <LensMeterials
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                />
                <Photochromics
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                    setCalValidations={setCalValidations}
                    calValidations={calValidations}
                    data={
                        calculatorObj?.questions &&
                        calculatorObj?.questions["VSP Signature"]
                    }
                />
                <SunglassLens
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                    setCalValidations={setCalValidations}
                    calValidations={calValidations}
                    data={
                        calculatorObj?.questions &&
                        calculatorObj?.questions["VSP Signature"]
                    }
                />
                <AntireFlextive
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                    setCalValidations={setCalValidations}
                    calValidations={calValidations}
                    data={
                        calculatorObj?.questions &&
                        calculatorObj?.questions["VSP Signature"]
                    }
                />
            </>
        );
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
                                    calculatorObj={calculatorObj}
                                    invoiceId={editInvoiceState?.id || ""}
                                />
                            )}
                            <InvoiceInfo
                                formProps={formProps}
                                disable={
                                    formProps.values?.submitBenifitType ===
                                        BenifitTypeEnums.frame ||
                                    formProps.values?.submitBenifitType ===
                                        BenifitTypeEnums.lens
                                }
                            />
                            {(formProps.values?.submitBenifitType ===
                                BenifitTypeEnums.frame ||
                                formProps.values?.submitBenifitType ===
                                    BenifitTypeEnums.lens) && (
                                <div
                                    className={classes["private-pay-title"]}
                                    ref={scrollRef}
                                >{`Please choose ${getPrivatePayTitle(
                                    formProps.values?.submitBenifitType
                                )} under private pay.`}</div>
                            )}
                            {formProps.values?.submitBenifitType ===
                                BenifitTypeEnums.frame && (
                                <div className={classes["sub-container"]}>
                                    <RenderFrameOrder
                                        formProps={formProps}
                                        calculatorObj={
                                            calculatorObj && calculatorObj
                                        }
                                        setCalValidations={setCalValidations}
                                        calValidations={calValidations}
                                        data={
                                            calculatorObj?.data?.questions &&
                                            calculatorObj?.questions[
                                                "VSP Signature"
                                            ]
                                        }
                                        isFrame={true}
                                    />
                                </div>
                            )}
                            {formProps.values?.submitBenifitType ===
                                BenifitTypeEnums.lens && (
                                <div className={classes["sub-container"]}>
                                    <RenderLensFields
                                        formProps={formProps}
                                        calculatorObj={
                                            calculatorObj && calculatorObj
                                        }
                                        setCalValidations={setCalValidations}
                                        calValidations={calValidations}
                                        data={
                                            calculatorObj?.data?.questions &&
                                            calculatorObj?.questions[
                                                "VSP Signature"
                                            ]
                                        }
                                    />
                                </div>
                            )}

                            <div className={classes["sub-container"]}>
                                {formProps.values?.submitBenifitType !==
                                    BenifitTypeEnums.frame &&
                                formProps.values?.submitBenifitType !==
                                    BenifitTypeEnums.lens ? (
                                    <>
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
                                            setCalValidations={
                                                setCalValidations
                                            }
                                            calValidations={calValidations}
                                            data={
                                                calculatorObj?.data
                                                    ?.questions &&
                                                calculatorObj?.questions[
                                                    "VSP Signature"
                                                ]
                                            }
                                        />
                                        {formProps?.values?.isFrameBenifit ===
                                        FrameBenifitAvailableEnum.onlyThisTime ? (
                                            <></>
                                        ) : (
                                            <RenderFrameOrder
                                                formProps={formProps}
                                                calculatorObj={
                                                    calculatorObj &&
                                                    calculatorObj
                                                }
                                                setCalValidations={
                                                    setCalValidations
                                                }
                                                calValidations={calValidations}
                                                data={
                                                    calculatorObj?.questions &&
                                                    calculatorObj?.questions[
                                                        "VSP Signature"
                                                    ]
                                                }
                                            />
                                        )}
                                        {formProps?.values?.isLensBenifit ===
                                        LensBenifitAvailableEnum.onlyThisTime ? (
                                            <></>
                                        ) : (
                                            <>
                                                <LoweredCopay
                                                    formProps={formProps}
                                                    calculatorObj={
                                                        calculatorObj &&
                                                        calculatorObj
                                                    }
                                                    setCalValidations={
                                                        setCalValidations
                                                    }
                                                    calValidations={
                                                        calValidations
                                                    }
                                                    data={
                                                        calculatorObj?.questions &&
                                                        calculatorObj
                                                            ?.questions[
                                                            "VSP Signature"
                                                        ]
                                                    }
                                                />
                                                <RenderLensFields
                                                    formProps={formProps}
                                                    calculatorObj={
                                                        calculatorObj &&
                                                        calculatorObj
                                                    }
                                                    setCalValidations={
                                                        setCalValidations
                                                    }
                                                    calValidations={
                                                        calValidations
                                                    }
                                                    data={
                                                        calculatorObj?.questions &&
                                                        calculatorObj
                                                            ?.questions[
                                                            "VSP Signature"
                                                        ]
                                                    }
                                                />
                                            </>
                                        )}
                                        <ProtectionPlan
                                            formProps={formProps}
                                            calculatorObj={
                                                calculatorObj && calculatorObj
                                            }
                                            setCalValidations={
                                                setCalValidations
                                            }
                                            calValidations={calValidations}
                                            data={
                                                calculatorObj?.questions &&
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
                                    </>
                                ) : (
                                    <></>
                                )}
                                <button
                                    className={classes["submit-button"]}
                                    type={"submit"}
                                    disabled={
                                        formProps?.values?.isFrameBenifit ===
                                            FrameBenifitAvailableEnum.onlyThisTime &&
                                        formProps?.values?.isLensBenifit ===
                                            LensBenifitAvailableEnum.onlyThisTime
                                    }
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
const getPrivatePayTitle = (value) => {
    switch (value) {
        case BenifitTypeEnums.lens:
            return "lens";
        case BenifitTypeEnums.frame:
            return "frame";
    }
};
