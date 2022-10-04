import React, { Suspense } from "react";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import {remember as rememberme} from "../services/authService";
import PrivateRoute from "./privateRoute/privateRoute";
import { allRoutes } from "./routesMetaData";

const Routes = () => {
    useEffect(()=>{
        getAuthentication();
    
    },[])
    const getAuthentication=async ()=>{
        const remember= await localStorage.getItem("remember");
        if(remember!=null)
        {  
            if(remember==="true"){
          rememberme(remember)
      }}
    }
    return (
        <Suspense fallback={<></>}>
            <Switch>
                {allRoutes.map((currentRoute, index) => {
                    return currentRoute.isPrivate ? (
                        <PrivateRoute
                            key={index}
                            component={currentRoute.component}
                            exact={currentRoute.exact}
                            path={currentRoute.path}
                        />
                    ) : (
                        <Route
                            key={index}
                            path={currentRoute.path}
                            component={currentRoute.component}
                            exact={currentRoute.exact || false}
                        />
                    );
                })}
            </Switch>
        </Suspense>
    );
};

export default Routes;
