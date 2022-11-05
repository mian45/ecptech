import React, { useState } from "react";
import Profile from "../components/profile/Profile";
import classes from "./styles.module.scss";
import { useEffect } from "react";
import { remember as rememberme } from "../services/authService";
import { useDispatch } from "react-redux";
import logo from "../../images/logo.png";
import profileIcon from "../../images/profile.svg";
import notificationIcon from "../../images/notification.svg";
import AuthService from "../services";
import { connect } from "react-redux";
import { Col, Row } from "antd";

const Header = ({user}) => {
    const dispatch = useDispatch();
    const [showProfile, setShowProfile] = useState(false);
    const closeModal = () => setShowProfile(false);
    useEffect(() => {
        getAuthentication();
    }, []);
    const getAuthentication = async () => {
        rememberme(dispatch);
    };
    const Logout=()=>{
        dispatch(AuthService.logout(user.id))
    }
    return (
        <Row justify="space-between" align="middle" className={classes["header-box"]}>
            <Col xs={12}  >
            <img src={logo} alt="logo" className={classes["logo-icon"]} />
            </Col>
            <Col xs={12}  >
                <Row justify="end">
                <Col xs={9} className={classes['logo-box']}>
                    <img
                    src={profileIcon}
                    alt="Profile"
                    className={classes["profile-icon"]}
                    onClick={(e) => {
                        setShowProfile(!showProfile);
                    }}
                />
                </Col>
                <Col xs={3} className={classes['logout-box']}>
                <h6 className={classes["logout"]} onClick={()=>{Logout()}}>Logout</h6>
                {showProfile && <Profile closeModal={closeModal} />}
                </Col>
                </Row>
                </Col>
            </Row>
    );
};
const mapStateToProps = (state) => ({
    user: state.Auth.user,
});
export default connect(mapStateToProps)(Header);
