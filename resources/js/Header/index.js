import React from "react";
import classes from "./styles.module.scss";
const Header = () => {
    return (
        <div className={classes["container"]}>
            <img src="logo.png" alt="logo" className={classes["logo-icon"]} />
            <div className={classes["sub-container"]}>
                <img
                    src="notification.svg"
                    alt="notification"
                    className={classes["bell-icon"]}
                />
                <img
                    src="Profile.svg"
                    alt="Profile"
                    className={classes["bell-icon"]}
                />
            </div>
        </div>
    );
};
export default Header;
