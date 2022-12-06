import { Col, Row } from "antd";
import React from "react";
import classes from "./buttonsList.module.scss";

const ButtonsList = ({ mode, handleSendInvoiceClick }) => {
    return (
        <Row>
            {mode !== "view" && (
                <Col className={classes["button-wrapper"]}>
                    <button className={classes["send-button"]} disabled={true}>
                        Save as draft
                    </button>
                </Col>
            )}
            <Col className={classes["button-wrapper"]}>
                <button
                    className={classes["send-button"]}
                    onClick={handleSendInvoiceClick}
                >
                    {mode === "view" ? "Close" : "Save and Sent"}
                </button>
            </Col>
            {mode !== "view" && (
                <Col className={classes["button-wrapper"]}>
                    <button className={classes["send-button"]} disabled={true}>
                        Save and Paid
                    </button>
                </Col>
            )}
        </Row>
    );
};
export default ButtonsList;
