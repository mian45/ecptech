import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import OtherSetting from '../other-setting';
import EmailSetting from '../email-setting/index'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AuthServices from '../services'
import DiscountTaxes from '../discount-taxes/index'
import EyePrescription from '../eye-prescription';

const TabsSection = (props) => {

  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Emails" key="1">
        {props.isActiveSettingState == 1 ? <EmailSetting /> : <EmailRemainder />}
      </Tabs.TabPane>
      <Tabs.TabPane tab="Lenses" key="2">
        Content of Tab Pane 2
      </Tabs.TabPane>
      <Tabs.TabPane tab={`Discounts & Taxes`} key="3">
        <DiscountTaxes />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Other Settings" key="4">
        <OtherSetting />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Eye Prescription" key="5">
       <EyePrescription/>
      </Tabs.TabPane>
    </Tabs>

  )
};

TabsSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isActiveSettingState: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({

  isActiveSettingState: state.Auth.isActiveSettingState
});

export default connect(mapStateToProps)(TabsSection);