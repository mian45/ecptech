import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/customModal";
import classes from "./styles.module.scss";
import closeIcon from "../../../../../images/cross.png";
import {
    CRIZAL_SUNSHIELD,
    DRILL_MOUNT,
    GRADIENT_TINT,
    POLARIZED,
    SHAMIR_GLACIER_PLUS_UV,
    SKI_TYPE_MIRROR,
    SOLID_SINGLE_GRADIENT,
    SOLID_TINT,
    TECHSHIELD_PLUS_UVR,
} from "../../data/constants";

const ViewInvoice = ({ onClose, calValues, userInfo }) => {
    const [receipt, setReceipt] = useState(null);

    useEffect(() => {
        setReceipt({
            userInfo: userInfo,
            values: { ...calValues },
        });
    }, [calValues]);
    const calculateTotalDue = () => {
        let total = 0;
        total = total + (values?.materialCopay || 0);
        if (
            values?.frameOrder?.type === "New Frame Purchase" &&
            values?.frameOrder?.drillMount === "Yes"
        ) {
            total = total + DRILL_MOUNT;
        }
        if (values?.sunGlassesLens?.status === "Yes") {
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
            values?.protectionPlan?.status === "Yes" &&
            values?.protectionPlan?.paymentStatus === "Paid"
        ) {
            total = total + (values?.protectionPlan?.price || 0);
        }
        if (values?.shipping?.status === "Yes") {
            total = total + (receipt?.values?.shipping?.price || 0);
        }
        const isPolycarbonateActive = lowerCopaythanStandard?.copayList?.find(
            (item) => item?.type === "Polycarbonate"
        );
        const isHighIndexActive = lowerCopaythanStandard?.copayList?.find(
            (item) => (item?.type).includes("Hi index")
        );
        if (
            values?.lensMaterial === "Polycarbonate" &&
            isPolycarbonateActive?.status
        ) {
            if (isPolycarbonateActive?.copayType === "$0 Copay") {
                total = total + 0;
            } else {
                total = total + (isPolycarbonateActive?.price || 0);
            }
        } else if (
            values?.lensMaterial === "Hi index" &&
            isHighIndexActive?.status
        ) {
            if (isHighIndexActive?.copayType === "$0 Copay") {
                total = total + 0;
            } else {
                total = total + (isHighIndexActive?.price || 0);
            }
        } else {
            getPriceByLensMaterial(values?.lensMaterial);
        }
        return total || 0;
    };

    const getCoatingPrice = () => {
        if (
            receipt?.values?.sunGlassesLens?.coatingType === "Ski Type Mirror"
        ) {
            return SKI_TYPE_MIRROR;
        } else if (
            receipt?.values?.sunGlassesLens?.coatingType ===
            "Solid/Single Gradient"
        ) {
            return SOLID_SINGLE_GRADIENT;
        } else {
            return 0;
        }
    };
    const getAntireflectivePrice = () => {
        if (receipt?.values?.type === "Shamir Glacier Plus UV") {
            return SHAMIR_GLACIER_PLUS_UV;
        } else if (receipt?.values?.type === "TechShield Plus UVR") {
            return TECHSHIELD_PLUS_UVR;
        } else if (
            receipt?.values?.type === "Crizal Sunshield (Backside AR Only)"
        ) {
            return CRIZAL_SUNSHIELD;
        }
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
                    <div className={classes["sub-left-container"]}>
                        <InfoSlot
                            title={"Invoice Name"}
                            subTitle={`${receipt?.values?.invoiceName}`}
                        />
                        <InfoSlot
                            title={"Customer Name"}
                            subTitle={`${receipt?.userInfo?.firstName} ${receipt?.userInfo?.lastName}`}
                        />
                        <InfoSlot
                            title={"Date of Birth"}
                            subTitle={receipt?.userInfo?.dob}
                        />
                        <InfoSlot
                            title={"Email"}
                            subTitle={receipt?.userInfo?.email}
                        />
                        {receipt?.userInfo?.phoneNo && (
                            <InfoSlot
                                title={"Phone Number"}
                                subTitle={receipt?.userInfo?.phoneNo}
                            />
                        )}
                    </div>
                    <div className={classes["sub-right-container"]}>
                        <div className={classes["page-label"]}>Retail Fees</div>
                        <InvoiceSlot
                            title={"Retail fee of frame"}
                            subTitle={`${receipt?.values?.frameOrder?.retailFee}`}
                        />
                        <InvoiceSlot
                            title={"Lenses retail fee"}
                            subTitle={"$902.00"}
                        />
                        <InvoiceBoldSlot title={"Total"} subTitle={"$902.00"} />
                        <div className={classes["page-sub-label"]}>
                            Out of pocket Fees
                        </div>
                        <InvoiceSlot
                            title={"Shamir Computer/Workspace ( Base fee )"}
                            subTitle={"$50.00"}
                        />
                        <InvoiceSlot
                            title={
                                "Shamir Computer/Workspace ( Lens Material: Polycarbonate )"
                            }
                            subTitle={"$0.00"}
                        />
                        <InvoiceSlot
                            title={"Material Copay"}
                            subTitle={"$200.00"}
                        />
                        <InvoiceSlot
                            title={
                                "Photochromic Option: Transitions Signature 8"
                            }
                            subTitle={"$75.00"}
                        />
                        <InvoiceSlot
                            title={`Antireflective Properties: ${
                                receipt?.values?.status === "Yes"
                                    ? receipt?.values?.type
                                    : ""
                            }`}
                            subTitle={`$${getAntireflectivePrice()}`}
                        />
                        <InvoiceSlot
                            title={`Mirror Coating: ${receipt?.values?.sunGlassesLens?.coatingType}`}
                            subTitle={`${getCoatingPrice() || 0}`}
                        />
                        <InvoiceSlot
                            title={"Is Sunglass Lens Polarized?"}
                            subTitle={receipt?.values?.sunGlassesLens?.status}
                        />
                        <InvoiceSlot
                            title={"Polarized Fee"}
                            subTitle={
                                receipt?.values?.sunGlassesLens?.lensType ===
                                "Polarized"
                                    ? `$${POLARIZED}`
                                    : "$0.00"
                            }
                        />

                        <div className={classes["invoice-slot-container"]}>
                            <div className={classes["invoice-slot-title"]}>
                                Percent discount
                            </div>
                            <div className={classes["invoice-slot-title"]}>
                                <span className={classes["light-title"]}>
                                    {"($400)"}
                                </span>{" "}
                                40.78%
                            </div>
                        </div>
                        <div className={classes["invoice-slot-container"]}>
                            <div className={classes["invoice-slot-title"]}>
                                Sales Tax
                            </div>
                            <div className={classes["invoice-slot-title"]}>
                                <span className={classes["light-title"]}>
                                    {"(25%)"}
                                </span>{" "}
                                $100
                            </div>
                        </div>
                        <InvoiceBoldSlot
                            title={"Total Due"}
                            subTitle={`$${calculateTotalDue()}`}
                        />
                        <button className={classes["send-button"]}>
                            Send Invoice
                        </button>
                    </div>
                </div>
            </div>
        </CustomModal>
    );
};

export default ViewInvoice;

const InfoSlot = ({ title, subTitle }) => {
    return (
        <div className={classes["info-slot-container"]}>
            <div className={classes["info-slot-title"]}>{title}</div>
            <div className={classes["info-slot-subtitle"]}>{subTitle}</div>
        </div>
    );
};

const InvoiceSlot = ({ title, subTitle }) => {
    return (
        <div className={classes["invoice-slot-container"]}>
            <div className={classes["invoice-slot-title"]}>{title}</div>
            <div className={classes["invoice-slot-title"]}>{subTitle}</div>
        </div>
    );
};

const InvoiceBoldSlot = ({ title, subTitle }) => {
    return (
        <div className={classes["invoice-bold-slot-container"]}>
            <div className={classes["invoice-bold-slot-title"]}>{title}</div>
            <div className={classes["invoice-bold-slot-title"]}>{subTitle}</div>
        </div>
    );
};

const getPriceByLensMaterial = () => {
    return 0;
};
