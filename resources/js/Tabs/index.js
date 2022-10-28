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

const TabsSection = (props) => {
    return (
        <Tabs
            defaultActiveKey={props?.activeSettingsIndex || "1"}
            onChange={(e) => props.dispatch(action.updateSettingsTab(e))}
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
            <Tabs.TabPane tab="Insurance Plans" key="4">
                <InsurancePlans />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Eye Prescription" key="5">
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
