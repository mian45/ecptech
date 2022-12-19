import React, { useState, useEffect } from "react";
import AddNewCard from "./components/addCard";
import CreditCard from "./components/creditCard";
import Subscriptions from "./components/subscriptions";
import classes from "./styles.module.scss";
import { Col, Row} from "antd";
const CardPayment = ({setShowAddCard,cardData}) => {
    const handleOpenModal = () => {
        setShowAddCard(true);
    };
    return (
       <>
       <Row className={classes["container"]}>
            <Col offset={0} className={classes["label"]}>
                Billing Details
            </Col>
            <Col offset={0} className={classes["subtitle"]}>
                Your card is
                <span className={classes["card-status"]}> Active</span>.
                Subscription amount will be deducted from this card.
            </Col>
            <Row gutter={[0, 10]} className={classes["card-wrapper"]}>
                <Col>
                    <CreditCard data={cardData} />
                </Col>
                <Col>
                    <AddNewCard onClick={handleOpenModal} />
                </Col>
            </Row>
            <Col offset={0} className={classes["label"]}>
                Subscription Details
            </Col>
            <Subscriptions />
        </Row>
        </>
    );
};

export default CardPayment;
