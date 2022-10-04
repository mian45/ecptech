import React from "react";
import { useEffect } from "react";
import { connect,useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "./appRoutes/routes";
import Header from "./Header";
import SideBar from "./Side-bar";
import AuthService from "./services";
const AppRoot = ({ isAuthenticated }) => {
    const dispatch= useDispatch()
    useEffect(()=>{
        getAuthentication();
    
    },[])
    const getAuthentication=async ()=>{
        const remember= localStorage.getItem("remember");
       
        if(remember!=null)
        {  
            if(remember==="true"){
          dispatch(AuthService.remember(remember))
      }}
    }
    return (
        <div>
            <Router>
                {isAuthenticated && <Header />}
                {isAuthenticated && <SideBar />}
                <Switch>
                    <Routes />
                </Switch>
            </Router>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(AppRoot);
