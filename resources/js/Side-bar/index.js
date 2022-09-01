import React , {useState} from "react";
import './style.scss'
import {connect} from "react-redux";

const SideBar = (props) => {
    const [state , setState] = useState(props.isActiveState)
    const dispatch  = state

    return (
        <div className="side-bar">
            <div className="sidebar-section" onClick={()=> {setState(1)}}>
                <img className="home-image" src="home.svg" />
                <label className="sidebar-label">Dashboard</label>
                {state === 1 && <span className="active-state"></span>}
            </div>
            <div className="sidebar-section" onClick={()=> {setState(2)}}>
                <img className="invoices-image" src="invoices.svg" />
                <label className="sidebar-label">Invoices</label>
                {state === 2 && <span className="active-state"></span>}
            </div>
            <div className="sidebar-section" onClick={()=> {setState(3)}}>
                <img className="payments-image" src="payments.svg" />
                <label className="sidebar-label">Payments</label>
                {state === 3 && <span className="active-state"></span>}
            </div>
            <div className="sidebar-section" onClick={()=> {setState(4)}}>
                <img className="settings-image" src="settings.svg" />
                <label className="sidebar-label">Settings</label>
                {state === 4 && <span className="active-state"></span>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isActiveState: state.Auth.isActiveState,
});

export default connect(mapStateToProps) (SideBar)
