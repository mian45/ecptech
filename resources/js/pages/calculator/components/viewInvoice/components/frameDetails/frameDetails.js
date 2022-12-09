import { Row, Collapse, Col } from "antd";
import Icon from "@ant-design/icons";
import React from "react";
import classes from "./frameDetails.module.scss";
import { GetFrameFee } from "../../helpers/pricesHelper/calculateOtherPlansPrices";
import { DRILL_MOUNT } from "../../../../data/constants";
import {
    GetEyemedDrillMountFee,
    GetEyemedFrameFee,
} from "../../helpers/pricesHelper/calculateEyemedPrice";

const { Panel } = Collapse;

const FrameDetails = ({ receipt, calculatorObj, lensPrices }) => {
    const currentPlan = receipt?.values?.visionPlan;
    const rendeFrameFee = () => {
        let price = 0;
        if (currentPlan === "Eyemed") {
            // add Frame Fee
            price =
                price +
                parseFloat(GetEyemedFrameFee(receipt?.values, calculatorObj));
            //add drill mount fee
            price = price + parseFloat(GetEyemedDrillMountFee(receipt?.values));
        } else {
            price =
                GetFrameFee(
                    calculatorObj,
                    receipt?.values,
                    currentPlan === "Private Pay" ? true : false
                ) || 0;
        }
        return (price || 0).toFixed(2);
    };

    const renderOnlyFrameFee = () => {
        const isPrivate = currentPlan === "Private Pay" ? true : false;
        const data = receipt?.values;
        let total = 0;
        const retailFee = parseFloat(data?.frameOrder?.retailFee || "");
        const frameContribution = parseFloat(
            data?.frameOrder?.frameContribution || ""
        );
        const onlyThisTime = "Only multiple pair benefit only at this time";
        const newFrame = "New Frame Purchase";
        if (
            (isPrivate || data?.isFrameBenifit === onlyThisTime) &&
            data?.frameOrder?.type === newFrame
        ) {
            total = retailFee;
        } else if (
            data?.isFrameBenifit === "Yes" &&
            data?.frameOrder?.type === newFrame
        ) {
            if (retailFee <= frameContribution) {
                total = total + 0;
            } else if (retailFee > frameContribution) {
                const actualPrice = retailFee - frameContribution;
                const discount = actualPrice * 0.2;
                const payableFramePrice = actualPrice - discount;
                total = total + (payableFramePrice || 0);
            }
        } else if (
            data?.isFrameBenifit === "Yes" &&
            data?.frameOrder?.type === "Patient Own Frame" &&
            data?.tracing?.status === "Yes"
        ) {
            total = total + (calculatorObj?.tracing_fee || 0);
        }
        return (total || 0).toFixed(2);
    };

    const renderDrillMount = () => {
        let total = 0;
        const data = receipt?.values;
        if (
            currentPlan === "Eyemed" &&
            data?.frameOrder?.drillMount === "Yes"
        ) {
            total = total + parseFloat(data?.frameOrder?.drillMountPrice || "");
        } else if (data?.frameOrder?.drillMount === "Yes") {
            total = total + DRILL_MOUNT;
        }
        return (total || 0).toFixed(2);
    };

    const renderTracing = () => {
        data?.isFrameBenifit === "Yes" &&
        data?.frameOrder?.type === "Patient Own Frame" &&
        data?.tracing?.status === "Yes"
            ? "(Tracing Fee)"
            : "";
    };

    return (
        <Row>
            <Col xs={24}>
                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) =>
                        isActive ? <RenderMinusIcon /> : <RenderPlusIcon />
                    }
                >
                    <Panel
                        header="Frame Order"
                        key="1"
                        className={classes["panel"]}
                        extra={`$${rendeFrameFee()}`}
                    >
                        <GetFramePriceByPlan
                            framePrice={renderOnlyFrameFee}
                            drillMount={renderDrillMount}
                            receipt={receipt}
                            renderTracing={renderTracing}
                        />
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};
export default FrameDetails;

const GetFramePriceByPlan = ({
    framePrice,
    drillMount,
    receipt,
    renderTracing,
}) => {
    if (
        receipt?.values?.isFrameBenifit ===
        "Only multiple pair benefit only at this time"
    ) {
        return (
            <Row>
                <Col xs={24}>
                    <FramePriceSlot
                        title={"Drill Mount"}
                        price={`$${drillMount()}`}
                    />
                </Col>
                <Col xs={24} className={classes["self-pay"]}>
                    Estimates under Private Pay
                </Col>
                <Col xs={24}>
                    <FramePriceSlot
                        title={`${Frame} ${renderTracing()}`}
                        price={`$${framePrice()}`}
                    />
                </Col>
            </Row>
        );
    } else {
        return (
            <Row>
                <Col xs={24}>
                    <FramePriceSlot
                        title={"Frame"}
                        price={`$${framePrice()}`}
                    />
                </Col>
                <Col xs={24}>
                    <FramePriceSlot
                        title={"Drill Mount"}
                        price={`$${drillMount()}`}
                    />
                </Col>
            </Row>
        );
    }
};

export const FramePriceSlot = ({ title, price, className, priceClass }) => {
    return (
        <Row className={`${classes["frame-price-slot"]} ${className}`}>
            <Col xs={16} sm={20} className={classes["frame-price-slot-title"]}>
                {title}
            </Col>
            <Col
                xs={8}
                sm={4}
                className={`${classes["frame-price-slot-price"]} ${priceClass}`}
            >
                {price}
            </Col>
        </Row>
    );
};

const PlusIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11.899"
            height="11.899"
            viewBox="0 0 11.899 11.899"
        >
            <g id="plus" transform="translate(1 5.95) rotate(-45)">
                <line
                    id="Line_76"
                    data-name="Line 76"
                    x2="7"
                    y2="7"
                    transform="translate(0)"
                    fill="none"
                    stroke="#2a2a2a"
                    stroke-linecap="round"
                    stroke-width="1"
                />
                <line
                    id="Line_77"
                    data-name="Line 77"
                    x1="7"
                    y2="7"
                    transform="translate(0)"
                    fill="none"
                    stroke="#2a2a2a"
                    stroke-linecap="round"
                    stroke-width="1"
                />
            </g>
        </svg>
    );
};
export const RenderPlusIcon = (props) => (
    <Icon component={PlusIcon} {...props} />
);

const MinusIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11.993"
            height="11.899"
            viewBox="0 0 11.993 11.899"
        >
            <g id="plus" transform="translate(1.093 5.95) rotate(-45)">
                <line
                    id="Line_76"
                    data-name="Line 76"
                    x2="7"
                    y2="7"
                    transform="translate(0)"
                    fill="none"
                    stroke="#2a2a2a"
                    stroke-linecap="round"
                    stroke-width="1"
                />
                <line
                    id="Line_77"
                    data-name="Line 77"
                    x1="7"
                    y2="7"
                    transform="translate(6.934 -0.066) rotate(90)"
                    fill="none"
                    stroke="#2a2a2a"
                    stroke-linecap="round"
                    stroke-width="1"
                />
            </g>
        </svg>
    );
};
export const RenderMinusIcon = (props) => (
    <Icon component={MinusIcon} {...props} />
);
