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
import VisionBenifits from "../visionBenifits";
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
import { Col, message } from "antd";
import { ScrollToFieldError } from "./helpers/scrollToFieldError";
import AdditionalLensTreatment from "../additionalLensTreatment/additionalLensTreatment";
import TracingFee from "../tracingFee/tracingFee";
import BlueLightFiltering from "../blueLightFiltering/blueLightFiltering";
import InvoicePriceAlert from "../invoicePriceAlert";
import { connect, useDispatch } from "react-redux";
import * as action from "../../../../store/actions";
import { handleLensBenifitYesValidations } from "../visionBenifits/helpers/handleLensBenifitsYesValidations";
import { handleFrameBenifitYes } from "../visionBenifits/helpers/handleFrameBenifitYes";

const CalculatorScreen = ({ retailPopup }) => {
    const history = useHistory();
    const [messageApi, contextHolder] = message.useMessage();
    const [validationsList, setValidationsList] = useState(null);
    const [defaultValues, setDefaultValues] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);
    const [calculatorObj, setCalculatorObj] = useState(null);
    const [calValidations, setCalValidations] = useState(null);

    const [calValues, setCalValues] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [calculatorState, setCalculatorState] = useState(null);

    const [lensPrices, setLensPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [noPlanFound, setNoPlanFound] = useState(false);
    const [davisMaterials, setDavisMaterials] = useState([]);
    const editInvoiceState = history?.location?.state?.invoice;
    let scrollRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (editInvoiceState?.id) {
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
                tracing_fee: vpState?.tracing_fee,
                additional_lense_setting: vpState?.additional_lense_setting,
            };
            setCalculatorObj(editCalObject);
            if (editInvoiceState && editInvoiceState?.vp_state) {
                const userSelection = JSON.parse(editInvoiceState.user_state);
                const initialPlan = userSelection?.visionPlan;

                let allValues = {};
                vpState?.questions?.forEach((item) => {
                    if (item.title === "Private Pay") {
                        allValues[item.title] = {
                            ...CalculatorInitialValues,
                            visionPlan: item?.title,
                            benifitType: "both",
                        };
                    } else {
                        allValues[item.title] = {
                            ...CalculatorInitialValues,
                            visionPlan: item?.title,
                        };
                    }
                });
                allValues[initialPlan] = mappedEditValues(editInvoiceState);
                setDefaultValues(allValues);
                setCalculatorState(allValues[initialPlan]);
                manageValidationObject(vpState?.questions, initialPlan);
                dispatch(action.calculatorPopUp(initialPlan))
            }
            getBaseValues(mappedEditValues(editInvoiceState), editCalObject);
            setLoading(false);
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
            if (!resData?.questions || resData?.questions.length === 0) {
                setNoPlanFound(true);
                setLoading(false);
                return;
            }
            const initialPlan = resData?.questions[0]?.title;
            const firstPlan = resData?.questions?.find(
                (item) => item?.title === initialPlan
            );
            dispatch(action.calculatorPopUp(firstPlan))
            const colRes = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/get-collections",
                { vision_plan_id: firstPlan?.id }
            );
            resData.lens_types = colRes?.data?.data?.collection;
            resData.additional_lense_setting = [];

            setDavisMaterials(colRes?.data?.data?.lense_materials || []);
            setCalculatorObj(resData);
            const questions = resData?.questions;

            let allValues = {};
            questions?.forEach((item) => {
                if (item.title === "Private Pay") {
                    allValues[item.title] = {
                        ...CalculatorInitialValues,
                        visionPlan: item?.title,
                        benifitType: "both",
                    };
                } else {
                    allValues[item.title] = {
                        ...CalculatorInitialValues,
                        visionPlan: item?.title,
                    };
                }
            });
            setDefaultValues(allValues);
            setCalculatorState(allValues[initialPlan]);
            manageValidationObject(questions, initialPlan);
            setLoading(false);
        } catch (err) {
            console.log("error while fetching Data");
        }
    };

    const manageValidationObject = (question, initialPlan) => {
        let allValidations = {};
        question?.forEach((item) => {
            const validations = CreateCalculatorValidations(
                item?.question_permissions
            );
            if (item?.title === "Private Pay") {
                delete validations?.isLoweredCopay;
                delete validations?.isLensBenifit;
                delete validations?.isFrameBenifit;
            } else if (
                item?.title === "Eyemed" ||
                item?.title === "Davis Vision"
            ) {
                if (item?.title === "Eyemed") {
                    delete validations?.isLoweredCopay;
                }
                const slabOff =
                    item?.question_permissions?.find(
                        (ques) => ques?.question == "Slab Off"
                    )?.optional === "true";
                const specialityLens =
                    item?.question_permissions?.find(
                        (ques) => ques?.question == "Speciality Lens"
                    )?.optional === "true";
                const polish =
                    item?.question_permissions?.find(
                        (ques) => ques?.question == "Polish"
                    )?.optional === "true";
                if (slabOff || specialityLens || polish) {
                    validations.isAdditionalLensOptions = Yup.string().required(
                        "Additional lens options is required"
                    );
                } else {
                    delete validations.isAdditionalLensOptions;
                }
                const blueLight =
                    item?.question_permissions?.find(
                        (ques) => ques?.question == "Blue Light Filtering"
                    )?.optional === "true";
                if (item?.title === "Davis Vision" && blueLight) {
                    validations.blueLight = Yup.string().required(
                        "Blue light filtering is required"
                    );
                }
            }
            allValidations[item.title] = validations;
        });
        setValidationsList(allValidations);
        setCalValidations(allValidations[initialPlan]);
    };

    const HideInvoice = () => {
        setShowInvoice(false);
    };
    const getBaseValues = async (values, calculatorObj) => {
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
                item?.collections?.forEach((val) => {
                    if (val?.title == values?.lensTypeValue) {
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
        if (values?.benifitType === "") {
            setShowInvoice(true);
            const arrangedValues = GetMappedPayload(values);
            setCalValues(arrangedValues);
        } else if (values?.benifitType === BenifitTypeEnums?.frame) {
            const permission = calculatorObj?.questions?.find(
                (item) => item?.title === values?.visionPlan
            )?.question_permissions;

            const validationObject = handleFrameBenifitYes(
                permission,
                false,
                values
            );
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
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
            const validationObject = handleLensBenifitYesValidations(
                permissions,
                false,
                values
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
            delete validations.isLoweredCopay;
            delete validations.lensType;
            if (values.lensType) {
                delete validations.lensTypeValue;
            }
            delete validations.lensMaterial;
            delete validations.isPhotochromics;
            delete validations.isSunglasses;
            delete validations.isAntireflective;
            delete validations.antireflectiveType;
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
        return (
            <>
                <LensType
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                    setCalculatorObj={setCalculatorObj}
                    setCalValidations={setCalValidations}
                    calValidations={calValidations}
                    getBaseValues={getBaseValues}
                />
                <LensMeterials
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                    getBaseValues={getBaseValues}
                    setCalValidations={setCalValidations}
                    calValidations={calValidations}
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
                <BlueLightFiltering
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                    setCalValidations={setCalValidations}
                    calValidations={calValidations}
                    data={
                        calculatorObj?.questions?.find(
                            (item) =>
                                item?.title === formProps?.values?.visionPlan
                        )?.question_permissions
                    }
                />
                <AdditionalLensTreatment
                    formProps={formProps}
                    calculatorObj={calculatorObj && calculatorObj}
                    setCalValidations={setCalValidations}
                    calValidations={calValidations}
                    data={
                        calculatorObj?.questions?.find(
                            (item) =>
                                item?.title === formProps?.values?.visionPlan
                        )?.question_permissions
                    }
                />
            </>
        );
    };
    const handleSaveClick = (dontShow) => {
        if (dontShow) {
            const calculatorData = {
                invoicePriceData: true,
            };
            localStorage.setItem(
                "CALCULATOR_DATA",
                JSON.stringify(calculatorData)
            );
            dispatch(action.showRetailPopup());
        } else {
            dispatch(action.showRetailPopup());
        }
    };
    const RenderModal = React.useMemo(() => {
        return (
            <>
                {retailPopup && (
                    <InvoicePriceAlert
                        accept={handleSaveClick}
                        cancel={() => {
                            dispatch(action.showRetailPopup());
                        }}
                        open={retailPopup}
                    />
                )}
            </>
        );
    }, [retailPopup]);
    return (
        <Col className={classes["container"]} sm={24} md={24} lg={18}>
            <div>{contextHolder}</div>
            {loading ? (
                <>
                    <CustomLoader buttonBool={false} />
                </>
            ) : (
                <>
                    {noPlanFound ? (
                        <div className={classes["noPlan"]}>
                            No, Active Plan Found.
                        </div>
                    ) : (
                        <Formik
                            initialValues={{ ...calculatorState }}
                            validationSchema={Yup.object().shape({
                                ...calValidations,
                            })}
                            onSubmit={handleClick}
                            validateOnMount
                            enableReinitialize
                        >
                            {(formProps) => {
                                return (
                                    <form
                                        onSubmit={formProps.handleSubmit}
                                        autoComplete="off"
                                    >
                                        <ScrollToFieldError
                                            formProps={formProps}
                                        />
                                        {RenderModal}
                                        {showInvoice && (
                                            <ViewInvoice
                                                onClose={HideInvoice}
                                                calValues={calValues}
                                                userInfo={userInfo}
                                                calculatorObj={calculatorObj}
                                                invoiceId={
                                                    editInvoiceState?.id || ""
                                                }
                                                lensPrices={lensPrices}
                                                messageApi={messageApi}
                                                davisLensMaterials={
                                                    davisMaterials
                                                }
                                            />
                                        )}
                                        <InvoiceInfo
                                            formProps={formProps}
                                            disable={
                                                formProps.values
                                                    ?.submitBenifitType ===
                                                    BenifitTypeEnums.frame ||
                                                formProps.values
                                                    ?.submitBenifitType ===
                                                    BenifitTypeEnums.lens
                                            }
                                            userInfo={userInfo}
                                        />

                                        {formProps.values?.submitBenifitType ===
                                            BenifitTypeEnums.frame && (
                                            <div
                                                className={
                                                    classes["sub-container"]
                                                }
                                            >
                                                {(formProps.values
                                                    ?.submitBenifitType ===
                                                    BenifitTypeEnums.frame ||
                                                    formProps.values
                                                        ?.submitBenifitType ===
                                                        BenifitTypeEnums.lens) && (
                                                    <>
                                                        <div
                                                            className={
                                                                classes[
                                                                    "back-container"
                                                                ]
                                                            }
                                                            onClick={() =>
                                                                handleBackClick(
                                                                    formProps
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={backArrow}
                                                                alt={
                                                                    "back icon"
                                                                }
                                                                className={
                                                                    classes[
                                                                        "back-icon"
                                                                    ]
                                                                }
                                                            />
                                                            <div
                                                                className={
                                                                    classes[
                                                                        "back-text"
                                                                    ]
                                                                }
                                                            >
                                                                Back
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                classes[
                                                                    "private-pay-title"
                                                                ]
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
                                                    isFrame={true}
                                                />
                                                <TracingFee
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
                                                />
                                            </div>
                                        )}
                                        {formProps.values?.submitBenifitType ===
                                            BenifitTypeEnums.lens && (
                                            <div
                                                className={
                                                    classes["sub-container"]
                                                }
                                            >
                                                {(formProps.values
                                                    ?.submitBenifitType ===
                                                    BenifitTypeEnums.frame ||
                                                    formProps.values
                                                        ?.submitBenifitType ===
                                                        BenifitTypeEnums.lens) && (
                                                    <>
                                                        <div
                                                            className={
                                                                classes[
                                                                    "back-container"
                                                                ]
                                                            }
                                                            onClick={() =>
                                                                handleBackClick(
                                                                    formProps
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={backArrow}
                                                                alt={
                                                                    "back icon"
                                                                }
                                                                className={
                                                                    classes[
                                                                        "back-icon"
                                                                    ]
                                                                }
                                                            />
                                                            <div
                                                                className={
                                                                    classes[
                                                                        "back-text"
                                                                    ]
                                                                }
                                                            >
                                                                Back
                                                            </div>
                                                        </div>

                                                        <div
                                                            className={
                                                                classes[
                                                                    "private-pay-title"
                                                                ]
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
                                            </div>
                                        )}
                                        {(formProps.values
                                            ?.submitBenifitType === "" ||
                                            formProps.values?.visionPlan ===
                                                "Private Pay") && (
                                            <div
                                                className={
                                                    classes["sub-container"]
                                                }
                                            >
                                                {formProps.values
                                                    ?.submitBenifitType !==
                                                    BenifitTypeEnums.frame &&
                                                formProps.values
                                                    ?.submitBenifitType !==
                                                    BenifitTypeEnums.lens ? (
                                                    <>
                                                        <SelectVisionPlan
                                                            defaultValues={
                                                                defaultValues
                                                            }
                                                            setDefaultValues={
                                                                setDefaultValues
                                                            }
                                                            validationsList={
                                                                validationsList
                                                            }
                                                            setValidationsList={
                                                                setValidationsList
                                                            }
                                                            setCalculatorObj={
                                                                setCalculatorObj
                                                            }
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
                                                            setCalculatorState={
                                                                setCalculatorState
                                                            }
                                                            setDavisMaterials={
                                                                setDavisMaterials
                                                            }
                                                        />
                                                        <VisionBenifits
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
                                                        {formProps?.values
                                                            ?.isFrameBenifit ===
                                                        FrameBenifitAvailableEnum.onlyThisTime ? (
                                                            <></>
                                                        ) : (
                                                            <RenderFrameOrder
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
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.title ===
                                                                            formProps
                                                                                ?.values
                                                                                ?.visionPlan
                                                                    )
                                                                        ?.question_permissions
                                                                }
                                                            />
                                                        )}
                                                        {formProps?.values
                                                            ?.isLensBenifit ===
                                                        LensBenifitAvailableEnum.onlyThisTime ? (
                                                            <></>
                                                        ) : (
                                                            <>
                                                                <RenderLensFields
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
                                                                            (
                                                                                item
                                                                            ) =>
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
                                                        {formProps?.values
                                                            ?.isLensBenifit ===
                                                        LensBenifitAvailableEnum.onlyThisTime ? (
                                                            <></>
                                                        ) : (
                                                            <>
                                                                {formProps
                                                                    ?.values
                                                                    ?.visionPlan !==
                                                                    "Private Pay" && (
                                                                    <LoweredCopay
                                                                        davisMaterials={
                                                                            davisMaterials
                                                                        }
                                                                        lensPrices={
                                                                            lensPrices
                                                                        }
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
                                                                                (
                                                                                    item
                                                                                ) =>
                                                                                    item.title ===
                                                                                    formProps
                                                                                        ?.values
                                                                                        ?.visionPlan
                                                                            )
                                                                                ?.question_permissions
                                                                        }
                                                                    />
                                                                )}
                                                            </>
                                                        )}
                                                        <ProtectionPlan
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
                                                        <TracingFee
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
                                                        />
                                                        <GlassesProtection
                                                            formProps={
                                                                formProps
                                                            }
                                                            calculatorObj={
                                                                calculatorObj &&
                                                                calculatorObj
                                                            }
                                                        />
                                                        <CustomDiscount
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
                                                formProps?.values
                                                    ?.isFrameBenifit ===
                                                    FrameBenifitAvailableEnum.onlyThisTime &&
                                                formProps?.values
                                                    ?.isLensBenifit ===
                                                    LensBenifitAvailableEnum.onlyThisTime
                                            }
                                        >
                                            {buttonLoader == true ? (
                                                <span>
                                                    <p>Create Invoice</p>
                                                    <CustomLoader
                                                        buttonBool={true}
                                                    />
                                                </span>
                                            ) : editInvoiceState?.id ? (
                                                "Update Invoice"
                                            ) : (
                                                "Create Invoice"
                                            )}
                                        </button>
                                    </form>
                                );
                            }}
                        </Formik>
                    )}
                </>
            )}
        </Col>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
    retailPopup: state.Auth.retailPopup,
});

export default connect(mapStateToProps)(CalculatorScreen);
const getPrivatePayTitle = (value) => {
    switch (value) {
        case BenifitTypeEnums.lens:
            return "lens";
        case BenifitTypeEnums.frame:
            return "frame";
    }
};
