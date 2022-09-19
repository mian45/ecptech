import React, { useEffect, useState } from "react";
import "./style.scss";
import { connect } from "react-redux";
import SettingDashboard from "../setting-dashboard";
import Dashboard from "../pages/Dashboard";
import * as actions from "../store/actions";

const SideBar = ({ userRole, isActiveState, userId, dispatch }) => {
    const [state, setState] = useState(isActiveState);

    useEffect(() => {
        if (!userId) {
            dispatch(actions.authLogout());
        }
    }, []);

    return (
        <div className="dashboard-container">
            <div className="side-bar">
                <div
                    className="sidebar-section"
                    onClick={() => {
                        setState(1);
                    }}
                >
                    <img className="home-image" src="home.svg" />
                    <label className="sidebar-label">Dashboard</label>
                    {state === 1 && <span className="active-state"></span>}
                </div>
                <div
                    className="sidebar-section"
                    onClick={() => {
                        setState(2);
                    }}
                >
                    <img className="invoices-image" src="invoices.svg" />
                    <label className="sidebar-label">Invoices</label>
                    {state === 2 && <span className="active-state"></span>}
                </div>
                {userRole !== "staff" && (
                    <>
                        <div
                            className="sidebar-section"
                            onClick={() => {
                                setState(3);
                            }}
                        >
                            <img
                                className="payments-image"
                                src="payments.svg"
                            />
                            <label className="sidebar-label">Payments</label>
                            {state === 3 && (
                                <span className="active-state"></span>
                            )}
                        </div>
                        <div
                            className="sidebar-section"
                            onClick={() => {
                                setState(4);
                            }}
                        >
                            <img
                                className="settings-image"
                                src="settings.svg"
                            />
                            <label className="sidebar-label">Settings</label>
                            {state === 4 && (
                                <span className="active-state"></span>
                            )}
                        </div>
                    </>
                )}
            </div>
            {state === 4 && <SettingDashboard />}
            {state === 1 && <Dashboard />}
        </div>
    );
};

const mapStateToProps = (state) => ({
    isActiveState: state.Auth.isActiveState,
    userRole: state.Auth.userRole?.name,
    userId: state.Auth?.user?.id,
});
export default connect(mapStateToProps)(SideBar);
