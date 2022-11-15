import React, { useState } from "react";
import AddonSettings from "./components/addons";
import LensesType from "./components/lensesType";
import MaterialSettings from "./components/material";
import classes from "./styles.module.scss";
import {Row,Col} from "antd"
const LensesSettings = () => {
    const [activeTab, setActiveTab] = useState(1);

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
            <Row className={classes["lenses-content"]} justify="center" align="middle">
                <Col xs={16} className={classes["buttons-controller"]}>
                    <Row className={classes["buttons-container"]} justify="center" align="middle">
                        <Col
                            className={`${
                                classes["first-buttons"]
                            } ${getActiveClass(1)}`}
                            onClick={() => setActiveTab(1)}
                            xs={6}
                        >
                            Lens Type
                        </Col>
                        <Col
                            className={getActiveClass(2)}
                            onClick={() => setActiveTab(2)}
                            xs={6}
                        >
                            Lens Material
                        </Col>
                        <Col
                            className={getActiveClass(3)}
                            onClick={() => setActiveTab(3)}
                            xs={6}
                        >
                            Add On
                        </Col>
                    </Row>
                    <div className={classes["buttons-divider"]} />
                </Col>
                <Col xs={18}>
                {activeTab === 1 && <LensesType />}
                {activeTab === 2 && <MaterialSettings />}
                {activeTab === 3 && <AddonSettings />}</Col>
            </Row>
        </div>
    );
};

export default LensesSettings;
