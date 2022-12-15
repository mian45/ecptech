import Icon from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Plans } from "../../../../data/plansJson";
import { AllPlans } from "../../../../data/plansList";
import { GetFrameRetailFee } from "../../helpers/pricesHelper/calculateOtherPlansPrices";
import {
    CalculateTotalPrice,
    CalculateWithTaxesTotalPrice,
    GetAppliedDiscount,
} from "../../helpers/pricesHelper/calculateTotalPrice";
import ButtonsList from "../buttonsList/buttonsList";
import FrameDetails, { FramePriceSlot } from "../frameDetails/frameDetails";
import LensesDetails from "../lensesDetails/lensesDetails";
import classes from "./style.module.scss";

const DetailsList = ({
    receipt,
    calculatorObj,
    lensPrices,
    mode,
    handleSendInvoiceClick,
    language,
    davisMaterials,
}) => {
    const currentPlan = receipt?.values?.visionPlan;
    const plansList = AllPlans[language];
    const plansJson = Plans()[language];

    const getTax = () => {
        let totalTax = 0;
        calculatorObj?.tax?.forEach((element) => {
            if (element?.status === "active") {
                totalTax = totalTax + parseFloat(element?.value || 0);
            }
        });
        const totalPrice = CalculateTotalPrice(
            receipt?.values,
            calculatorObj,
            lensPrices,
            plansList,
            plansJson,
            davisMaterials
        );
        const taxValue = totalPrice * (totalTax || 0);
        return taxValue / 100;
    };

    const getTaxPercentage = () => {
        let totalTax = 0;
        calculatorObj?.tax?.forEach((element) => {
            if (element?.status === "active") {
                totalTax = totalTax + parseFloat(element?.value || 0);
            }
        });
        return (totalTax || 0).toFixed(2);
    };

    const glassesCost = () => {
        let total = 0;
        if (receipt?.values?.frameOrder?.type === "New Frame Purchase") {
            total =
                total + parseFloat(receipt?.values?.frameOrder?.retailFee || 0);
        }
        total =
            total +
            parseFloat(GetFrameRetailFee(calculatorObj, receipt?.values) || 0);
        return total;
    };

    const DownloadIcon = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20.573"
                height="20.573"
                viewBox="0 0 20.573 20.573"
            >
                <g
                    id="Icon_feather-download"
                    data-name="Icon feather-download"
                    transform="translate(-3.75 -3.75)"
                >
                    <path
                        id="Path_158"
                        data-name="Path 158"
                        d="M23.573,22.5v4.238a2.119,2.119,0,0,1-2.119,2.119H6.619A2.119,2.119,0,0,1,4.5,26.738V22.5"
                        transform="translate(0 -5.285)"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                    />
                    <path
                        id="Path_159"
                        data-name="Path 159"
                        d="M10.5,15l5.3,5.3L21.1,15"
                        transform="translate(-1.762 -3.083)"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                    />
                    <path
                        id="Path_160"
                        data-name="Path 160"
                        d="M18,17.215V4.5"
                        transform="translate(-3.963)"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                    />
                </g>
            </svg>
        );
    };
    const RenderDownloadIcon = (props) => (
        <Icon component={DownloadIcon} {...props} />
    );

    const RenderDiscount = () => {
        const discount = (
            GetAppliedDiscount(
                CalculateTotalPrice(
                    receipt?.values,
                    calculatorObj,
                    lensPrices,
                    plansList,
                    plansJson,
                    davisMaterials
                ),
                receipt?.values
            ) || 0
        )?.toFixed(2);
        if (discount > 0) {
            return (
                <Col xs={24}>
                    <FramePriceSlot
                        title={"Discount"}
                        price={`$${discount}`}
                        className={classes["tax-Slot"]}
                        priceClass={classes["price-padding"]}
                    />
                </Col>
            );
        } else {
            return <></>;
        }
    };
    const savings = () => {
        const totalFrame = (glassesCost() || 0).toFixed(2);
        const discountPrice = (
            CalculateWithTaxesTotalPrice(
                receipt?.values,
                calculatorObj,
                lensPrices,
                plansList,
                plansJson,
                davisMaterials
            ) || 0
        ).toFixed(2);
        const discount = totalFrame - discountPrice;
        return parseFloat(discount || 0).toFixed(2);
    };

    return (
        <Row>
            <Col xs={24} className={classes["container"]}>
                <Row>
                    <Col xs={23} className={classes["page-title"]}>
                        <Row>
                            <Col
                                xs={24}
                            >{`Estimate for ${receipt?.values?.invoiceName}`}</Col>
                            <Col xs={24} className={classes["title-container"]}>
                                <NameSlot
                                    title={"Name:"}
                                    subtitle={`${receipt?.userInfo?.firstName} ${receipt?.userInfo?.lastName}`}
                                />
                                <NameSlot
                                    title={"Email:"}
                                    subtitle={`${
                                        receipt?.userInfo?.email || ""
                                    }`}
                                />
                                {receipt?.userInfo?.phoneNo && (
                                    <NameSlot
                                        title={"Phone:"}
                                        subtitle={`${receipt?.userInfo?.phoneNo}`}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={1} className={classes["download-icon"]}>
                        <RenderDownloadIcon />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} className={classes["divider"]} />
                    <Col xs={24}>
                        <Row
                            justify="center"
                            className={classes["page-header"]}
                        >
                            <Col
                                xs={12}
                                className={classes["page-header-title"]}
                            >
                                Item Description
                            </Col>
                            <Col
                                xs={12}
                                className={classes["page-header-subtitle"]}
                            >
                                Price
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24}>
                        <FrameDetails
                            receipt={receipt}
                            calculatorObj={calculatorObj}
                            lensPrices={lensPrices}
                        />
                    </Col>
                    <Col xs={24} className={classes["lenses-container"]}>
                        <LensesDetails
                            receipt={receipt}
                            calculatorObj={calculatorObj}
                            lensPrices={lensPrices}
                            davisMaterials={davisMaterials}
                        />
                    </Col>
                    <Col xs={24} className={classes["divider-doted"]} />
                    {getTax() > 0 && (
                        <Col xs={24}>
                            <Row className={classes["frame-price-slot"]}>
                                <Col
                                    xs={14}
                                    sm={17}
                                    className={
                                        classes["frame-price-slot-title"]
                                    }
                                >
                                    Tax:
                                </Col>
                                <Col
                                    xs={10}
                                    sm={7}
                                    className={
                                        classes["frame-price-slot-price"]
                                    }
                                >
                                    <span
                                        className={
                                            classes[
                                                "frame-price-slot-price-percent"
                                            ]
                                        }
                                    >
                                        {`(${getTaxPercentage()}%)`}
                                    </span>
                                    <span>{`$${(getTax() || 0).toFixed(
                                        2
                                    )}`}</span>
                                </Col>
                            </Row>
                        </Col>
                    )}
                    {receipt?.values?.shipping?.status === "Yes" && (
                        <Col xs={24}>
                            <FramePriceSlot
                                title={"Shipping"}
                                price={`$${(
                                    parseFloat(calculatorObj?.shipping || 0) ||
                                    0
                                ).toFixed(2)}`}
                                className={classes["tax-Slot"]}
                                priceClass={classes["price-padding"]}
                            />
                        </Col>
                    )}
                    <RenderDiscount />
                    <Col xs={24}>
                        <FramePriceSlot
                            className={classes["tax-Slot"]}
                            priceClass={classes["price-padding"]}
                            title={
                                "Retail fee your glasses would have cost without your vision plan"
                            }
                            price={`$${(glassesCost() || 0).toFixed(2)}`}
                        />
                    </Col>
                    <Col xs={24}>
                        <Row className={classes["total-slot"]}>
                            <Col
                                xs={14}
                                sm={19}
                                className={classes["total-slot-title"]}
                            >
                                Out of Pocket Fees After Your Vision Plan
                                Contribution
                            </Col>
                            <Col
                                xs={10}
                                sm={5}
                                className={classes["total-slot-price"]}
                            >
                                {`$${(
                                    CalculateWithTaxesTotalPrice(
                                        receipt?.values,
                                        calculatorObj,
                                        lensPrices,
                                        plansList,
                                        plansJson,
                                        davisMaterials
                                    ) || 0
                                ).toFixed(2)}`}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} className={classes["saving-Slot"]}>
                        <span className={classes["saving-title"]}>
                            Savings of :{" "}
                        </span>
                        <span
                            className={classes["saving-price"]}
                        >{`$${savings()}`}</span>
                    </Col>
                    <Col xs={24}>
                        <ButtonsList
                            mode={mode}
                            handleSendInvoiceClick={handleSendInvoiceClick}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(DetailsList);

const NameSlot = ({ title, subtitle }) => {
    return (
        <Row className={classes["name-slot"]}>
            <Col className={classes["name-slot-title"]}>{title}</Col>
            <Col className={classes["name-slot-subtitle"]}>{subtitle}</Col>
        </Row>
    );
};
