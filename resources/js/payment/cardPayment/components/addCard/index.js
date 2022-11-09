import React from "react";
import classes from "./styles.module.scss";
import addIcon from "../../../../../images/add-card-icon.png";
import { Col, Row } from "antd";

const AddNewCard = ({ onClick }) => {
    return (
        <Col xs={18} lg={6} className={classes["container"]} onClick={onClick}>
            <div className={classes["icon-wrapper"]}>
                <img
                    src={addIcon}
                    alt="add-card"
                    className={classes["add-icon"]}
                />
            </div>
            <div className={classes["title"]}>
                Add <br /> New Card
            </div>
        </Col>
    );
};

export default AddNewCard;
