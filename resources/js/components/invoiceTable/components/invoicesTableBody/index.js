import React, { useState } from "react";
import { Popover } from "antd";
import classes from "./styles.module.scss";
import moreIcon from "../../../../../images/more-icon.svg";
import { useHistory } from "react-router";
import { CREATE_INVOICE_ROUTE } from "../../../../appRoutes/routeConstants";
import ViewInvoice from "../../../../pages/calculator/components/viewInvoice";
import dayjs from "dayjs";

const InvoicesTableBodySlot = ({ data }) => {
    const date = data?.created_at || new Date();
    const year = dayjs(date).get("year");
    const month = dayjs(date).get("month") + 1; // start 0
    const day = dayjs(date).get("date");
    const createdDate = `${month}/${day}/${year}`;
    return (
        <tr className={classes["container"]}>
            <td className={classes["first-column"]}>{data?.name}</td>
            <td className={classes["first-column"]}>{`${data?.customer?.fname} ${data?.customer?.lname}`}</td>
            <td className={classes["first-column"]}>{data?.customer?.email}</td>
            <td className={classes["first-column"]}>{createdDate}</td>
            <td className={classes["first-column"]}>${data?.amount}</td>
            <td>
                <div
                    className={
                        data?.status === "paid" || data?.status === "discard"
                            ? classes["paid-status-tag"]
                            : classes["un-paid-status-tag"]
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
    const history = useHistory();
    const [openPopup, showPopup] = useState(false);
    const [showInvoice, setShowInvoice] = useState(false);
    const handleOpen = (value) => {
        showPopup(value);
    };
    const handleClose = () => {
        showPopup(false);
    };
    const openInvoice = (value) => {
        showPopup(false);
        setShowInvoice(true);
    };
    const closeInvoice = () => {
        setShowInvoice(false);
    };

    const getUserInfo = () => {
        return {
            dob: data?.customer?.dob,
            email: data?.customer?.email,
            firstName: data?.customer?.fname,
            lastName: data?.customer?.lname,
            phoneNo: data?.customer?.phone,
        };
    };
    const getCalculatorObject = () => {
        const vpState = JSON.parse(data?.vp_state);
        return {
            lens_material: vpState?.lens_material,
            lens_types: vpState?.lens_types,
            questions: vpState?.questions,
            price_calculation_data: vpState?.price_calculation_data,
            shipping: vpState?.shipping,
        };
    };
    const getUserState = () => {
        const userData = JSON.parse(data?.user_state);
        return userData;
    };
    const RenderMenuContent = () => {
        return (
            <div>
                <div className={classes["more-icon"]} onClick={openInvoice}>
                    VIEW
                </div>
                {data?.status !== "Paid" && (
                    <div
                        className={classes["more-icon"]}
                        onClick={() => {
                            history.push({
                                pathname: CREATE_INVOICE_ROUTE,
                                state: { invoice: data },
                            });
                            handleClose();
                        }}
                    >
                        EDIT
                    </div>
                )}
            </div>
        );
    };
    return (
        <>
            {showInvoice && (
                <ViewInvoice
                    onClose={closeInvoice}
                    calValues={getUserState()}
                    userInfo={getUserInfo()}
                    calculatorObj={getCalculatorObject()}
                    mode={"view"}
                />
            )}
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
        </>
    );
};
