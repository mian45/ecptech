import React from "react";

import classes from "./style.module.scss";
const CustomToggle = ({ handleTogglerChange, toggle = false, label }) => {
    return (
        <label className={classes["category-toggler"]} key={"123"}>
            <input
                className={classes["category-toggler__checkbox"]}
                onChange={handleTogglerChange}
                checked={toggle}
                type="checkbox"
            />
            <div
                className={`${classes["category-toggler__slider"]} ${
                    toggle && classes["category-toggler__slider--v1"]
                }`}
            >
                <h6>{label[0] || "Light"}</h6>
                <h6>{label[1] || "Dark"}</h6>
            </div>
        </label>
    );
};
export default CustomToggle;
