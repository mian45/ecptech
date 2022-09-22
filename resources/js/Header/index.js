import React from "react";
import "./style.scss";
const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src="logo.png" alt="logo" />
            </div>

            <div className="right-side">
                <div className="bell-icon">
                    <img src="notification.svg" alt="notification" />
                </div>
                <div className="login">
                    <img src="Profile.svg" alt="Profile" />
                </div>
            </div>
        </div>
    );
};
export default Header;
