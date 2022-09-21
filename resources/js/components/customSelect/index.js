import React, { useState } from "react";
import classes from "./style.module.scss";
import downIcon from "../../../images/down-arrow.png";

const CustomSelect = ({ options, ...rest }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const [show, setShow] = useState(false);
    return (
        <div className={classes["container"]}>
            {show ? (
                <>
                    <div className={classes["placeholder"]} />
                    <div className={classes["menu-container"]}>
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
                    onClick={() => setShow(true)}
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

// const CustomSelect = ({ options, ...rest }) => {
//     return (
//         <select className={classes["custom-select-component"]} {...rest}>
//             {Object.keys(options).map((option, index) => {
//                 return (
//                     <option key={index} value={option}>
//                         {options[option]}
//                     </option>
//                 );
//             })}
//         </select>
//     );
// };
