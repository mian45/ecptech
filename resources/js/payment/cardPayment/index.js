import React, { useState, useEffect } from "react";
import AddNewCard from "./components/addCard";
import AddCardModal from "./components/AddCardModal";
import CreditCard from "./components/creditCard";
import Subscriptions from "./components/subscriptions";
import classes from "./styles.module.scss";
import { Col, Row} from 'antd';
import Axios from "../../Http";
const CardPayment = () => {
    const [showAddCard, setShowAddCard] = useState(false);
    const handleOpenModal = () => {
        setShowAddCard(true);
    };
    const handleCloseModal = () => {
        setShowAddCard(false);
    };
    const [cardData, setCardData] = useState({});
    useEffect(() => {
        getPaymentMethod();
    }, [showAddCard]);
    const getPaymentMethod = async () => {
        const res = await Axios.get(
            `${process.env.MIX_REACT_APP_URL}/api/get-card`
        );
        setCardData(res.data.data);
    };
    return (
        <Row className={classes["container"]}>
            {showAddCard && (
                <AddCardModal show={showAddCard} onClose={handleCloseModal} />
            )}
            <Col offset={0} className={classes["label"]}>Payment Details</Col>
            <Col offset={0} className={classes["subtitle"]}>
                Your card is
                <span className={classes["card-status"]}> Active</span>.
                Subscription amount will be deducted from this card.
            </Col>
            <Row gutter={[0,10]} className={classes["card-wrapper"]}>
                <CreditCard data={cardData} />
                <AddNewCard onClick={handleOpenModal} />
            </Row>
            <Col offset={0} className={classes["label"]}>Subscription Details</Col>
            <Subscriptions />
        </Row>
    );
};

export default CardPayment;
