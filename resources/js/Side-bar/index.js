import React, { Fragment, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { useHistory } from "react-router-dom";
import {
    HOME_ROUTE,
    INVOICES_ROUTE,
    PAYMENT_ROUTE,
    SETTINGS_ROUTE,
} from "../appRoutes/routeConstants";
import AuthService from "../services";
const SideBar = ({ userRole, isActiveState, userId, dispatch }) => {
    const [state, setState] = useState(isActiveState);
    const history = useHistory();
  
    const handleSideBar = (value) => {
        switch (value) {
            case 1: {
                setState(value);
                history.push(HOME_ROUTE);
                return;
            }
            case 2: {
                setState(value);
                history.push(INVOICES_ROUTE);
                return;
            }
            case 3: {
                setState(value);
                history.push(PAYMENT_ROUTE);
                return;
            }
            case 4: {
                setState(value);
                history.push(SETTINGS_ROUTE);
                return;
            }
        }
    };
    const checkStaffRoute = (value) => {
        if (userRole === "staff" && (value === 3 || value === 4)) {
            return false;
        }
        return true;
    };

    return (
        <div className={classes["container"]}>
            {userRole === "staff" ? (
                <div
                    className={classes["item-container"]}
                    onClick={() => {
                        history.push(INVOICES_ROUTE);
                    }}
                >
                    <img src={"invoices.svg"} className={classes["icon"]} />
                    <label className={classes["sidebar-label"]}>Invoices</label>

                    <span className={classes["active-state"]}></span>
                </div>
            ) : (
                <>
                    {SIDE_BAR_DATA.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                {checkStaffRoute(item?.index) ? (
                                    <div
                                        className={classes["item-container"]}
                                        onClick={() => {
                                            handleSideBar(item?.index);
                                        }}
                                        key={index}
                                    >
                                        <img
                                            src={item.icon}
                                            className={classes["icon"]}
                                        />
                                        <label
                                            className={classes["sidebar-label"]}
                                        >
                                            {item.name}
                                        </label>
                                        {state === item?.index && (
                                            <span
                                                className={
                                                    classes["active-state"]
                                                }
                                            ></span>
                                        )}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </Fragment>
                        );
                    })}
                </>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    isActiveState: state.Auth.isActiveState,
    userRole: state.Auth.userRole?.name,
    userId: state.Auth?.user?.id,
});

export default connect(mapStateToProps)(SideBar);

const SIDE_BAR_DATA = [
    {
        icon: "home.svg",
        name: "Dashboard",
        index: 1,
    },
    {
        icon: "invoices.svg",
        name: "Invoices",
        index: 2,
    },
    {
        icon: "payments.svg",
        name: "Payments",
        index: 3,
    },
    {
        icon: "settings.svg",
        name: "Settings",
        index: 4,
    },
];
