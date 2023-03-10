import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/customModal";
import classes from "./styles.module.scss";
import closeIcon from "../../../../../images/cross.png";
import {
    CRIZAL_SUNSHIELD,
    DRILL_MOUNT,
    GRADIENT_TINT,
    POLARIZED,
    SENSITY_PHOTOCHROMIC,
    SHAMIR_GLACIER_PLUS_UV,
    SKI_TYPE_MIRROR,
    SOLID_SINGLE_GRADIENT,
    SOLID_TINT,
    SUNSYNC_DRIVEXT,
    SUNSYNC_ELITE_XT,
    TECHSHIELD_PLUS_UVR,
    TRANSITION_SIGNATURE,
    TRANSITION_VANTAGE,
    TRANSITION_XTRACTION,
    ZEISS_PHOTOFUSION,
} from "../../data/constants";
import Axios from "../../../../Http";
import axios from "axios";
import { connect } from "react-redux";
import { INVOICES_ROUTE } from "../../../../appRoutes/routeConstants";
import UserInfo from "./components/userInfo";
import OutPackPrices from "./components/outPackPrices";
import InPackPrices from "./components/inPackPrices";
import { BenifitTypeEnums } from "../../data/initialValues";
import DetailsList from "./components/detailsList/detailsList";
import { getPriceFromDB } from "./helpers/getPriceFromDB";
import { Col, Modal, Row, message } from "antd";
import { CalculateWithTaxesTotalPrice } from "./helpers/pricesHelper/calculateTotalPrice";
import UseWindowSize from "../../../../hooks/windowResize";
import ButtonsList from "./components/buttonsList/buttonsList";
import { AllPlans } from "../../data/plansList";
import { Plans } from "../../data/plansJson";
import { useHistory } from "react-router";
import dayjs from "dayjs";
const ViewInvoice = ({
    onClose,
    calValues,
    userInfo,
    userId,
    calculatorObj,
    mode,
    invoiceId = "",
    lensPrices,
    clientUserId,
    userRole,
    messageApi,
    language,
    davisLensMaterials,
}) => {
    const history = useHistory();
    const [receipt, setReceipt] = useState(null);
    const [davisMaterials, setDavisMaterials] = useState([
        ...(davisLensMaterials || []),
    ]);
    const { width } = UseWindowSize();
    const plansList = AllPlans[language];
    const plansJson = Plans()[language];
    useEffect(() => {
        setReceipt({
            userInfo: userInfo,
            values: { ...calValues },
        });
    }, [calValues]);
    useEffect(() => {
        const getDavisMaterial = async () => {
            const currentPlan = calculatorObj?.questions?.find(
                (item) => item?.title === calValues?.visionPlan || ""
            );
            const res = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/get-collections",
                { vision_plan_id: currentPlan?.id }
            );

            setDavisMaterials(res?.data?.data?.lense_materials || []);
        };
        if (
            calValues?.visionPlan === "Davis Vision" &&
            (mode === "view" || invoiceId)
        ) {
            getDavisMaterial();
        }
    }, [calculatorObj, calValues, davisLensMaterials]);

    const handleSendInvoiceClick = async (status) => {
        if (mode === "view") {
            onClose();
            return;
        }
        try {
            if (invoiceId) {
                await onEditInvoice(status);
            } else {
                await createNewInvoice(status);
            }
        } catch (err) {
            onClose();
            message.destroy();
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
            });
        }
    };

    const createNewInvoice = async (status) => {
        let clientId = userId;
        if (userRole === "staff") {
            clientId = clientUserId;
        }
        try {
            const payload = {
                userId: clientId,
                staffId: receipt?.values?.staffId,
                invoiceName: receipt?.values?.invoiceName,
                fname: receipt?.userInfo?.firstName,
                lname: receipt?.userInfo?.lastName,
                dob: receipt?.userInfo?.dob,
                email: receipt?.userInfo?.email,
                phone: receipt?.userInfo?.phoneNo,
                status: status.status,
                amount: (
                    CalculateWithTaxesTotalPrice(
                        receipt?.values,
                        calculatorObj,
                        lensPrices,
                        plansList,
                        plansJson,
                        davisMaterials
                    ) || 0
                ).toFixed(2),
                vpState: calculatorObj,
                userState: receipt?.values,
            };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/save-invoice`,
                payload
            );
            if (status.status !== "draft") {
                sendEmail(status, res);
            }
            message.destroy();
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: "custom-postion",
            });
            history.push(INVOICES_ROUTE);
        } catch (err) {
            onClose();
            message.destroy();
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
            });
        }
    };

    const onEditInvoice = async (status) => {
        let clientId = userId;
        if (userRole === "staff") {
            clientId = clientUserId;
        }
        try {
            const payload = {
                id: invoiceId,
                userId: clientId,
                staffId: receipt?.values?.staffId,
                invoiceName: receipt?.values?.invoiceName,
                status: status.status,
                amount: (
                    CalculateWithTaxesTotalPrice(
                        receipt?.values,
                        calculatorObj,
                        lensPrices,
                        plansList,
                        plansJson,
                        davisMaterials
                    ) || 0
                ).toFixed(2),
                vpState: calculatorObj,
                userState: receipt?.values,
            };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/save-edit-invoice`,
                payload
            );
            if (status.status !== "draft") {
                sendEmail(status, res);
            }
            message.destroy();
            messageApi.open({
                type: "success",
                content: res?.data?.message,
                duration: 5,
                className: "custom-postion",
            });
            history.push(INVOICES_ROUTE);
        } catch (err) {
            onClose();
            message.destroy();
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
            });
        }
    };
    const sendEmail = async (status, response) => {
        let clientId = userId;
        if (userRole === "staff") {
            clientId = clientUserId;
        }
        try {
            const payload = {
                userId: clientId,
                staffId: receipt?.values?.staffId,
                invoiceName: receipt?.values?.invoiceName,
                fname: receipt?.userInfo?.firstName,
                lname: receipt?.userInfo?.lastName,
                dob: receipt?.userInfo?.dob,
                email: receipt?.userInfo?.email,
                phone: receipt?.userInfo?.phoneNo,
                status: status.status,
                invoiceNo: response?.data?.data?.id,
                invoiceDate: dayjs(response?.data?.updated_at).format(
                    "MMM DD, YYYY"
                ),
                amount: (
                    CalculateWithTaxesTotalPrice(
                        receipt?.values,
                        calculatorObj,
                        lensPrices,
                        plansList,
                        plansJson,
                        davisMaterials
                    ) || 0
                ).toFixed(2),
                vpState: calculatorObj,
                userState: receipt?.values,
                invoiceState: status.invoiceState,
            };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/send-email`,
                payload
            );
        } catch (err) {}
    };
    const calculateTotalDue = () => {
        let total = 0;
        total = total + totalWithoutTax();

        total = total - parseFloat(getAppliedDiscounts(totalWithoutTax()));
        //add tax
        const tax = (total * (calculatorObj?.tax || 0)) / 100;
        total = total + tax;
        return total || 0;
    };

    const getAppliedDiscounts = (price) => {
        const discountToApply =
            parseFloat(receipt?.values?.discount?.value || "") || 0;

        if (discountToApply == 0) {
            return 0;
        } else {
            const result = (price * discountToApply) / 100;
            return parseFloat(result);
        }
    };

    const totalWithoutTax = () => {
        let total = 0;
        total = total + (receipt?.values?.materialCopay || 0);
        total = total + parseFloat(GetFrameFee(receipt));
        total =
            total + parseFloat(GetLensFee(receipt, calculatorObj, lensPrices));
        if (
            receipt?.values?.protectionPlan?.status === "Yes" &&
            receipt?.values?.protectionPlan?.paymentStatus === "Paid"
        ) {
            total = total + (receipt?.values?.protectionPlan?.price || 0);
        }
        if (receipt?.values?.shipping?.status === "Yes") {
            total = total + (receipt?.values?.shipping?.price || 0);
        }

        if (receipt?.values?.shipping?.status === "Yes") {
            total = total + (parseFloat(calculatorObj?.shipping) || 0);
        }

        total =
            total +
            (parseFloat(getLensPrice(receipt, calculatorObj, lensPrices)) || 0);
        return total;
    };

    const oldPrices = () => {
        return (
            <>
                <InPackPrices
                    receipt={receipt}
                    calculatorObj={calculatorObj}
                    lensPrices={lensPrices}
                />
                <OutPackPrices
                    withoutTaxPrice={totalWithoutTax()}
                    totalPrice={calculateTotalDue()}
                    receipt={receipt}
                    calculatorObj={calculatorObj}
                    lensPrices={lensPrices}
                />
            </>
        );
    };
    const downloadInvoice = async (invoice) => {
        let clientId = userId;
        if (userRole === "staff") {
            clientId = clientUserId;
        }
        const payload = {
            userId: clientId,
            staffId: receipt?.values?.staffId,
            invoiceName: receipt?.values?.invoiceName,
            fname: receipt?.userInfo?.firstName,
            lname: receipt?.userInfo?.lastName,
            dob: receipt?.userInfo?.dob,
            email: receipt?.userInfo?.email,
            phone: receipt?.userInfo?.phoneNo,
            status: "",
            invoiceNo: "2332",
            invoiceDate: dayjs(new Date()).format("MMM DD, YYYY"),
            amount: (
                CalculateWithTaxesTotalPrice(
                    receipt?.values,
                    calculatorObj,
                    lensPrices,
                    plansList,
                    plansJson,
                    davisMaterials
                ) || 0
            ).toFixed(2),
            invoiceState: invoice,
        };
        const token = localStorage.getItem("access_token");
        axios({
            url: process.env.MIX_REACT_APP_URL + "/api/download-pdf",
            method: "post",
            data: payload,
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Invoice${new Date()}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    };
    return (
        <Modal
            onCancel={onClose}
            title=""
            open={true}
            closable={true}
            centered={true}
            className={classes["container"]}
            zIndex="99999"
            bodyStyle={{
                padding: 0,
            }}
            width={width <= 1200 ? "80%" : "50%"}
            footer={null}
        >
            <Row
                className={classes["sub-container"]}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <Col xs={24}>
                    <DetailsList
                        receipt={receipt}
                        calculatorObj={calculatorObj}
                        lensPrices={lensPrices}
                        mode={mode}
                        handleSendInvoiceClick={handleSendInvoiceClick}
                        davisMaterials={davisMaterials}
                        downloadInvoice={downloadInvoice}
                    />
                </Col>
            </Row>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
    userRole: state.Auth.userRole?.name,
    clientUserId: state.Auth.clientUser?.id,
    language: state.Auth.language,
});
export default connect(mapStateToProps)(ViewInvoice);

export const InvoiceSlot = ({ title, subTitle, className }) => {
    return (
        <div className={`${classes["invoice-slot-container"]} ${className}`}>
            <div className={classes["invoice-slot-title"]}>{title}</div>
            <div className={classes["invoice-slot-title"]}>{subTitle}</div>
        </div>
    );
};

export const InvoiceBoldSlot = ({ title, subTitle }) => {
    return (
        <div className={classes["invoice-bold-slot-container"]}>
            <div className={classes["invoice-bold-slot-title"]}>{title}</div>
            <div className={classes["invoice-bold-slot-title"]}>{subTitle}</div>
        </div>
    );
};

export const getPriceByPhotochromicMaterial = (plan, value) => {
    if (plan === "VSP Signature" || plan === "VSP Advantage") {
        return getSignaturePhotochromic(value);
    } else if (plan === "VSP Choice") {
        return 75;
    }
};
const getSignaturePhotochromic = (value) => {
    switch (value) {
        case "Transition Signature":
            return TRANSITION_SIGNATURE;
        case "Transition XTRActive":
            return TRANSITION_XTRACTION;
        case "SunSync / Drive XT":
            return SUNSYNC_DRIVEXT;
        case "SunSync Elite / Elite XT":
            return SUNSYNC_ELITE_XT;
        case "Sensity Photochromic":
            return SENSITY_PHOTOCHROMIC;
        case "ZEISS Photofusion":
            return ZEISS_PHOTOFUSION;
        case "Transition Vantage":
            return TRANSITION_VANTAGE;
    }
};
export const getPriceByAntireflective = (plan, value) => {
    if (plan === "VSP Signature") {
        return getSignatureAntireflective(value);
    } else if (plan === "VSP Choice" || plan === "VSP Advantage") {
        return getChoiceAntireflective(value);
    }
};

const getChoiceAntireflective = (value) => {
    switch (value) {
        case "Glacier Plus":
        case "Crizal Sapphire 360 UV":
        case "Crizal Avance UV":
        case "Crizal Rock":
        case "Crizal Sunshield":
        case "DuraVision BlueProtect UV":
        case "DuraVision Platinum UV":
        case "DuraVision Sun UV":
        case "Kodak Clean&CleAR":
        case "Kodak Clean&CleAR UV":
        case "Kodak Clean&CleAR with Silk":
        case "Kodak Clean&CleAR UV with Silk":
        case "Kodak Total Blue":
        case "Maui Jim AR":
            return 85;
        case "Crizal Alize UV":
        case "DuraVision Silver UV":
        case "HiVision with ViewProtect":
        case "Kodak CleAR":
            return 69;
        case "Crizal Prevencia":
        case "DuraVision Chrome":
        case "Crizal Easy UV":
            return 58;
        case "Crizal UV Kids":
            return 41;
    }
};

const getSignatureAntireflective = (value) => {
    switch (value) {
        case "Glacier Plus":
        case "Crizal Sapphire 360 UV":
        case "Crizal Avance UV":
        case "Crizal Rock":
        case "Crizal Sunshield":
        case "DuraVision BlueProtect UV":
        case "DuraVision Platinum UV":
        case "DuraVision Sun UV":
        case "Kodak Clean&CleAR":
        case "Kodak Clean&CleAR UV":
        case "Kodak Clean&CleAR with Silk":
        case "Kodak Clean&CleAR UV with Silk":
        case "Kodak Total Blue":
        case "Maui Jim AR":
            return 75;
        case "Crizal Alize UV":
        case "DuraVision Silver UV":
        case "HiVision with ViewProtect":
        case "Kodak CleAR":
            return 61;
        case "Crizal Prevencia":
        case "DuraVision Chrome":
        case "Crizal Easy UV":
            return 51;
        case "Crizal UV Kids":
            return 37;
    }
};

const getLensPrice = (receipt, calculatorObj, lensPrices) => {
    const lensPrice = parseFloat(
        getPriceFromDB(receipt, calculatorObj, lensPrices)?.lensPrice || 0
    );
    const materialPrice = parseFloat(
        getPriceFromDB(receipt, calculatorObj, lensPrices)?.materialPrice || 0
    );
    if (
        receipt?.values?.lensType?.type &&
        receipt?.values?.lensType?.brand &&
        receipt?.values?.lensMaterial
    ) {
        if (
            receipt?.values?.lensMaterial === "Polycarbonate" ||
            receipt?.values?.lensMaterial?.includes("Hi index") ||
            receipt?.values?.lensMaterial?.includes("Hi Index")
        ) {
            if (receipt?.values?.lensMaterial === "Polycarbonate") {
                const isPholicarbinateActive =
                    receipt?.values?.lowerCopaythanStandard?.copayList?.find(
                        (item) => item?.type === "Polycarbonate"
                    );
                if (isPholicarbinateActive?.status) {
                    if (isPholicarbinateActive?.copayType === "$0 Copay") {
                        return parseFloat(
                            getPriceFromDB(receipt, calculatorObj, lensPrices)
                                ?.lensPrice || 0
                        );
                    } else if (
                        isPholicarbinateActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return (
                            (isPholicarbinateActive?.price || 0) +
                            parseFloat(
                                getPriceFromDB(
                                    receipt,
                                    calculatorObj,
                                    lensPrices
                                )?.lensPrice || 0
                            )
                        );
                    }
                } else {
                    return lensPrice + materialPrice;
                }
            } else {
                const isHighIndexActive =
                    receipt?.values?.lowerCopaythanStandard?.copayList?.find(
                        (item) => item?.type === "High Index"
                    );
                if (isHighIndexActive?.status) {
                    if (isHighIndexActive?.copayType === "$0 Copay") {
                        return parseFloat(
                            getPriceFromDB(receipt, calculatorObj, lensPrices)
                                ?.lensPrice || 0
                        );
                    } else if (
                        isHighIndexActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return (
                            (isHighIndexActive?.price || 0) +
                            parseFloat(
                                getPriceFromDB(
                                    receipt,
                                    calculatorObj,
                                    lensPrices
                                )?.lensPrice || 0
                            )
                        );
                    }
                } else {
                    return lensPrice + materialPrice;
                }
            }
        } else {
            return lensPrice + materialPrice;
        }
    } else {
        return 0;
    }
};

const GetLensFee = (receipt, calculatorObj, lensPrices) => {
    let total = 0;
    if (
        receipt?.values?.submitBenifitType === BenifitTypeEnums.lens ||
        receipt?.values?.visionPlan === "Private Pay"
    ) {
        total = total + getPrivatePayGlasses(receipt, calculatorObj);
        if (receipt?.values?.photochromics?.status === "Yes") {
            const priceValue = getPrivatePayPhotochromic(
                receipt?.values?.photochromics?.type,
                calculatorObj
            );

            total = total + (priceValue || 0);
        } else {
            total = total + 0;
        }
        if (receipt?.values?.antiReflectiveProperties?.status === "Yes") {
            const price = getPrivatePayAntireflective(
                receipt?.values?.antiReflectiveProperties?.type,
                calculatorObj
            );
            total = total + (price || 0);
        } else {
            total = total + 0;
        }
        total =
            total +
            parseFloat(
                getPrivatePayLensPices(calculatorObj, receipt, lensPrices)
            ) +
            parseFloat(
                getPrivatePayMaterialPices(calculatorObj, receipt, lensPrices)
            );
    } else {
        if (receipt?.values?.antiReflectiveProperties?.status === "Yes") {
            const isAntireflectiveActive =
                receipt?.values?.lowerCopaythanStandard?.copayList?.find(
                    (item) => item?.type === "Anti-Reflective Properties"
                );
            if (isAntireflectiveActive?.status) {
                if (isAntireflectiveActive?.copayType === "$0 Copay") {
                    total = total + 0;
                } else if (
                    isAntireflectiveActive?.copayType ===
                    "Lowered copay dollar amount"
                ) {
                    total = total + (isAntireflectiveActive?.price || 0);
                }
            } else {
                const price = getPriceByAntireflective(
                    receipt?.values?.visionPlan,
                    receipt?.values?.antiReflectiveProperties?.type
                );
                total = total + (price || 0);
            }
        } else {
            total = total + 0;
        }

        if (receipt?.values?.photochromics?.status === "Yes") {
            const isPhotochromicActive =
                receipt?.values?.lowerCopaythanStandard?.copayList?.find(
                    (item) => item?.type === "Photochromic"
                );
            if (isPhotochromicActive?.status) {
                if (isPhotochromicActive?.copayType === "$0 Copay") {
                    total = total + 0;
                } else if (
                    isPhotochromicActive?.copayType ===
                    "Lowered copay dollar amount"
                ) {
                    total = total + (isPhotochromicActive?.price || 0);
                }
            } else {
                const price = getPriceByPhotochromicMaterial(
                    receipt?.values?.visionPlan,
                    receipt?.values?.photochromics?.type
                );
                total = total + (price || 0);
            }
        } else {
            total = total + 0;
        }
        total = total + getGlassesPrice(receipt);
    }
    return total;
};
export const getPrivatePayAntireflective = (value, calculatorObj) => {
    const antiReflectiveAddons = calculatorObj?.addons?.find(
        (item) => item?.title === "Anti Reflective"
    );
    let total = 0;
    const selectedAntireflective = antiReflectiveAddons?.addons?.find(
        (item) => item?.title === value
    )?.price;
    total = total + parseFloat(selectedAntireflective || 0) || 0;
};

export const getPrivatePayPhotochromic = (value, calculatorObj) => {
    const photochromicAddons = calculatorObj?.addons?.find(
        (item) => item?.title === "Photochromic"
    );
    const selectedPhotochromic = photochromicAddons?.addons?.find(
        (item) => item.title === value
    )?.price;
    return parseFloat(selectedPhotochromic || 0) || 0;
};

export const getPrivatePayGlasses = (receipt, calculatorObj) => {
    const glassesAddons = calculatorObj?.addons?.find(
        (item) => item?.title === "SunGlasses"
    );
    let total = 0;
    if (receipt?.values?.sunGlassesLens?.status === "Yes") {
        if (receipt?.values?.sunGlassesLens?.lensType === "Polarized") {
            const polirizedPrice = glassesAddons?.addons?.find(
                (item) => item.title === "Polarized"
            )?.price;

            total = total + parseFloat(polirizedPrice || 0) || 0;
            if (receipt?.values?.sunGlassesLens?.mirrorCoating === "Yes") {
                if (
                    receipt?.values?.sunGlassesLens?.coatingType ===
                    "Ski Type Mirror"
                ) {
                    const skiTypePrice = glassesAddons?.addons?.find(
                        (item) => item.title === "Ski Type Mirror"
                    )?.price;
                    total = total + parseFloat(skiTypePrice || 0) || 0;
                } else {
                    const solidGradientPrice = glassesAddons?.addons?.find(
                        (item) => item.title === "Solid/Single Gradient Mirror"
                    )?.price;
                    total = total + parseFloat(solidGradientPrice || 0) || 0;
                }
            }
        } else if (receipt?.values?.sunGlassesLens?.lensType === "Tint") {
            if (receipt?.values?.sunGlassesLens?.tintType === "Solid Tint") {
                const solidTindPrice = glassesAddons?.addons?.find(
                    (item) => item.title === "Solid Tint"
                )?.price;
                total = total + parseFloat(solidTindPrice || 0) || 0;
            } else {
                const gradientTindPrice = glassesAddons?.addons?.find(
                    (item) => item.title === "Gradient Tint"
                )?.price;
                total = total + parseFloat(gradientTindPrice || 0) || 0;
            }
            if (receipt?.values?.sunGlassesLens?.mirrorCoating === "Yes") {
                if (
                    receipt?.values?.sunGlassesLens?.coatingType ===
                    "Ski Type Mirror"
                ) {
                    const skiTypePrice = glassesAddons?.addons?.find(
                        (item) => item.title === "Ski Type Mirror"
                    )?.price;
                    total = total + parseFloat(skiTypePrice || 0) || 0;
                } else {
                    const solidGradientPrice = glassesAddons?.addons?.find(
                        (item) => item.title === "Solid/Single Gradient Mirror"
                    )?.price;
                    total = total + parseFloat(solidGradientPrice || 0) || 0;
                }
            }
        }
    }
    return total;
};

export const getPrivatePayMaterialPices = (values, receipt, lensPrices) => {
    let price = 0;
    const material = values?.lens_material?.find(
        (material) =>
            material?.lens_material_title === receipt?.values?.lensMaterial
    );
    if (!material?.retail_price) {
        price = 0;
    } else {
        price = parseFloat(material?.retail_price || 0) || 0;
    }

    return price;
};
export const getPrivatePayLensPices = (values, receipt, lensPrices) => {
    let price = 0;
    if (values?.lens_types) {
        values?.lens_types[0].brands?.forEach((item) => {
            item.collections?.forEach((val) => {
                if (val.title == receipt?.values?.lensType?.brand) {
                    if (!val?.price) {
                        price = 0;
                    } else {
                        price = parseFloat(val?.price || 0) || 0;
                    }
                }
            });
        });
    }
    return price;
};

const getGlassesPrice = (receipt) => {
    let total = 0;
    if (receipt?.values?.sunGlassesLens?.status === "Yes") {
        {
            if (receipt?.values?.sunGlassesLens?.lensType === "Polarized") {
                total = total + POLARIZED;
                if (receipt?.values?.sunGlassesLens?.mirrorCoating === "Yes") {
                    if (
                        receipt?.values?.sunGlassesLens?.coatingType ===
                        "Ski Type Mirror"
                    ) {
                        total = total + SKI_TYPE_MIRROR;
                    } else {
                        total = total + SOLID_SINGLE_GRADIENT;
                    }
                }
            } else if (receipt?.values?.sunGlassesLens?.lensType === "Tint") {
                if (
                    receipt?.values?.sunGlassesLens?.tintType === "Solid Tint"
                ) {
                    total = total + SOLID_TINT;
                } else {
                    total = total + GRADIENT_TINT;
                }
                if (receipt?.values?.sunGlassesLens?.mirrorCoating === "Yes") {
                    if (
                        receipt?.values?.sunGlassesLens?.coatingType ===
                        "Ski Type Mirror"
                    ) {
                        total = total + SKI_TYPE_MIRROR;
                    } else {
                        total = total + SOLID_SINGLE_GRADIENT;
                    }
                }
            }
        }
    }
    return total;
};
const GetFrameFee = (receipt) => {
    let total = 0;
    if (
        receipt?.values?.submitBenifitType === BenifitTypeEnums.frame ||
        receipt?.values?.visionPlan === "Private Pay"
    ) {
        total = total + receipt?.values?.frameOrder?.retailFee;
        if (
            receipt?.values?.frameOrder?.type === "New Frame Purchase" &&
            receipt?.values?.frameOrder?.drillMount === "Yes"
        ) {
            total = total + DRILL_MOUNT;
        }
    } else {
        if (
            receipt?.values?.frameOrder?.retailFee <=
            receipt?.values?.frameOrder?.frameContribution
        ) {
            total = total + 0;
        } else if (
            receipt?.values?.frameOrder?.retailFee >
            receipt?.values?.frameOrder?.frameContribution
        ) {
            const actualPrice =
                receipt?.values?.frameOrder?.retailFee -
                receipt?.values?.frameOrder?.frameContribution;
            const discount = actualPrice * 0.2;
            const payableFramePrice = actualPrice - discount;
            total = total + (payableFramePrice || 0);
        }
        if (
            receipt?.values?.frameOrder?.type === "New Frame Purchase" &&
            receipt?.values?.frameOrder?.drillMount === "Yes"
        ) {
            total = total + DRILL_MOUNT;
        }
    }
    return total;
};
