import React, { useState } from "react";
import CustomModal from "../../../../components/customModal";
import classes from "./styles.module.scss";
import closeIcon from "../../../../../images/cross.png";
import {
    CRIZAL_SUNSHIELD,
    POLARIZED,
    SHAMIR_GLACIER_PLUS_UV,
    SKI_TYPE_MIRROR,
    SOLID_SINGLE_GRADIENT,
    TECHSHIELD_PLUS_UVR,
} from "../../data/constants";

const ViewInvoice = ({ onClose, calValues, userInfo }) => {
    const [receipt, setReceipt] = useState({ userInfo, calValues });
    const calculateTotalDue = () => {
        const total = 0;
    };

    const getCoatingPrice = () => {
        if (
            receipt?.calValues?.sunGlassesLens?.coatingType ===
            "Ski Type Mirror"
        ) {
            return SKI_TYPE_MIRROR;
        } else if (
            receipt?.calValues?.sunGlassesLens?.coatingType ===
            "Solid/Single Gradient"
        ) {
            return SOLID_SINGLE_GRADIENT;
        } else {
            return 0;
        }
    };
    const getAntireflectivePrice = () => {
        if (receipt?.calValues?.type === "Shamir Glacier Plus UV") {
            return SHAMIR_GLACIER_PLUS_UV;
        } else if (receipt?.calValues?.type === "TechShield Plus UVR") {
            return TECHSHIELD_PLUS_UVR;
        } else if (
            receipt?.calValues?.type === "Crizal Sunshield (Backside AR Only)"
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
                            subTitle={`${receipt?.calValues?.invoiceName}`}
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
                            subTitle={`${receipt?.calValues?.frameOrder?.retailFee}`}
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
                                receipt?.calValues?.status === "Yes"
                                    ? receipt?.calValues?.type
                                    : ""
                            }`}
                            subTitle={`$${getAntireflectivePrice()}`}
                        />
                        <InvoiceSlot
                            title={`Mirror Coating: ${receipt?.calValues?.sunGlassesLens?.coatingType}`}
                            subTitle={`${getCoatingPrice() || 0}`}
                        />
                        <InvoiceSlot
                            title={"Is Sunglass Lens Polarized?"}
                            subTitle={
                                receipt?.calValues?.sunGlassesLens?.status
                            }
                        />
                        <InvoiceSlot
                            title={"Polarized Fee"}
                            subTitle={
                                receipt?.calValues?.sunGlassesLens?.lensType ===
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
                            subTitle={"$534.20"}
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
