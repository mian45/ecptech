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
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { HOME_ROUTE } from "../../../../appRoutes/routeConstants";
import UserInfo from "./components/userInfo";
import OutPackPrices, { getPriceFromDB } from "./components/outPackPrices";
import InPackPrices from "./components/inPackPrices";
import { BenifitTypeEnums } from "../../data/initialValues";

const ViewInvoice = ({
    onClose,
    calValues,
    userInfo,
    userId,
    calculatorObj,
    mode,
    invoiceId = "",
    lensPrices,
}) => {
    const history = useHistory();
    const [receipt, setReceipt] = useState(null);

    useEffect(() => {
        setReceipt({
            userInfo: userInfo,
            values: { ...calValues },
        });
    }, [calValues]);

    const handleSendInvoiceClick = async () => {
        if (mode === "view") {
            onClose();
            return;
        }
        try {
            if (invoiceId) {
                onEditInvoice();
            } else {
                createNewInvoice();
            }

            history.push(HOME_ROUTE);
        } catch (err) {
            console.log("error while save Invoice");
        }
    };

    const createNewInvoice = async () => {
        const payload = {
            userId: userId,
            staffId: receipt?.values?.staffId,
            invoiceName: receipt?.values?.invoiceName,
            fname: receipt?.userInfo?.firstName,
            lname: receipt?.userInfo?.lastName,
            dob: receipt?.userInfo?.dob,
            email: receipt?.userInfo?.email,
            phone: receipt?.userInfo?.phoneNo,
            amount: calculateTotalDue(),
            vpState: calculatorObj,
            userState: receipt?.values,
        };
        await Axios.post("/api/save-invoice", payload);
    };

    const onEditInvoice = async () => {
        const payload = {
            id: invoiceId,
            userId: userId,
            staffId: receipt?.values?.staffId,
            invoiceName: receipt?.values?.invoiceName,
            amount: calculateTotalDue(),
            vpState: calculatorObj,
            userState: receipt?.values,
        };
        await Axios.post("/api/save-edit-invoice", payload);
    };

    const calculateTotalDue = () => {
        let total = 0;
        total = total + totalWithoutTax();
        //add tax
        const tax = (total * (calculatorObj.tax || 0)) / 100;
        total = total + tax;
        return total || 0;
    };

    const totalWithoutTax = () => {
        let total = 0;
        total = total + (receipt?.values?.materialCopay || 0);
        total = total + GetFrameFee(receipt);
        total =
            total + parseInt(GetLensFee(receipt, calculatorObj, lensPrices));
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
            total = total + (parseInt(calculatorObj?.shipping) || 0);
        }

        total =
            total +
            (parseInt(getLensPrice(receipt, calculatorObj, lensPrices)) || 0);
        return total;
    };

    return (
        <CustomModal onClose={onClose}>
            <div
                className={classes["container"]}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <img
                    src={closeIcon}
                    alt={"close"}
                    className={classes["close-icon"]}
                    onClick={onClose}
                />
                <div className={classes["sub-container"]}>
                    <UserInfo receipt={receipt} />
                    <div className={classes["sub-right-container"]}>
                        <InPackPrices receipt={receipt} />
                        <OutPackPrices
                            withoutTaxPrice={totalWithoutTax()}
                            totalPrice={calculateTotalDue()}
                            receipt={receipt}
                            calculatorObj={calculatorObj}
                            lensPrices={lensPrices}
                        />
                        <button
                            className={classes["send-button"]}
                            onClick={handleSendInvoiceClick}
                        >
                            {mode === "view" ? "Close" : "Send Invoice"}
                        </button>
                    </div>
                </div>
            </div>
        </CustomModal>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
});
export default connect(mapStateToProps)(ViewInvoice);

export const InvoiceSlot = ({ title, subTitle }) => {
    return (
        <div className={classes["invoice-slot-container"]}>
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

export const getPriceByPhotochromicMaterial = (value) => {
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
const getPriceByAntireflective = (value) => {
    switch (value) {
        case "Shamir Glacier Plus UV":
            return SHAMIR_GLACIER_PLUS_UV;
        case "TechShield Plus UVR":
            return TECHSHIELD_PLUS_UVR;
        case "Crizal Sunshield (Backside AR Only)":
            return CRIZAL_SUNSHIELD;
    }
};

const getLensPrice = (receipt, calculatorObj, lensPrices) => {
    const lensPrice = parseInt(
        getPriceFromDB(receipt, calculatorObj, lensPrices).lensPrice || 0
    );
    const materialPrice = parseInt(
        getPriceFromDB(receipt, calculatorObj, lensPrices).materialPrice || 0
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
                        return parseInt(
                            getPriceFromDB(receipt, calculatorObj, lensPrices)
                                ?.lensPrice || 0
                        );
                    } else if (
                        isPholicarbinateActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return (
                            (isPholicarbinateActive?.price || 0) +
                            parseInt(
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
                        return parseInt(
                            getPriceFromDB(receipt, calculatorObj, lensPrices)
                                ?.lensPrice || 0
                        );
                    } else if (
                        isHighIndexActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return (
                            (isHighIndexActive?.price || 0) +
                            parseInt(
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
    if (receipt?.values?.submitBenifitType === BenifitTypeEnums.lens) {
        total = total + getGlassesPrice(receipt);
        if (receipt?.values?.photochromics?.status === "Yes") {
            const price = getPriceByPhotochromicMaterial(
                receipt?.values?.photochromics?.type
            );
            total = total + (price || 0);
        } else {
            total = total + 0;
        }
        if (receipt?.values?.antiReflectiveProperties?.status === "Yes") {
            const price = getPriceByAntireflective(
                receipt?.values?.antiReflectiveProperties?.type
            );
            total = total + (price || 0);
        } else {
            total = total + 0;
        }
        total =
            total +
            getPriceFromDB(receipt, calculatorObj, lensPrices).lensPrice +
            getPriceFromDB(receipt, calculatorObj, lensPrices).materialPrice;
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
    if (receipt?.values?.submitBenifitType === BenifitTypeEnums.frame) {
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
