import React, {useState} from "react";
import './style.scss'
import {connect} from "react-redux";
import EmailSetting from '../email-setting/index'
import EmailRemainder from "../email-remainder";

const mapStateToProps = (state) => ({
    isActiveState: state.Auth.isActiveState,
    isActiveSettingState: state.Auth.isActiveSettingState
});

const SideBar = (props) => {
    const [active , setActive]= useState(props.isActiveState)
    console.log('hello',props.isActiveSettingState)


    return (
        <div className='dashboard'>
            <div className="side-bar">
                <div className="sidebar-section" onClick={() => {
                    setActive(1)
                }}>
                    <img className="home-image" src="home.svg"/>
                    <label className="sidebar-label">Dashboard</label>
                    {active === 1 && <span className="active-state"></span>}
                </div>
                <div className="sidebar-section" onClick={() => {
                    setActive(2)
                }}>
                    <img className="invoices-image" src="invoices.svg"/>
                    <label className="sidebar-label">Invoices</label>
                    {active === 2 && <span className="active-state"></span>}
                </div>
                <div className="sidebar-section" onClick={() => {
                    setActive(3)
                }}>
                    <img className="payments-image" src="payments.svg"/>
                    <label className="sidebar-label">Payments</label>
                    {active === 3 && <span className="active-state"></span>}
                </div>
                <div className="sidebar-section" onClick={() => {
                    setActive(4)
                }}>
                    <img className="settings-image" src="settings.svg"/>
                    <label className="sidebar-label">Settings</label>
                    {active === 4 && <span className="active-state"></span>}

                </div>
            </div>
            <div className='dashboard-right'>
                {
                    active === 4 && props.isActiveSettingState === 1 && <EmailSetting/>

                }
                {
                    active === 4 && props.isActiveSettingState === 2 && <EmailRemainder/>
                }
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(SideBar)
