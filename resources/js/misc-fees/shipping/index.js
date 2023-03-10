import React, { useState, useEffect } from "react";
import Axios from "../../Http";
import { connect } from "react-redux";
import edit from "../../../images/edit.png";
import cross from "../../../images/cross.png";
import CustomLoader from "../../components/customLoader";
import DeleteModal from "../../components/deleteModal/index";
import { Row, Col, message, Tooltip } from "antd";
const ShippingSettings = ({ userId, setLoading }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [shippingName, setShippingName] = useState("");
    const [shippingAmount, setShippingAmount] = useState("");
    const [shipping, setShipping] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [shippingButtonLoader, setShippingButtonLoader] = useState(false);

    const [editState, setEditState] = useState(false);
    const [showDeleteShipping, setShowDeleteShipping] = useState(false);
    const [deleteShippingId, setDeleteShippingId] = useState(0);
    let [shippingLoading, setShippingLoading] = useState(false);
    useEffect(() => {
        if (userId == null) return;
        setEditState(false);
        getShipping();
    }, [userId]);
    const getShipping = async () => {
        setLoading(true);
        setShippingLoading(true);
        try {
            const res = await Axios.get(
                process.env.MIX_REACT_APP_URL + "/api/get-shipping",
                { params: { userId: userId } }
            );
            const shippingData = res?.data?.data;
            setShipping({ ...shippingData });
            setLoading(false);
            setShippingLoading(false);
        } catch (err) {
            message.destroy();
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
            });
            setShippingLoading(false);
            setLoading(false);
        }
    };
    const handleUpdateShipping = async (data) => {
        setShippingName(data?.name);
        setShippingAmount(data?.value);
        setIsSubmitted(false);
    };
    const deleteShipping = async (id) => {
        try {
            const res = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/delete-shipping",
                { id: id }
            );
            setShipping({});
            setIsSubmitted(false);
            setShowDeleteShipping(false);
            message.destroy();
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: "custom-postion",
            });
        } catch (err) {
            console.log("error while delete shipping");
            message.destroy();
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
            });
        }
    };
    const handleDeleteShipping = async (id) => {
        setDeleteShippingId(id);
        setShowDeleteShipping(true);
        setShippingName("");
        setShippingAmount("");
        setIsSubmitted(true);
    };
    const handleShippingSubmit = async (e) => {
        setShippingButtonLoader(true);
        e?.preventDefault();

        try {
            const payload = {
                userId: userId,
                name: shippingName,
                value: shippingAmount,
            };
            const res = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/add-shipping",
                payload
            );
            setShipping(res?.data?.data);
            setShippingName("");
            setEditState(false);
            setShippingAmount("");
            setIsSubmitted(true);
            setShippingButtonLoader(false);
            message.destroy();
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: "custom-postion",
            });
        } catch (err) {
            console.log("error while adding shipping");
            setShippingButtonLoader(false);
            message.destroy();
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
            });
        }
    };

    return (
        <>
            {showDeleteShipping ? (
                <DeleteModal
                    accept={() => {
                        deleteShipping(deleteShippingId);
                    }}
                    cancel={() => {
                        setShowDeleteShipping(false);
                    }}
                    open={showDeleteShipping}
                />
            ) : null}
            <Row justify="center" align="middle">
                <Col
                    xs={24}
                    md={24}
                    lg={16}
                    className="discount-container_first discount-tax-con"
                >
                    <Row justify="center" align="middle">
                        <Col xs={24} md={24}>
                            <div>{contextHolder}</div>
                            <p className="heading">Shipping</p>
                        </Col>
                        <Col xs={24}>
                            <form>
                                <Row justify="space-between">
                                    <Col
                                        xs={24}
                                        md={12}
                                        lg={10}
                                        className="discount-container_first-form_section"
                                    >
                                        <Row justify="center" align="middle">
                                            <Col xs={24}>
                                                <p className="input-title">
                                                    Enter Label
                                                </p>
                                            </Col>
                                            <Col xs={24}>
                                                <input
                                                    placeholder="Enter Text"
                                                    value={shippingName}
                                                    onChange={(e) => {
                                                        setShippingName(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col
                                        xs={24}
                                        md={12}
                                        lg={10}
                                        className="discount-container_first-form_section"
                                    >
                                        <Row>
                                            <Col xs={24}>
                                                <p className="input-title">
                                                    Add Shipping Amount
                                                </p>
                                            </Col>
                                            <Col xs={24}>
                                                <input
                                                    placeholder="Enter Amount"
                                                    type={"number"}
                                                    min={0}
                                                    value={shippingAmount}
                                                    onChange={(e) => {
                                                        setShippingAmount(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col
                                        xs={24}
                                        lg={4}
                                        style={{ justifyContent: "center" }}
                                    >
                                        <Row justify="center" align="middle">
                                            <Col xs={24}>
                                                <p class="input-title hidden-text">
                                                    Value
                                                </p>
                                            </Col>
                                            <Col
                                                xs={24}
                                                className="btn_section"
                                            >
                                                <button
                                                    onClick={
                                                        handleShippingSubmit
                                                    }
                                                    className={`save-button ${
                                                        !shippingName ||
                                                        !shippingAmount
                                                            ? "disable"
                                                            : ""
                                                    } `}
                                                >
                                                    {editState ? (
                                                        "Update"
                                                    ) : shippingButtonLoader ==
                                                      true ? (
                                                        <span>
                                                            <p>Add</p>
                                                            <CustomLoader
                                                                buttonBool={
                                                                    true
                                                                }
                                                            />
                                                        </span>
                                                    ) : (
                                                        "Add"
                                                    )}
                                                </button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                        <Col xs={24}>
                            <Row>
                                <Col xs={24} className="discount-output">
                                    <Row justify="center" align="middle">
                                        <table>
                                            {Object.keys(shipping).length >
                                                0 && (
                                                <tr className="discount-output_head">
                                                    <th>Shipping Label</th>
                                                    <th>Amount</th>
                                                    <th></th>
                                                </tr>
                                            )}
                                            {Object.keys(shipping).length >
                                                0 && (
                                                <tr className="discount-output_body">
                                                    <td>{shipping.name}</td>
                                                    <td>${shipping.value}</td>
                                                    <td
                                                        className="col-4 custom-tax-col-3"
                                                        style={{
                                                            paddingLeft: "0px",
                                                        }}
                                                    >
                                                        <Tooltip
                                                            title={"Edit"}
                                                            color={"#6fa5cb"}
                                                            key={0}
                                                        >
                                                            <img
                                                                style={{
                                                                    width: "18px",
                                                                    height: "18px",
                                                                    marginRight:
                                                                        "20px",
                                                                    cursor: "pointer",
                                                                }}
                                                                src={edit}
                                                                onClick={() => {
                                                                    setEditState(
                                                                        true
                                                                    );
                                                                    setShippingLoading(
                                                                        true
                                                                    );
                                                                    handleUpdateShipping(
                                                                        shipping
                                                                    );
                                                                }}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip
                                                            title={"Delete"}
                                                            color={"#6fa5cb"}
                                                            key={0}
                                                        >
                                                            <img
                                                                style={{
                                                                    width: "16px",
                                                                    height: "16px",
                                                                    cursor: "pointer",
                                                                }}
                                                                src={cross}
                                                                onClick={() => {
                                                                    handleDeleteShipping(
                                                                        shipping.id
                                                                    );
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            )}
                                        </table>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};
const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
    token: state.Auth.token,
});
export default connect(mapStateToProps)(ShippingSettings);
