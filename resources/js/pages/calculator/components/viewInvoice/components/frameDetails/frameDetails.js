import { Row, Collapse, Col } from "antd";
import Icon from "@ant-design/icons";
import React from "react";
import classes from "./frameDetails.module.scss";
import { GetFrameFee } from "../../helpers/pricesHelper/calculateOtherPlansPrices";
import { DRILL_MOUNT, RIMLESS_DRILL } from "../../../../data/constants";
import {
    GetEyemedDrillMountFee,
    GetEyemedFrameFee,
} from "../../helpers/pricesHelper/calculateEyemedPrice";
import { AllPlans } from "../../../../data/plansList";
import { Plans } from "../../../../data/plansJson";
import { connect } from "react-redux";
import { GetDavisDrillMountFee } from "../../helpers/pricesHelper/calculateDavisPrice";
import PlanTitles from "../../../../data/plansTitles/planTitles";

const { Panel } = Collapse;

const FrameDetails = ({ receipt, calculatorObj, lensPrices, language }) => {
    const currentPlan = receipt?.values?.visionPlan;
    const plansList = AllPlans[language];
    const plansJson = Plans()[language];
    const { drillMountTitle } = PlanTitles(
        language,
        receipt?.values?.visionPlan
    );
    const rendeFrameFee = () => {
        let price = 0;
        if (currentPlan === plansList?.eyemed) {
            // add Frame Fee
            price =
                price +
                parseFloat(
                    GetEyemedFrameFee(receipt?.values, calculatorObj, plansJson)
                );

            //add drill mount fee
            price =
                price +
                parseFloat(GetEyemedDrillMountFee(receipt?.values, plansJson));
        } else if (currentPlan === plansList?.davis) {
            // add Frame Fee
            price =
                price +
                parseFloat(
                    GetEyemedFrameFee(receipt?.values, calculatorObj, plansJson)
                );

            //add drill mount fee
            price =
                price +
                parseFloat(GetDavisDrillMountFee(receipt?.values, plansJson));
        } else {
            price =
                GetFrameFee(
                    calculatorObj,
                    receipt?.values,
                    currentPlan === plansList?.privatePay ? true : false
                ) || 0;
        }
        return (price || 0).toFixed(2);
    };

    const renderOnlyFrameFee = () => {
        const isPrivate = currentPlan === plansList?.privatePay ? true : false;
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
            total = total + parseFloat(calculatorObj?.tracing_fee || 0);
        }
        return (total || 0).toFixed(2);
    };
    const renderDrillMount = () => {
        let total = 0;
        const data = receipt?.values;
        if (
            currentPlan === plansList?.eyemed &&
            data?.frameOrder?.drillMount === "Yes"
        ) {
            total = total + parseFloat(data?.frameOrder?.drillMountPrice || "");
        } else if (
            currentPlan === plansList?.davis &&
            data?.frameOrder?.drillMount === "Yes"
        ) {
            total = total + parseFloat(RIMLESS_DRILL || 0);
        } else if (data?.frameOrder?.drillMount === "Yes") {
            total = total + DRILL_MOUNT;
        }
        return (total || 0).toFixed(2);
    };

    const renderTracing = () => {
        return receipt?.values?.isFrameBenifit === "Yes" &&
            receipt?.values?.frameOrder?.type === "Patient Own Frame" &&
            receipt?.values?.tracing?.status === "Yes"
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
                            drillMountTitle={drillMountTitle}
                        />
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(FrameDetails);

const GetFramePriceByPlan = ({
    framePrice,
    drillMount,
    receipt,
    renderTracing,
    drillMountTitle,
}) => {
    if (
        receipt?.values?.isFrameBenifit ===
        "Only multiple pair benefit only at this time"
    ) {
        return (
            <Row>
                {receipt?.values?.frameOrder?.type !== "Patient Own Frame" && (
                    <Col xs={24}>
                        <FramePriceSlot
                            title={drillMountTitle}
                            price={`$${drillMount() || 0}`}
                        />
                    </Col>
                )}
                <Col xs={24} className={classes["self-pay"]}>
                    Estimates under Private Pay
                </Col>
                <Col xs={24}>
                    <FramePriceSlot
                        title={`${"Frame"} ${renderTracing()}`}
                        price={`$${framePrice() || 0}`}
                    />
                </Col>
            </Row>
        );
    } else {
        return (
            <Row>
                <Col xs={24}>
                    <FramePriceSlot
                        title={`${"Frame"} ${renderTracing()}`}
                        price={`$${framePrice() || 0}`}
                    />
                </Col>
                {receipt?.values?.frameOrder?.type !== "Patient Own Frame" && (
                    <Col xs={24}>
                        <FramePriceSlot
                            title={drillMountTitle}
                            price={`$${drillMount() || 0}`}
                        />
                    </Col>
                )}
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
                    strokeLinecap="round"
                    strokeWidth="1"
                />
                <line
                    id="Line_77"
                    data-name="Line 77"
                    x1="7"
                    y2="7"
                    transform="translate(0)"
                    fill="none"
                    stroke="#2a2a2a"
                    strokeLinecap="round"
                    strokeWidth="1"
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
                    strokeLinecap="round"
                    strokeWidth="1"
                />
                <line
                    id="Line_77"
                    data-name="Line 77"
                    x1="7"
                    y2="7"
                    transform="translate(6.934 -0.066) rotate(90)"
                    fill="none"
                    stroke="#2a2a2a"
                    strokeLinecap="round"
                    strokeWidth="1"
                />
            </g>
        </svg>
    );
};
export const RenderMinusIcon = (props) => (
    <Icon component={MinusIcon} {...props} />
);
