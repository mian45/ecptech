import React, { Fragment, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    CREATE_INVOICE_ROUTE,
    HOME_ROUTE,
    INVOICES_ROUTE,
    PAYMENT_ROUTE,
    SETTINGS_ROUTE,
    SETTINGS_ROUTE_LENS,
    SETTINGS_ROUTE_DISCOUNT,
    SETTINGS_ROUTE_INSURANCE,
    SETTINGS_ROUTE_GLASSES,
} from "../appRoutes/routeConstants";
import homeIcon from "../../images/home.svg";
import invoicesIcon from "../../images/invoices.svg";
import paymentIcon from "../../images/payments.svg";
import settingsIcon from "../../images/settings.svg";
import AuthService from "../services";
import { Row, Col, Drawer } from "antd";
const SideBar = ({ userRole, isActiveState, dispatch, sidebar }) => {
    const [state, setState] = useState(isActiveState);
    const [currentRoute, setCurrentRoute] = useState("");
    const history = useHistory();
    useEffect(() => {
        history.listen((location) => {
            setCurrentRoute(location?.pathname);
        });
    }, []);
    useEffect(() => {
        const currentPath = history.location.pathname;
        redirectStaffRoute(currentPath);
        switch (currentPath) {
            case HOME_ROUTE: {
                setState(1);
                return;
            }
            case INVOICES_ROUTE:
            case CREATE_INVOICE_ROUTE: {
                setState(2);
                return;
            }
            case PAYMENT_ROUTE: {
                setState(4);
                return;
            }
            case SETTINGS_ROUTE: {
                setState(3);
                return;
            }
            case SETTINGS_ROUTE_LENS: {
                setState(3);
                return;
            }
            case SETTINGS_ROUTE_DISCOUNT: {
                setState(3);
                return;
            }
            case SETTINGS_ROUTE_INSURANCE: {
                setState(3);
                return;
            }
            case SETTINGS_ROUTE_GLASSES: {
                setState(3);
                return;
            }
        }
    }, [history.location.pathname, currentRoute, userRole]);

    const redirectStaffRoute = (currentPath) => {
        if (userRole === "staff") {
            switch (currentPath) {
                case HOME_ROUTE:
                case PAYMENT_ROUTE:
                case SETTINGS_ROUTE:
                case INVOICES_ROUTE:
                    history.push(INVOICES_ROUTE);
                    return;
            }
        }
    };

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
                history.push(SETTINGS_ROUTE);
                return;
            }
            case 4: {
                setState(value);
                history.push(PAYMENT_ROUTE);
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
    const onClose = () => {
        dispatch(AuthService.showSideBar(sidebar));
    };
    return (
        <Row className={classes["side-box"]}>
            <Col>
                
                    <div className={classes['sidebarmainbox']}>
                        {userRole === "staff" ? (
                            <div
                                className={classes["item-container"]}
                                onClick={() => {
                                    history.push(INVOICES_ROUTE);
                                }}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    return false;
                                }}
                            >
                                <img
                                    src={invoicesIcon}
                                    className={classes["icon"]}
                                />
                                <label className={classes["sidebar-label"]}>
                                    Invoices
                                </label>

                                <span
                                    className={classes["active-state"]}
                                ></span>
                            </div>
                        ) : (
                            <>
                                {SIDE_BAR_DATA.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            {checkStaffRoute(item?.index) ? (
                                                <div
                                                    className={
                                                        classes[
                                                            "item-container"
                                                        ]
                                                    }
                                                    onClick={() => {
                                                        handleSideBar(
                                                            item?.index
                                                        );
                                                    }}
                                                    key={index}
                                                    onContextMenu={(e) => {
                                                        e.preventDefault();
                                                        return false;
                                                    }}
                                                >
                                                    <img
                                                        src={item.icon}
                                                        className={
                                                            classes["icon"]
                                                        }
                                                    />
                                                    <label
                                                        className={
                                                            classes[
                                                                "sidebar-label"
                                                            ]
                                                        }
                                                    >
                                                        {item.name}
                                                    </label>
                                                    {state === item?.index && (
                                                        <span
                                                            className={
                                                                classes[
                                                                    "active-state"
                                                                ]
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
                     {sidebar ? (
                    <div  className={classes['sidebarmainboxmobile']}>
                        <Drawer
                            title="Basic Drawer"
                            placement={"left"}
                            closable={false}
                            onClose={onClose}
                            open={sidebar}
                            key={"left"}
                            bodyStyle={{ backgroundColor: "#6fa5cb" }}
                            width={140}
                        >
                            {userRole === "staff" ? (
                                <div
                                    className={classes["item-container"]}
                                    onClick={() => {
                                        history.push(INVOICES_ROUTE);
                                    }}
                                >
                                    <img
                                        src={invoicesIcon}
                                        className={classes["icon"]}
                                    />
                                    <label className={classes["sidebar-label"]}>
                                        Invoices
                                    </label>

                                    <span
                                        className={classes["active-state"]}
                                    ></span>
                                </div>
                            ) : (
                                <>
                                    {SIDE_BAR_DATA.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                {checkStaffRoute(
                                                    item?.index
                                                ) ? (
                                                    <div
                                                        className={
                                                            classes[
                                                                "item-container"
                                                            ]
                                                        }
                                                        onClick={() => {
                                                            handleSideBar(
                                                                item?.index
                                                            );
                                                        }}
                                                        key={index}
                                                    >
                                                        <img
                                                            src={item.icon}
                                                            className={
                                                                classes["icon"]
                                                            }
                                                        />
                                                        <label
                                                            className={
                                                                classes[
                                                                    "sidebar-label"
                                                                ]
                                                            }
                                                        >
                                                            {item.name}
                                                        </label>
                                                        {state ===
                                                            item?.index && (
                                                            <span
                                                                className={
                                                                    classes[
                                                                        "active-state"
                                                                    ]
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
                        </Drawer>
                    </div>
                ) : null}
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => ({
    isActiveState: state.Auth.isActiveState,
    userRole: state.Auth.userRole?.name,
    userId: state.Auth?.user?.id,
    sidebar: state.Auth.sidebar,
});

export default connect(mapStateToProps)(SideBar);

const SIDE_BAR_DATA = [
    {
        icon: homeIcon,
        name: "Dashboard",
        index: 1,
    },
    {
        icon: invoicesIcon,
        name: "Invoices",
        index: 2,
    },
    {
        icon: settingsIcon,
        name: "Settings",
        index: 3,
    },
    {
        icon: paymentIcon,
        name: "Billing",
        index: 4,
    },
];
