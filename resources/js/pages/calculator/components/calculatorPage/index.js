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
import backArrow from "../../../../../images/black-arrow.svg";
import CustomLoader from "../../../../components/customLoader";
import CustomDiscount from "../customDiscount";
import { Col } from "antd";

export const defaultState = {
    "VSP Signature": {
        ...CalculatorInitialValues,
        visionPlan: "VSP Signature",
    },
    "VSP Choice": { ...CalculatorInitialValues, visionPlan: "VSP Choice" },
    "VSP Advantage": {
        ...CalculatorInitialValues,
        visionPlan: "VSP Advantage",
    },
    "Private Pay": {
        ...CalculatorInitialValues,
        visionPlan: "Private Pay",
        benifitType: "both",
    },
};
export const defaultValidationsState = {
    "VSP Signature": null,
    "VSP Choice": null,
    "VSP Advantage": null,
    "Private Pay": null,
};

const CalculatorScreen = () => {
    const history = useHistory();
    const [showInvoice, setShowInvoice] = useState(false);
    const [calculatorObj, setCalculatorObj] = useState(null);
    const [calValidations, setCalValidations] = useState(
        defaultValidationsState["VSP Signature"]
    );
    const [calValues, setCalValues] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [calculatorState, setCalculatorState] = useState(
        defaultState["VSP Signature"]
    );
    const [lensPrices, setLensPrices] = useState({});
    const [loading, setLoading] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [currentPlan, setCurrentPlan] = useState("VSP Signature");
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
                discount: vpState?.discount,
                addons: vpState?.addons,
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
                    (item) => item.title === values?.visionPlan
                )?.question_permissions;

                const validations = CreateCalculatorValidations(questionsData);
                setCalValidations(validations);
            }
        } else {
            const userDetails = history.location?.state?.user;
            setUserInfo(userDetails || {});
            getCalculatorObject(calculatorState);
        }
    }, [history?.location?.state]);
    const getCalculatorObject = async (values) => {
        setLoading(true);
        try {
            const res = await Axios.get(
                process.env.MIX_REACT_APP_URL + "/api/calculater-data"
            );
            const resData = res?.data?.data;
            const firstPlan = resData?.questions?.find(
                (item) => item?.title === (currentPlan || "VSP Signature")
            );
            const colRes = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/get-collections",
                { vision_plan_id: firstPlan?.id }
            );
            resData.lens_types = colRes?.data?.data?.collection;
            setCalculatorObj(resData);
            const questions = resData?.questions;
            const selectedPlan = questions?.find(
                (plan) => plan?.title === (currentPlan || "VSP Signature")
            );

            const validations = CreateCalculatorValidations(
                selectedPlan?.question_permissions
            );
            defaultValidationsState[currentPlan || "VSP Signature"] =
                validations;
            setCalValidations(validations);
            setLoading(false);
        } catch (err) {
            setLoading(true);
            console.log("error while fetching Data");
            setLoading(false);
        }
    };

    const HideInvoice = () => {
        setShowInvoice(false);
    };
    const getBaseValues = async (values) => {
        setButtonLoader(true);
        try {
            const planId = calculatorObj?.questions?.find(
                (item) => item.title === values?.visionPlan
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
                    if (item?.title === "Bifocal") {
                        if (val?.title !== "Aspherical/Spherical") {
                            if (val?.display_name) {
                                if (val.display_name == values?.lensTypeValue) {
                                    collectionId = val?.id;
                                }
                            } else {
                                if (val.title == values?.lensTypeValue) {
                                    collectionId = val?.id;
                                }
                            }
                        } else {
                            if (val?.lense_type_title === "biofocal") {
                                if (val?.display_name) {
                                    if (
                                        val.display_name ==
                                        values?.lensTypeValue
                                    ) {
                                        collectionId = val?.id;
                                    }
                                } else {
                                    if (val.title == values?.lensTypeValue) {
                                        collectionId = val?.id;
                                    }
                                }
                            }
                        }
                    } else if (item?.title === "Trifocal") {
                        if (val?.title !== "Aspherical/Spherical") {
                            if (val?.display_name) {
                                if (val.display_name == values?.lensTypeValue) {
                                    collectionId = val?.id;
                                }
                            } else {
                                if (val.title == values?.lensTypeValue) {
                                    collectionId = val?.id;
                                }
                            }
                        } else {
                            if (val?.lense_type_title === null) {
                                if (val?.display_name) {
                                    if (
                                        val.display_name ==
                                        values?.lensTypeValue
                                    ) {
                                        collectionId = val?.id;
                                    }
                                } else {
                                    if (val.title == values?.lensTypeValue) {
                                        collectionId = val?.id;
                                    }
                                }
                            }
                        }
                    } else {
                        if (val?.display_name) {
                            if (val.display_name == values?.lensTypeValue) {
                                collectionId = val?.id;
                            }
                        } else {
                            if (val.title == values?.lensTypeValue) {
                                collectionId = val?.id;
                            }
                        }
                    }
                });
            });
            const payload = {
                collection_id: collectionId,
                lense_material_id: materialId,
                lense_type_id: lensType?.id,
                vision_plan_id: planId,
            };

            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/get-lenses-price`,
                payload
            );
            setLensPrices(res?.data?.data);
            setButtonLoader(false);
        } catch (err) {
            console.log("error while get data");
            setButtonLoader(false);
        }
    };

    const handleClick = async (values, actions) => {
        await getBaseValues(values);
        if (values?.benifitType === "") {
            setShowInvoice(true);
            const arrangedValues = GetMappedPayload(values);
            setCalValues(arrangedValues);
        } else if (values?.benifitType === BenifitTypeEnums?.frame) {
            const permission =
                calculatorObj?.questions
                    ?.find((item) => item.title === values?.visionPlan)
                    ?.question_permissions?.find(
                        (ques) => ques.question === "Frame Order"
                    )?.optional === "true";
            if (permission) {
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
                (item) => item.title === values?.visionPlan
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
        } else if (values?.benifitType === BenifitTypeEnums?.both) {
            await actions.setFieldValue("submitBenifitType", "both");
            await actions.setFieldValue("benifitType", "");
            setShowInvoice(true);
            const arrangedValues = GetMappedPayload({
                ...values,
                submitBenifitType: "both",
            });
            setCalValues(arrangedValues);
        }
    };

    const handleBackClick = (formProps) => {
        const { setFieldValue, values } = formProps;
        if (values?.submitBenifitType === BenifitTypeEnums.frame) {
            const validations = { ...calValidations };
            delete validations.frameOrderType;
            setCalValidations({
                ...validations,
            });
        }

        if (values?.submitBenifitType === BenifitTypeEnums.lens) {
            const validations = { ...calValidations };
            delete validations.isloweredCopay;
            delete validations.lensType;
            delete validations.lensTypeValue;
            delete validations.lensMaterial;
            delete validations.isPhotochromics;
            delete validations.isSunglasses;
            delete validations.isAntireflective;
            setCalValidations({
                ...validations,
            });
        }
        setFieldValue("benifitType", values?.submitBenifitType);
        setFieldValue("submitBenifitType", "");
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
                        (item) => item.title === formProps?.values?.visionPlan
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
        return loading == true ? (
            <CustomLoader buttonBool={false} />
        ) : (
            <>
                <LensType
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                    setCalculatorObj={setCalculatorObj}
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
                            (item) =>
                                item.title === formProps?.values?.visionPlan
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
                            (item) =>
                                item.title === formProps?.values?.visionPlan
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
                            (item) =>
                                item.title === formProps?.values?.visionPlan
                        )?.question_permissions
                    }
                />
            </>
        );
    };
    return (
        <Col className={classes["container"]} sm={24} md={24} lg={18}>
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

                            {formProps.values?.submitBenifitType ===
                                BenifitTypeEnums.frame && (
                                <div className={classes["sub-container"]}>
                                    {(formProps.values?.submitBenifitType ===
                                        BenifitTypeEnums.frame ||
                                        formProps.values?.submitBenifitType ===
                                            BenifitTypeEnums.lens) && (
                                        <>
                                            <div
                                                className={
                                                    classes["back-container"]
                                                }
                                                onClick={() =>
                                                    handleBackClick(formProps)
                                                }
                                            >
                                                <img
                                                    src={backArrow}
                                                    alt={"back icon"}
                                                    className={
                                                        classes["back-icon"]
                                                    }
                                                />
                                                <div
                                                    className={
                                                        classes["back-text"]
                                                    }
                                                >
                                                    Back
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    classes["private-pay-title"]
                                                }
                                                ref={scrollRef}
                                            >{`Please choose ${getPrivatePayTitle(
                                                formProps.values
                                                    ?.submitBenifitType
                                            )} under private pay.`}</div>
                                        </>
                                    )}
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
                                                    formProps?.values
                                                        ?.visionPlan
                                            )?.question_permissions
                                        }
                                        isFrame={true}
                                    />
                                </div>
                            )}
                            {formProps.values?.submitBenifitType ===
                                BenifitTypeEnums.lens && (
                                <div className={classes["sub-container"]}>
                                    {(formProps.values?.submitBenifitType ===
                                        BenifitTypeEnums.frame ||
                                        formProps.values?.submitBenifitType ===
                                            BenifitTypeEnums.lens) && (
                                        <>
                                            <div
                                                className={
                                                    classes["back-container"]
                                                }
                                                onClick={() =>
                                                    handleBackClick(formProps)
                                                }
                                            >
                                                <img
                                                    src={backArrow}
                                                    alt={"back icon"}
                                                    className={
                                                        classes["back-icon"]
                                                    }
                                                />
                                                <div
                                                    className={
                                                        classes["back-text"]
                                                    }
                                                >
                                                    Back
                                                </div>
                                            </div>

                                            <div
                                                className={
                                                    classes["private-pay-title"]
                                                }
                                                ref={scrollRef}
                                            >{`Please choose ${getPrivatePayTitle(
                                                formProps.values
                                                    ?.submitBenifitType
                                            )} under private pay.`}</div>
                                        </>
                                    )}
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
                                                    formProps?.values
                                                        ?.visionPlan
                                            )?.question_permissions
                                        }
                                    />
                                </div>
                            )}
                            {(formProps.values?.submitBenifitType === "" ||
                                formProps.values?.visionPlan ===
                                    "Private Pay") && (
                                <div className={classes["sub-container"]}>
                                    {formProps.values?.submitBenifitType !==
                                        BenifitTypeEnums.frame &&
                                    formProps.values?.submitBenifitType !==
                                        BenifitTypeEnums.lens ? (
                                        <>
                                            <SelectVisionPlan
                                                setCalculatorObj={
                                                    setCalculatorObj
                                                }
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
                                                            formProps?.values
                                                                ?.visionPlan
                                                    )?.question_permissions
                                                }
                                                setCurrentPlan={setCurrentPlan}
                                                setCalculatorState={
                                                    setCalculatorState
                                                }
                                            />
                                            <VisionBenifits
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
                                                            formProps?.values
                                                                ?.visionPlan
                                                    )?.question_permissions
                                                }
                                            />
                                            {formProps?.values
                                                ?.isFrameBenifit ===
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
                                                    calValidations={
                                                        calValidations
                                                    }
                                                    data={
                                                        calculatorObj?.questions?.find(
                                                            (item) =>
                                                                item.title ===
                                                                formProps
                                                                    ?.values
                                                                    ?.visionPlan
                                                        )?.question_permissions
                                                    }
                                                />
                                            )}
                                            {formProps?.values
                                                ?.isLensBenifit ===
                                            LensBenifitAvailableEnum.onlyThisTime ? (
                                                <></>
                                            ) : (
                                                <>
                                                    {formProps?.values
                                                        ?.visionPlan !==
                                                        "Private Pay" && (
                                                        <LoweredCopay
                                                            formProps={
                                                                formProps
                                                            }
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
                                                                        formProps
                                                                            ?.values
                                                                            ?.visionPlan
                                                                )
                                                                    ?.question_permissions
                                                            }
                                                        />
                                                    )}
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
                                                                    formProps
                                                                        ?.values
                                                                        ?.visionPlan
                                                            )
                                                                ?.question_permissions
                                                        }
                                                    />
                                                </>
                                            )}
                                            <ProtectionPlan
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
                                                            formProps?.values
                                                                ?.visionPlan
                                                    )?.question_permissions
                                                }
                                            />
                                            <GlassesProtection
                                                formProps={formProps}
                                                calculatorObj={
                                                    calculatorObj &&
                                                    calculatorObj
                                                }
                                            />
                                            <CustomDiscount
                                                formProps={formProps}
                                                calculatorObj={
                                                    calculatorObj &&
                                                    calculatorObj
                                                }
                                                setCalValidations={
                                                    setCalValidations
                                                }
                                                calValidations={calValidations}
                                                calculatorState={
                                                    calculatorState
                                                }
                                            />
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
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
                                {buttonLoader == true ? (
                                    <span>
                                        <p>Create Invoice</p>
                                        <CustomLoader buttonBool={true} />
                                    </span>
                                ) : (
                                    "Create Invoice"
                                )}
                            </button>
                        </form>
                    );
                }}
            </Formik>
        </Col>
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
