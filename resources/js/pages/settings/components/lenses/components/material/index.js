import React from "react";
import { CollectionSlot } from "../lensesType";
import classes from "./styles.module.scss";

const MaterialSettings = () => {
    const handleCheckbox = () => {};
    const handleDisplayNameChange = () => {};
    const handleAmountNameChange = () => {};
    return (
        <>
            <div className={classes["container"]}>
                <div className={classes["sub-container"]}>
                    <div className={classes["material-label"]}>
                        Lens Material
                    </div>
                    <CollectionSlot
                        handleCheckbox={handleCheckbox}
                        handleDisplayNameChange={handleDisplayNameChange}
                        handleAmountNameChange={handleAmountNameChange}
                    />
                </div>
            </div>
            <div className={classes["save-button-wrapper"]}>
                <button
                    className={classes["save-button"]}
                    // onClick={submitLensesData}
                >
                    Save
                </button>
            </div>
        </>
    );
};
export default MaterialSettings;
