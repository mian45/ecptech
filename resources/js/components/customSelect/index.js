import React, { useState } from "react";
import classes from "./style.module.scss";
import downIcon from "../../../images/down-arrow.png";
import { useOuterClick } from "../../hooks/useOuterClick";

const CustomSelect = ({ options, style, placeholder, ...rest }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const [show, setShow] = useState(false);

    const innerRef = useOuterClick((ev) => {
        setShow(false);
    });
    return (
        <div className={classes["container"]} ref={innerRef}>
            <div
                className={classes["placeholder"]}
                style={{ display: show ? "flex" : "none", ...style }}
            />
            <div
                className={classes["menu-container"]}
                style={{ display: show ? "flex" : "none", ...style }}
            >
                <div className={classes["menu-item-1"]}>
                    <div>John Doe Sunglasses</div>
                    <img
                        onClick={(e) => {
                            setShow(false);
                        }}
                        src={downIcon}
                        alt="down-arrow"
                        className={classes["arrow-up"]}
                    />
                </div>
                <div className={classes["menu-item"]}>John Doe Lenses</div>
                <div className={classes["menu-item"]}>John Doe Frame order</div>
            </div>
            <div
                className={classes["sub-container"]}
                style={{ display: show ? "none" : "flex", ...style }}
                onClick={(e) => {
                    setShow(true);
                }}
            >
                <div
                    className={
                        selectedValue ? classes["dark"] : classes["light"]
                    }
                >
                    {selectedValue || placeholder || "Select Staff Name"}
                </div>
                <img
                    src={downIcon}
                    alt="down-arrow"
                    className={classes["arrow"]}
                />
            </div>
        </div>
    );
};

export default CustomSelect;
