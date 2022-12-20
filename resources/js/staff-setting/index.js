import { Col, Row } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import AddStaffMembers from '../dashboard-page/components/AddStaffMembers/index'
import StaffLogin from '../components/staffLogin/index'
import classes from "./styles.module.scss";

const StaffSetting = ({userRole}) => {
    return(
        <>
        <Col>
        <p className={classes["main"]}>{`Staff Setting`}</p>
        </Col>
        <Row>
        <Col xs={24} md={24} lg={16} className={classes["staff-login-container"]}>
        {userRole !== "staff" && <StaffLogin />}
        </Col>
        <Col xs={24} md={24} lg={8} className={classes["staff-member-container"]}>
        {userRole !== "staff" && <AddStaffMembers />} 
        </Col>
        </Row>
        </>
    )
}
const mapStateToProps = (state) => ({
    userRole: state.Auth.userRole?.name,
});
export default connect(mapStateToProps)(StaffSetting);