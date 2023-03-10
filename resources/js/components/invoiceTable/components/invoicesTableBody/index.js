import React, { useState, useEffect } from "react";
import { Popover } from "antd";
import classes from "./styles.module.scss";
import moreIcon from "../../../../../images/more-icon.svg";
import { useHistory } from "react-router";
import { CREATE_INVOICE_ROUTE } from "../../../../appRoutes/routeConstants";
import ViewInvoice from "../../../../pages/calculator/components/viewInvoice";
import dayjs from "dayjs";
import Axios from "../../../../Http.js";

const InvoicesTableBodySlot = ({ data }) => {
    const date = data?.created_at || new Date();
    const year = dayjs(date).get("year");
    const month = dayjs(date).get("month") + 1; // start 0
    const day = dayjs(date).get("date");
    const createdDate = `${month}/${day}/${year}`;
    return (
        <tr className={classes["container"]}>
            <td className={classes["first-column"]}>{data?.name}</td>
            <td
                className={classes["first-column"]}
            >{`${data?.customer?.fname} ${data?.customer?.lname}`}</td>
            <td className={classes["first-column"]}>{data?.customer?.email}</td>
            <td className={classes["first-column"]}>{data?.customer?.dob}</td>
            <td className={classes["first-column"]}>${data?.amount}</td>
            <td>
                <div
                    className={
                        data?.status === "paid" || data?.status === "discard"
                            ? classes["paid-status-tag"]
                            : data?.status === "draft"
                            ? classes["draft-status-tag"]
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
    const [lensPrices, setLensPrices] = useState({});

    useEffect(() => {
        getLensTypes();
    }, []);

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
    };
    const getLensTypes = async () => {
        if (!data?.vp_state) return;
        const vpState = JSON.parse(data?.vp_state);
        const userState = JSON.parse(data?.user_state);

        const planId = vpState?.questions?.find(
            (item) => item?.title === userState?.visionPlan
        )?.id;
        const lensType = vpState?.lens_types?.find(
            (item) => item?.title === userState?.lensType?.type
        );
        const materialId = vpState?.lens_material?.find((item) => {
            return item.lens_material_title === userState?.lensMaterial;
        })?.id;
        let collectionId = null;
        lensType?.brands?.forEach((item) => {
            item?.collections?.forEach((val) => {
                const setCollectionId = () => {
                    if (val?.title == userState?.lensType?.brand) {
                        collectionId = val?.id;
                    }
                };

                setCollectionId();
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
                {data?.status !== "paid" ? (
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
                ):null}
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
                    lensPrices={lensPrices}
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
