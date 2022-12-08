import React, {  useState } from "react";
import { connect } from "react-redux";
import ShippingSettings from "./shipping";
import {  Col, Row } from "antd";
import { message } from "antd";
import CustomLoader from "../components/customLoader";
import TracingFee from "./tracingFee";
const MiscFees = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    return (
        <>
            {contextHolder}
            {loading ? <CustomLoader buttonBool={false} /> : null}

            <Row justify="center">
                <Col xs={24}>
                    <Row
                        justify="center"
                        align="middle"
                        className="discount-container discount-tax"
                    >
                        <Col xs={24}>
                            <p className="main discount-container-page-title">{`Misc. Fees`}</p>
                        </Col>
                       
                        <Col xs={24}>
                            <ShippingSettings setLoading={(e)=>{setLoading(e)}} message={messageApi}/>
                        </Col>
                        <Col xs={24}>
                            <TracingFee setLoading={(e)=>{setLoading(e)}} message={messageApi}/>
                        </Col>
                       
                    </Row>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => ({
    userID: state.Auth.user?.id,
    token: state.Auth.token,
});
export default connect(mapStateToProps)(MiscFees);
