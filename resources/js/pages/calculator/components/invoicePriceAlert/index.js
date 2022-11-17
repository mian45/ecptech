import React, { useState } from "react";
import classes from "./style.module.scss";
import { Col, Modal, Row } from "antd";
import alertIcon from "../../../../assets/Alert.png";
import CustomCheckbox from "../../../../components/customCheckbox";

const InvoicePriceAlert = ({ open, cancel, accept }) => {
    const [dontShow, setDontShow] = useState(false);
    const handleDontShowCheckbox = (value) => {
        setDontShow(value);
    };
    return (
        <Modal
            title=""
            open={open}
            closable={false}
            centered={true}
            forceRender={false}
            destroyOnClose={true}
            bodyStyle={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
            }}
            zIndex="99999"
            footer={null}
            width={"600px"}
        >
            <Row justify="center">
                <Col sm={24} style={{ textAlign: "center" }}>
                    <img
                        src={alertIcon}
                        alt={"icon"}
                        className={classes["image-icon"]}
                    />
                </Col>
                <Col sm={24}>
                    <p className={classes["confirmation-subtext"]}>
                        Retail price must be entered, please go the lenses
                        settings and add retail price.
                    </p>
                    <div
                        className={`${classes["btn-container"]} ${classes["margin-container"]}`}
                    >
                        {" "}
                        <div className={classes["btn-wrapper"]}>
                            <div
                                className={
                                    classes["email-setting_button-section"]
                                }
                            >
                                <button
                                    className={
                                        classes[
                                            "email-setting_button-section_save-button"
                                        ]
                                    }
                                    onClick={() => {
                                        accept(dontShow);
                                    }}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                        <div className={classes["btn-wrapper"]}>
                            <div
                                className={
                                    classes["email-setting_button-section"]
                                }
                            >
                                <button
                                    className={`${classes["email-setting_button-section_save-button"]} ${classes["deactive"]}`}
                                    onClick={() => {
                                        cancel();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className={classes["checkbox-text"]}>
                        <CustomCheckbox
                            label={"Don't show again"}
                            defaultChecked={dontShow || false}
                            onValueChange={handleDontShowCheckbox}
                        />
                    </p>
                </Col>
            </Row>
        </Modal>
    );
};
export default InvoicePriceAlert;
