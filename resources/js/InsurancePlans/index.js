import React from "react";
import { Switch } from "antd";
import "./style.scss";
import bellIcon from "../../images/edit.png";
import { useHistory } from "react-router";
const InsurancePlans = () => {
    const label = { inputProps: { "aria-label": "Switch demo" } };
    const history = useHistory();
    return (
        <div className="other-setting">
            <p className="other-setting_heading">Insurance Plans</p>
            <div className="other-setting_section">
                <div className="other-setting_section-first">
                    {/* component to be used in map */}
                    <div className="other-setting_section-first_switches-switch">
                        <p>Select Vision Plan</p>
                        <div>
                            <img
                                style={{
                                    width: "16px",
                                    height: "18px",
                                    marginRight: "16.6px",
                                    cursor: "pointer",
                                }}
                                src={bellIcon}
                                onClick={() => {
                                    history.push({
                                        pathname: "/edit-insurance/1",
                                    });
                                }}
                            />
                            <Switch {...label} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default InsurancePlans;
