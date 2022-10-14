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
    const [lensPrices, setLensPrices] = useState([]);
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
                const questionsData = parsedJson?.questions?.find(
                    (item) => item.title === "VSP Signature"
                )?.question_permissions;

                const validations = CreateCalculatorValidations(questionsData);
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
    const getBaseValues = async (values) => {
        try {
            const planId = calculatorObj?.questions?.find(
                (item) => item.title === "VSP Signature"
            )?.id;
            const lensType = calculatorObj?.lens_types?.find(
                (item) => item.title === values?.lensType
            );
            const materialId = calculatorObj?.lens_material?.find((item) => {
                return item.lens_material_title === values?.lensMaterial;
            })?.id;
            let collectionId = null;
            lensType?.brands?.forEach((item) => {
                item.collections?.forEach((val) => {
                    if (val.title == values?.lensTypeValue) {
                        collectionId = val?.id;
                    }
                });
            });
            const payload = {
                collection_id: collectionId,
                lense_material_id: materialId,
                lense_type_id: lensType?.id,
                vision_plan_id: planId,
            };

            const res = await Axios.post("/api/get-lenses-price", payload);
            setLensPrices(res?.data?.data);
        } catch (err) {
            console.log("error while get data");
        }
    };

    const handleClick = (values, actions) => {
        getBaseValues(values);
        if (values?.benifitType === "") {
            setShowInvoice(true);
            const arrangedValues = GetMappedPayload(values);
            setCalValues(arrangedValues);
            submitBenifitType;
        } else if (values?.benifitType === BenifitTypeEnums?.frame) {
            const permission = calculatorObj?.questions
                ?.find((item) => item.title === "VSP Signature")
                ?.question_permissions?.find(
                    (ques) => ques.question === "Frame Order"
                )?.optional;
            if (!permission) {
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
            const permissions = calculatorObj?.questions?.find(
                (item) => item.title === "VSP Signature"
            )?.question_permissions;
            const validationObject = GetValidations(permissions, false);
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
                    calculatorObj?.questions?.find(
                        (item) => item.title === "VSP Signature"
                    )?.question_permissions
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
                        calculatorObj?.questions?.find(
                            (item) => item.title === "VSP Signature"
                        )?.question_permissions
                    }
                />
                <SunglassLens
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                    setCalValidations={setCalValidations}
                    calValidations={calValidations}
                    data={
                        calculatorObj?.questions?.find(
                            (item) => item.title === "VSP Signature"
                        )?.question_permissions
                    }
                />
                <AntireFlextive
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                    setCalValidations={setCalValidations}
                    calValidations={calValidations}
                    data={
                        calculatorObj?.questions?.find(
                            (item) => item.title === "VSP Signature"
                        )?.question_permissions
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
                                    lensPrices={lensPrices}
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
                                userInfo={userInfo}
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
                                            calculatorObj?.questions?.find(
                                                (item) =>
                                                    item.title ===
                                                    "VSP Signature"
                                            )?.question_permissions
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
                                            calculatorObj?.questions?.find(
                                                (item) =>
                                                    item.title ===
                                                    "VSP Signature"
                                            )?.question_permissions
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
                                                calculatorObj?.questions?.find(
                                                    (item) =>
                                                        item.title ===
                                                        "VSP Signature"
                                                )?.question_permissions
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
                                                    calculatorObj?.questions?.find(
                                                        (item) =>
                                                            item.title ===
                                                            "VSP Signature"
                                                    )?.question_permissions
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
                                                        calculatorObj?.questions?.find(
                                                            (item) =>
                                                                item.title ===
                                                                "VSP Signature"
                                                        )?.question_permissions
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
                                                        calculatorObj?.questions?.find(
                                                            (item) =>
                                                                item.title ===
                                                                "VSP Signature"
                                                        )?.question_permissions
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
                                                calculatorObj?.questions?.find(
                                                    (item) =>
                                                        item.title ===
                                                        "VSP Signature"
                                                )?.question_permissions
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
                            </div>
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
