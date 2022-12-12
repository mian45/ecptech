import { Col, Row } from "antd";
import React from "react";
import ButtonComponent from "../../../../../../components/Button";
import classes from "./buttonsList.module.scss";

const ButtonsList = ({ mode, handleSendInvoiceClick }) => {
    return (
        <Row>
            {mode !== "view" && (
                <Col className={classes["button-wrapper"]}>
                    <ButtonComponent
                        className={classes["send-button"]}
                        onClick={() => handleSendInvoiceClick("draft")}
                    >
                        Save as draft
                    </ButtonComponent>
                </Col>
            )}
            <Col className={classes["button-wrapper"]}>
                <ButtonComponent
                    className={classes["send-button"]}
                    onClick={() => handleSendInvoiceClick("unpaid")}
                >
                    {mode === "view" ? "Close" : "Save and Sent"}
                </ButtonComponent>
            </Col>
            {mode !== "view" && (
                <Col className={classes["button-wrapper"]}>
                    <ButtonComponent
                        className={classes["send-button"]}
                        onClick={() => handleSendInvoiceClick("paid")}
                    >
                        Save and Paid
                    </ButtonComponent>
                </Col>
            )}
        </Row>
    );
};
export default ButtonsList;
