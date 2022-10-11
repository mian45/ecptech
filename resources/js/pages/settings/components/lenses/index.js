import React, { useState } from "react";
import LensesType from "./components/lensesType";
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
            </div>
        </div>
    );
};

export default LensesSettings;
