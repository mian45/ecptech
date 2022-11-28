import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import CustomLoader from "../components/customLoader";
import PrivateRoute from "./privateRoute/privateRoute";
import { allRoutes } from "./routesMetaData";

const Routes = ({ tempSet, templogout }) => {
    return (
        <Suspense
            fallback={
                <>
                    <CustomLoader buttonBool={false} />
                </>
            }
        >
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
                            component={() => {
                                return currentRoute.component(
                                    tempSet,
                                    templogout
                                );
                            }}
                            exact={currentRoute.exact || false}
                        />
                    );
                })}
            </Switch>
        </Suspense>
    );
};

export default Routes;
