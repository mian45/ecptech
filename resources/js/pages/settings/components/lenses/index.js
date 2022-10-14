import React, { useState } from "react";
import AddonSettings from "./components/addons";
import LensesType from "./components/lensesType";
import MaterialSettings from "./components/material";
import classes from "./styles.module.scss";

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
            <div className={classes["lenses-content"]}>
                <div className={classes["buttons-controller"]}>
                    <div className={classes["buttons-container"]}>
                        <div
                            className={`${
                                classes["first-buttons"]
                            } ${getActiveClass(1)}`}
                            onClick={() => setActiveTab(1)}
                        >
                            Lens Type
                        </div>
                        <div
                            className={getActiveClass(2)}
                            onClick={() => setActiveTab(2)}
                        >
                            Lens Material
                        </div>
                        <div
                            className={getActiveClass(3)}
                            onClick={() => setActiveTab(3)}
                        >
                            Add On
                        </div>
                    </div>
                    <div className={classes["buttons-divider"]} />
                </div>
                {activeTab === 1 && <LensesType />}
                {activeTab === 2 && <MaterialSettings />}
                {activeTab === 3 && <AddonSettings />}
            </div>
        </div>
    );
};

export default LensesSettings;
