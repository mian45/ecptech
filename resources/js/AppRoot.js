import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {useLocation, Switch } from "react-router-dom";
import Routes from "./appRoutes/routes";
import Header from "./Header";
import SideBar from "./Side-bar";
import SignIn from "./pages/auth/signIn";
const AppRoot = ({ isAuthenticated }) => {
    const location=useLocation()
    const [templogout, setTempLogout] = useState(localStorage.getItem("temp"));
    const [active,setActive]=useState(false)
    useEffect(() => {
        setInterval(() => {
            setTempLogout(localStorage.getItem("temp"));
        }, 5000);
    }, []);
    useEffect(()=>{
        if(window.location.href.includes('login')){
            setActive(true)
        }else{
            setActive(false)
        }

    },[location])
    return (
        <>
            {JSON.parse(templogout) === true ? (
                <SignIn
                    tempSet={(e) => {
                        setTempLogout(e);
                    }}
                    templogout={templogout}
                />
            ) : null}
            {isAuthenticated && JSON.parse(templogout) !== true ? (
                <Header />
            ) : null}
            {isAuthenticated && JSON.parse(templogout) !== true ? (
                <SideBar />
            ) : null}
            <div
                className={
                    active?'':JSON.parse(templogout) !== true ? "d-block" : "d-none"
                }
            >
                <Switch>
                    <Routes
                        tempSet={(e) => {
                            setTempLogout(e);
                        }}
                        templogout={templogout}
                    />
                </Switch>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(AppRoot);
