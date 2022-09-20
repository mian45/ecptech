import React, { useState } from "react";
import { Popover } from "antd";
import classes from "./styles.module.scss";
import moreIcon from "../../../../../images/more-icon.svg";

const InvoicesTableBodySlot = ({ data }) => {
    return (
        <tr className={classes["container"]}>
            <td>{data?.invoice}</td>
            <td>{data?.customerName}</td>
            <td>{data?.email}</td>
            <td>{data?.date}</td>
            <td>{data?.price}</td>
            <td>
                <div
                    className={
                        data?.status === "Paid"
                            ? classes["paid-tatus-tag"]
                            : classes["un-paid-tatus-tag"]
                    }
                >
                    {data?.status}
                </div>
            </td>
            <td className={classes["icon"]}>
                <InvoiceTableActions data={data} />
            </td>
        </tr>
    );
};

export default InvoicesTableBodySlot;

const InvoiceTableActions = ({ data }) => {
    const [openPopup, showPopup] = useState(false);
    const handleOpen = (value) => {
        showPopup(value);
    };
    const handleClose = () => {
        showPopup(false);
    };
    const RenderMenuContent = () => {
        return (
            <div>
                <div className={classes["more-icon"]} onClick={handleClose}>
                    VIEW
                </div>
                {data?.status !== "Paid" && (
                    <div className={classes["more-icon"]} onClick={handleClose}>
                        EDIT
                    </div>
                )}
                <div className={classes["more-icon"]} onClick={handleClose}>
                    DUPLICATE
                </div>
            </div>
        );
    };
    return (
        <Popover
            content={<RenderMenuContent />}
            trigger="click"
            open={openPopup}
            onOpenChange={handleOpen}
            placement={"left"}
        >
            <img
                src={moreIcon}
                alt={"more icon"}
                className={classes["more-icon"]}
            />
        </Popover>
    );
};
