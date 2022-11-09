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
import 'antd/dist/antd.css';
import {
    MenuOutlined
  } from '@ant-design/icons';
import { Col, Row } from "antd";
import Http from "../Http"
const Header = ({}) => {
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
    const Logout=()=>{
        dispatch(AuthService.logout(user.id))
    }
    const showSideBar=()=>{
        dispatch(AuthService.showSideBar())
    }
    return (
        <Row justify="space-between" align="middle" className={classes["header-box"]}>
             {window.innerWidth<763?<MenuOutlined onClick={showSideBar}/>:null}
            <Col xs={12}  >
            <img src={user?.logo?user?.logo:logo} alt="logo" className={classes["logo-icon"]} />
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
                 <Profile closeModal={closeModal} open={showProfile} />
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
