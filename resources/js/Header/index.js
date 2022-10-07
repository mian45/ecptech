import React, { useState } from "react";
import Profile from "../components/profile/Profile";
import classes from "./styles.module.scss";
import { useEffect } from 'react';
import {remember as rememberme} from "../services/authService";
import { useDispatch } from "react-redux";

const Header = () => {
    const dispatch=useDispatch()
    const [showProfile, setShowProfile] = useState(false);
    const closeModal = () => setShowProfile(false);
    useEffect(()=>{
        console.log("the use Effect is working")
        getAuthentication();
    },[])
    const getAuthentication=async ()=>{
        rememberme(dispatch)
    }
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
                    onClick={(e) => {
                        setShowProfile(!showProfile);
                    }}
                />
                {showProfile && <Profile closeModal={closeModal} />}
            </div>
        </div>
    );
};
export default Header;
