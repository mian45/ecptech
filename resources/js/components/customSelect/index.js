import React, { useState } from "react";
import classes from "./style.module.scss";
import downIcon from "../../../images/down-arrow.png";
import { useOuterClick } from "../../hooks/useOuterClick";

const CustomSelect = ({ options, style, ...rest }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const [show, setShow] = useState(false);

    const innerRef = useOuterClick((ev) => {
        setShow(false);
    });
    return (
        <div className={classes["container"]} ref={innerRef}>
            {show ? (
                <>
                    <div
                        className={classes["placeholder"]}
                        style={{ ...style }}
                    />
                    <div
                        className={classes["menu-container"]}
                        style={{ ...style }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={classes["menu-item-1"]}>
                            <div>John Doe Sunglasses</div>
                            <img
                                src={downIcon}
                                alt="down-arrow"
                                className={classes["arrow-up"]}
                            />
                        </div>
                        <div className={classes["menu-item"]}>
                            John Doe Lenses
                        </div>
                        <div className={classes["menu-item"]}>
                            John Doe Frame order
                        </div>
                    </div>
                </>
            ) : (
                <div
                    className={classes["sub-container"]}
                    style={{ ...style }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setShow(true);
                    }}
                >
                    <div
                        className={
                            selectedValue ? classes["dark"] : classes["light"]
                        }
                    >
                        {selectedValue || "Select Staff Name"}
                    </div>
                    <img
                        src={downIcon}
                        alt="down-arrow"
                        className={classes["arrow"]}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
