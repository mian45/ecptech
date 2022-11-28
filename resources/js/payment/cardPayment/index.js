import React, { useState, useEffect } from "react";
import AddNewCard from "./components/addCard";
import AddCardModal from "./components/AddCardModal";
import CreditCard from "./components/creditCard";
import Subscriptions from "./components/subscriptions";
import classes from "./styles.module.scss";
import { Col, Row, message } from "antd";
import Axios from "../../Http";
const CardPayment = () => {
    const [showAddCard, setShowAddCard] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const handleOpenModal = () => {
        setShowAddCard(true);
    };
    const handleCloseModal = () => {
        setShowAddCard(false);
    };
    const [cardData, setCardData] = useState({});
    useEffect(() => {
        getPaymentMethod(false);
    }, []);
    const getPaymentMethod = async (isShow) => {
        try {
            const res = await Axios.get(
                `${process.env.MIX_REACT_APP_URL}/api/get-card`
            );
            setCardData(res.data.data);
            if (isShow) {
                messageApi.open({
                    type: "success",
                    content: res.data.message,
                    duration: 5,
                    className: 'custom-postion',
                });
            }
        } catch (err) {
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: 'custom-postion-error',
            });
        }
    };
    return (
        <Row className={classes["container"]}>
            <div>{contextHolder}</div>
            {showAddCard && (
                <AddCardModal show={showAddCard} onClose={handleCloseModal} getPaymentMethod={getPaymentMethod} />
            )}
            <Col offset={0} className={classes["label"]}>
                Payment Details
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
    );
};

export default CardPayment;
