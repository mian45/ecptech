import React from "react";
import classes from "./styles.module.scss";
import calenderIcon from "../../../../../images/calender.svg";
import clockIcon from "../../../../../images/clock.svg";
import tickIcon from "../../../../../images/tick-blue.svg";
import { Row, Col } from "antd";

const Subscriptions = () => {
    return (
        <Row gutter={[0, 8]} className={classes["container"]}>
            {DATA?.map((card, index) => {
                return (
                    <SubscriptionSlot key={index} data={card} />
                ) 
            })}
        </Row>
    );
};

export default Subscriptions;

const SubscriptionSlot = ({ data }) => {
    return (
        <Col xs={24} lg={6} className={classes["slot-container"]}>
            <img src={data?.image} alt={"icon"} className={classes["icon"]} />
            <div className={classes["info"]}>
                <div className={classes["status-label"]}>{data?.title}</div>
                <div className={classes["status"]}>{data?.subtitle}</div>
            </div>
        </Col>
    );
};

const DATA = [
    {
        image: tickIcon,
        title: "Status",
        subtitle: "Active",
    },
    {
        image: clockIcon,
        title: "Type",
        subtitle: "Monthly",
    },
    {
        image: calenderIcon,
        title: "End Date",
        subtitle: "Aug 28, 2022",
    },
];
