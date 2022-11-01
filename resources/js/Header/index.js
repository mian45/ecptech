import React, { useState } from "react";
import Profile from "../components/profile/Profile";
import classes from "./styles.module.scss";
import { useEffect } from "react";
import { remember as rememberme } from "../services/authService";
import { useDispatch } from "react-redux";
import logo from "../../images/logo.png";
import profileIcon from "../../images/profile.svg";
import notificationIcon from "../../images/notification.svg";
import Http from "../Http"
const Header = () => {
    const dispatch = useDispatch();
    const [showProfile, setShowProfile] = useState(false);
    const [user,setUser]=useState({})
    const closeModal = () => setShowProfile(false);
    useEffect(() => {
        getAuthentication();
    }, []);
    const getAuthentication = async () => {
        const token = localStorage.getItem("access_token");
        Http.get("/api/get-user-details")
            .then((response) => {
                let res = response;
                res.data.data = { ...res.data.data, token: token };
                setUser(res.data.data)
                rememberme(dispatch);
                return;
            })
            .catch((err) => {
                console.log(err);
            });
        
    };
    return (
        <div className={classes["container"]}>
            <img src={user?.logo?user?.logo:logo} alt="logo" className={classes["logo-icon"]} />
            <div className={classes["sub-container"]}>
                <img
                    src={notificationIcon}
                    alt="notification"
                    className={classes["bell-icon"]}
                />
                <img
                    src={profileIcon}
                    alt="Profile"
                    className={classes["profile-icon"]}
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
