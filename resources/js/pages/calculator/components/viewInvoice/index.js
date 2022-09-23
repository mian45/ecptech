import React from "react";
import CustomModal from "../../../../components/customModal";
import classes from "./styles.module.scss";
import closeIcon from "../../../../../images/cross.png";

const ViewInvoice = ({ onClose }) => {
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
                            subTitle={"John Invoice for Lens"}
                        />
                        <InfoSlot
                            title={"Customer Name"}
                            subTitle={"John Smith"}
                        />
                        <InfoSlot
                            title={"Date of Birth"}
                            subTitle={"Jun 01, 1982"}
                        />
                        <InfoSlot
                            title={"Email"}
                            subTitle={"john@mymail.com"}
                        />
                        <InfoSlot
                            title={"Phone Number"}
                            subTitle={"123 456 7890"}
                        />
                    </div>
                    <div className={classes["sub-right-container"]}>
                        <div className={classes["page-label"]}>Retail Fees</div>
                        <InvoiceSlot
                            title={"Retail fee of frame"}
                            subTitle={"$0.00"}
                        />
                        <InvoiceSlot
                            title={"Lenses retail fee"}
                            subTitle={"$902.00"}
                        />
                        <InvoiceBoldSlot title={"Total"} subTitle={"$902.00"} />
                        <div className={classes["page-sub-label"]}>
                            Out of pocket Fees
                        </div>
                        {DATA.map((item, index) => {
                            return (
                                <InvoiceSlot
                                    key={index}
                                    title={item.title}
                                    subTitle={item.subTitle}
                                />
                            );
                        })}

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

const DATA = [
    {
        title: "Shamir Computer/Workspace ( Base fee )",
        subTitle: "$50.00",
    },
    {
        title: "Shamir Computer/Workspace ( Lens Material: Polycarbonate )",
        subTitle: "$0.00",
    },
    {
        title: "Material Copay",
        subTitle: "$200.00",
    },
    {
        title: "Photochromic Option: Transitions Signature 8",
        subTitle: "$75.00",
    },
    {
        title: "Antireflective Properties: Shamir Glacier Plus UV",
        subTitle: "$85.00",
    },
    {
        title: "Mirror Coating: Ski Type Mirror",
        subTitle: "$47.00",
    },
    {
        title: "Is Sunglass Lens Polarized?",
        subTitle: "Yes",
    },
    {
        title: "Polarized Fee",
        subTitle: "$77.00",
    },
];
