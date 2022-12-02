import { Tabs } from "antd";
import React, { useEffect } from "react";
import InsurancePlans from "../InsurancePlans";
import EmailSetting from "../email-setting/index";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AuthServices from "../services";
import DiscountTaxes from "../discount-taxes/index";
import LensesSettings from "../pages/settings/components/lenses";
import * as action from "../store/actions";
import EyePrescription from "../pages/settings/components/eyePrescription";
import { useRouteMatch, useHistory } from "react-router";
const TabsSection = (props) => {
    const { url } = useRouteMatch();
    const history = useHistory();
    const DefaultKeySet = () => {
        var value;
        switch (url) {
            case "/settings/emails": {
                value = "1";
                break;
            }
            case "/settings/lens": {
                value = "2";
                break;
            }
            case "/settings/discounts": {
                value = "3";
                break;
            }
            case "/settings/insurance-plans": {
                value = "4";
                break;
            }
            case "/settings/glasses-prescriptions": {
                value = "5";
                break;
            }
            default: {
                value = "1";
                break;
            }
        }
        return value;
    };
    const changeUrl = (e) => {
        switch (e) {
            case "1": {
                history.push("/settings/emails");
                break;
            }
            case "2": {
                history.push("/settings/lens");
                break;
            }
            case "3": {
                history.push("/settings/discounts");
                break;
            }
            case "4": {
                history.push("/settings/insurance-plans");
                break;
            }
            case "5": {
                history.push("/settings/glasses-prescriptions");
                break;
            }
            default: {
                history.push("/settings/emails");
                break;
            }
        }
        props.dispatch(action.updateSettingsTab(e));
    };
    return (
        <Tabs
            defaultActiveKey={() => DefaultKeySet()}
            onChange={(e) => changeUrl(e)}
        >
            <Tabs.TabPane tab="Emails" key="1">
                {props.isActiveSettingState == 1 ? (
                    <EmailSetting />
                ) : (
                    <EmailRemainder />
                )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lenses" key="2">
                <LensesSettings />
            </Tabs.TabPane>
            <Tabs.TabPane tab={`Discounts & Taxes`} key="3">
                <DiscountTaxes />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Vision Plans" key="4">
                <InsurancePlans />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Glasses Prescription" key="5">
                <EyePrescription />
            </Tabs.TabPane>
        </Tabs>
    );
};

TabsSection.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isActiveSettingState: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    isActiveSettingState: state.Auth.isActiveSettingState,
    activeSettingsIndex: state.Auth.activeSettingsIndex,
});

export default connect(mapStateToProps)(TabsSection);
