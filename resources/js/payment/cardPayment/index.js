import React, { useState } from "react";
import AddNewCard from "./components/addCard";
import AddCardModal from "./components/AddCardModal";
import CreditCard from "./components/creditCard";
import Subscriptions from "./components/subscriptions";
import classes from "./styles.module.scss";

const CardPayment = () => {
    const [showAddCard, setShowAddCard] = useState(false);
    const handleOpenModal = () => {
        setShowAddCard(true);
    };
    const handleCloseModal = () => {
        setShowAddCard(false);
    };
    return (
        <div className={classes["container"]}>
            {showAddCard && (
                <AddCardModal show={showAddCard} onClose={handleCloseModal} />
            )}
            <div className={classes["label"]}>Payment Details</div>
            <div className={classes["subtitle"]}>
                Your card is
                <span className={classes["card-status"]}> Active</span>.
                Subscription amount will be deducted from this card.
            </div>
            <div className={classes["card-wrapper"]}>
                <CreditCard />
                <AddNewCard onClick={handleOpenModal} />
            </div>
            <div className={classes["label"]}>Subscription Details</div>
            <Subscriptions />
        </div>
    );
};

export default CardPayment;
