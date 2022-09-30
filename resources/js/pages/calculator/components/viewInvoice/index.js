import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/customModal";
import classes from "./styles.module.scss";
import closeIcon from "../../../../../images/cross.png";
import {
    DRILL_MOUNT,
    GRADIENT_TINT,
    POLARIZED,
    SENSITY_PHOTOCHROMIC,
    SKI_TYPE_MIRROR,
    SOLID_SINGLE_GRADIENT,
    SOLID_TINT,
    SUNSYNC_DRIVEXT,
    SUNSYNC_ELITE_XT,
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
import OutPackPrices, { getLensFee } from "./components/outPackPrices";
import InPackPrices from "./components/inPackPrices";

const ViewInvoice = ({
    onClose,
    calValues,
    userInfo,
    userId,
    calculatorObj,
    mode,
    invoiceId = "",
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
        total = total + (receipt?.values?.materialCopay || 0);
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
            const discount =
                (receipt?.values?.frameOrder?.frameContribution /
                    receipt?.values?.frameOrder?.retailFee) *
                20;
            const payableFramePrice = actualPrice - discount;
            total = total + (payableFramePrice || 0);
        }
        if (
            receipt?.values?.frameOrder?.type === "New Frame Purchase" &&
            receipt?.values?.frameOrder?.drillMount === "Yes"
        ) {
            total = total + DRILL_MOUNT;
        }
        if (receipt?.values?.sunGlassesLens?.status === "Yes") {
            {
                if (values?.sunGlassesLens?.lensType === "Polarized") {
                    total = total + POLARIZED;
                    if (values?.sunGlassesLens?.mirrorCoating === "Yes") {
                        if (
                            values?.sunGlassesLens?.coatingType ===
                            "Ski Type Mirror"
                        ) {
                            total = total + SKI_TYPE_MIRROR;
                        } else {
                            total = total + SOLID_SINGLE_GRADIENT;
                        }
                    }
                } else if (values?.sunGlassesLens?.lensType === "Tint") {
                    if (values?.sunGlassesLens?.tintType === "Solid Tint") {
                        total = total + SOLID_TINT;
                    } else {
                        total = total + GRADIENT_TINT;
                    }
                    if (values?.sunGlassesLens?.mirrorCoating === "Yes") {
                        if (
                            values?.sunGlassesLens?.coatingType ===
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
        if (
            receipt?.values?.protectionPlan?.status === "Yes" &&
            receipt?.values?.protectionPlan?.paymentStatus === "Paid"
        ) {
            total = total + (values?.protectionPlan?.price || 0);
        }
        if (receipt?.values?.shipping?.status === "Yes") {
            total = total + (receipt?.values?.shipping?.price || 0);
        }

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
        total = total + (getLensFee(receipt) || 0);
        //add tax
        total =
            total +
            (total / ((receipt?.values?.frameOrder?.retailFee || 0) + 200)) *
                (calculatorObj.tax || 1);
        return total || 0;
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
                            totalPrice={calculateTotalDue()}
                            receipt={receipt}
                            calculatorObj={calculatorObj}
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
            return 0;
        case "TechShield Plus UVR":
            return 0;
        case "Crizal Sunshield (Backside AR Only)":
            return 0;
    }
};
