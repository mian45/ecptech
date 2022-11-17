import React from "react";
import CardPayment from "./cardPayment";
import classes from "./styles.module.scss";
import { Col, Row } from 'antd';

const Payments = () => {
    return (
        <Row className={classes["root-container"]}>
            <Col className={classes["container"]}>
                <Col xs={24} className={classes["left-container"]}>
                    <CardPayment />
                </Col>
                <Col className={classes["right-container"]}></Col>
            </Col>
        </Row>
    );
};

export default Payments;
