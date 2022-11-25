import React, { useState, useEffect } from "react";
import "../style.scss";
import Axios from "../../Http";
import { connect } from "react-redux";
import edit from "../../../images/edit.png";
import cross from "../../../images/cross.png";
import CustomLoader from "../../components/customLoader";

import DeleteModal from "../../components/deleteModal/index"
import { Row, Col, message } from "antd"
const ShippingSettings = ({ userId }) => {
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
        const getShipping = async () => {
            setShippingLoading(true);
            try {
                const res = await Axios.get(
                    process.env.MIX_REACT_APP_URL + "/api/get-shipping",
                    { params: { userId: userId } }
                );
                const shippingData = res?.data?.data;
                setShipping({ ...shippingData });
                setShippingLoading(false);
            } catch (err) {
                if (err.response.data.statusCode === 404) {
                    messageApi.open({
                        type: 'success',
                        content: "No shipping found",
                        duration: 5,
                        style: {
                            marginTop: '13.5vh',
                        },
                    });
                } else {
                    messageApi.open({
                        type: 'error',
                        content: "error while get shipping",
                        duration: 5,
                        style: {
                            marginTop: '13.5vh',
                        },
                    });
                }
                setShippingLoading(false)
            }
        };
        setEditState(false);
        getShipping();
    }, [userId]);

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
            setShowDeleteShipping(false)
            messageApi.open({
                type: 'success',
                content: res.data.message,
                duration: 5,
                style: {
                    marginTop: '13.5vh',
                },
            });
        } catch (err) {
            console.log("error while delete shipping");
            messageApi.open({
                type: 'error',
                content: err,
                duration: 5,
                style: {
                    marginTop: '13.5vh',
                },
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
            setShippingButtonLoader(false)
            messageApi.open({
                type: 'success',
                content: res.data.message,
                duration: 5,
                style: {
                    marginTop: '13.5vh',
                },
            });
        } catch (err) {
            console.log("error while adding shipping");
            setShippingButtonLoader(false)
            messageApi.open({
                type: 'success',
                content: err,
                duration: 5,
                style: {
                    marginTop: '13.5vh',
                },
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
                                                    disabled={isSubmitted}
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
                                                    disabled={isSubmitted}
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
                                                    <td className="shipping-custom-col-3">
                                                        <img
                                                            style={{
                                                                width: "18px",
                                                                height: "18px",
                                                                marginRight:
                                                                    "30px",
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
