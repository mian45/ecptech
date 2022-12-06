import React, { useState } from "react";
import { Switch, Tooltip } from "antd";
import "./style.scss";
import editIcon from "../../images/edit.png";
import { useHistory } from "react-router";
import axios from "axios";
import { connect } from "react-redux";
import CustomLoader from "../components/customLoader";
import { Select, Col, Row, message } from "antd";

const InsurancePlans = ({ userId }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [getData, setGetData] = React.useState([]);
    const [isChecked, setIsChecked] = React.useState(false);

    const label = { inputProps: { "aria-label": "Switch demo" } };
    const history = useHistory();

    // to fetch data from api

    React.useEffect(() => {
        if (userId == null) return;
        setLoading(true);
        axios
            .get(process.env.MIX_REACT_APP_URL + "/api/get-client-vision-plans")
            .then((res) => {
                setGetData(res.data?.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log({ error });
                setLoading(true);
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: 'custom-postion-error',
                });
            });
    }, [userId]);

    //for toggle switch

    const handleSwitch = async (value, toggleSwitch) => {
        const toggleState = {
            userId: userId,
            visionPlanId: value?.id,
            status: toggleSwitch,
        };
        const response = await axios.post(
            process.env.MIX_REACT_APP_URL +
            "/api/update-user-vision-plan-permission",
            toggleState
        );
        messageApi.open({
            type: "success",
            content: response.data.message,
            duration: 5,
            className: 'custom-postion',
        });
    };

    return loading == true ? (
        <CustomLoader buttonBool={false} />
    ) : (
        <Row justify="center" align="middle">
            <div>{contextHolder}</div>
            <Col xs={24}>
                <div>
                    <Row justify="start">
                        <Col xs={24}>
                            <p className="other-setting_heading">
                            Vision Plans
                            </p>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={24} md={14}>
                            {/* component to be used in map */}
                            {getData?.length > 0 &&
                                getData?.map((item) => {
                                    return (
                                        <div className="other-setting_section">
                                            <div className="other-setting_section-first">
                                                <div
                                                    className="other-setting_section-first_switches-switch"
                                                    key={item?.id}
                                                >
                                                    <p className="insurance-plan-setting-title">
                                                        {item?.title}
                                                    </p>
                                                    <div>
                                                        <Row>
                                                            <Col xs={12}>
                                                            <Tooltip title={"Click to edit Insurance Plans that calculator displays"} color={'#6fa5cb'} key={0}>
                                                                <img
                                                                    className="insurance-plan-setting-edit-icon"
                                                                    src={
                                                                        editIcon
                                                                    }
                                                                    onClick={() => {
                                                                        history.push(
                                                                            {
                                                                                pathname: `/edit-insurance/${item?.id}`,
                                                                                state: item?.title,
                                                                            }
                                                                        );
                                                                    }}
                                                                /></Tooltip>
                                                            </Col>
                                                            <Col xs={12}>
                                                                <Switch
                                                                    {...label}
                                                                    defaultChecked={
                                                                        item?.status ===
                                                                            0
                                                                            ? false
                                                                            : true ||
                                                                            isChecked
                                                                    }
                                                                    onChange={(
                                                                        toggleSwitch
                                                                    ) =>
                                                                        handleSwitch(
                                                                            item,
                                                                            toggleSwitch
                                                                        )
                                                                    }
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};
const mapStateToProps = (state) => ({
    userId: state.Auth?.user?.id,
});
export default connect(mapStateToProps)(InsurancePlans);
