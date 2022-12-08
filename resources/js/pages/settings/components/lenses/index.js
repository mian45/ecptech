import React, { useState } from "react";
import AddonSettings from "./components/addons";
import LensesType from "./components/lensesType";
import MaterialSettings from "./components/material";
import classes from "./styles.module.scss";
import { Row, Col, Select } from "antd";
const { Option } = Select;
const LensesSettings = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [plan, setPlan] = useState("vsp");
    const getActiveClass = (tab) => {
        if (tab === activeTab) {
            return classes["buttons-active"];
        } else {
            return classes["buttons-inActive"];
        }
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["page-label"]}>Lenses</div>
            <div className={classes["page-subtitle"]}>
                To show lenses option in calculator, select options and change
                their labels.
            </div>
            <Col
                className={`email-remainder-davis_input-sections_input-section ${classes["margindefault"]}`}
                xs={24}
            >
                <Row align="middle">
                    <Col xs={24} md={4}>
                        Select Vision Plans
                    </Col>
                    <Col xs={24} md={12}>
                        <Row justify="center" align="middle">
                            <Col xs={24}>
                                <Select
                                    className="no-outline select-width"
                                    defaultValue="vsp"
                                    value={plan}
                                    onChange={(e) => {
                                        if (activeTab === 4 && e == "vsp") {
                                            setActiveTab(1);
                                        }
                                        setPlan(e);
                                    }}
                                >
                                    <Option
                                        className="ant-select-item-option-content"
                                        value={"vsp"}
                                    >
                                        VSP Plan
                                    </Option>
                                    <Option
                                        className="ant-select-item-option-content"
                                        value={"davis"}
                                    >
                                        Davis Plan
                                    </Option>
                                    <Option
                                        className="ant-select-item-option-content"
                                        value={"eyemed"}
                                    >
                                        EyeMed Plan
                                    </Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Row
                className={classes["lenses-content"]}
                justify="center"
                align="middle"
            >
                <Col
                    xs={24}
                    md={20}
                    lg={16}
                    className={classes["buttons-controller"]}
                >
                    <Row
                        className={classes["buttons-container"]}
                        justify="center"
                        align="middle"
                    >
                        <Col
                            className={`${
                                plan !== "vsp" ? "" : classes["first-buttons"]
                            } ${getActiveClass(1)}`}
                            onClick={() => setActiveTab(1)}
                            xs={plan !== "vsp" ? 5 : 6}
                        >
                            Lens Type
                        </Col>
                        <Col
                            className={getActiveClass(2)}
                            onClick={() => setActiveTab(2)}
                            xs={plan !== "vsp" ? 5 : 6}
                        >
                            Lens Material
                        </Col>
                        <Col
                            className={getActiveClass(3)}
                            onClick={() => setActiveTab(3)}
                            xs={plan !== "vsp" ? 5 : 6}
                        >
                            Add On's
                        </Col>
                        {plan !== "vsp" ? (
                            <Col
                                className={getActiveClass(4)}
                                onClick={() => setActiveTab(4)}
                                xs={5}
                            >
                                Lense Treatment
                            </Col>
                        ) : null}
                    </Row>
                    <div className={classes["buttons-divider"]} />
                </Col>
                <Col xs={24} md={22} lg={18}>
                    {activeTab === 1 && <LensesType plan={plan} />}
                    {activeTab === 2 && <MaterialSettings />}
                    {activeTab === 3 || activeTab === 4 ? (
                        <AddonSettings
                            plan={plan}
                            type={activeTab === 3 ? "addon" : "lense_treatment"}
                        />
                    ) : null}
                </Col>
            </Row>
        </div>
    );
};

export default LensesSettings;
