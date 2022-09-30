import React, { useState } from "react";
import { Popover } from "antd";
import classes from "./styles.module.scss";
import moreIcon from "../../../../../images/more-icon.svg";
import { useHistory } from "react-router";
import { CREATE_INVOICE_ROUTE } from "../../../../appRoutes/routeConstants";
import ViewInvoice from "../../../../pages/calculator/components/viewInvoice";

const InvoicesTableBodySlot = ({ data }) => {
    return (
        <tr className={classes["container"]}>
            <td className={classes["first-column"]}>{data?.name}</td>
            <td>{`${data?.customer?.fname} ${data?.customer?.lname}`}</td>
            <td>{data?.customer?.email}</td>
            <td>{data?.customer?.date}</td>
            <td>{data?.amount}</td>
            <td>
                <div
                    className={
                        data?.status === "Paid" || data?.status === "discard"
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
                <div className={classes["more-icon"]} onClick={handleClose}>
                    DUPLICATE
                </div>
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
