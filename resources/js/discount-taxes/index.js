import React, { useEffect, useState } from "react";
import "./style.scss";
import { connect } from "react-redux";

import edit from "../../images/edit.png";
import cross from "../../images/cross.png";
import ShippingSettings from "./shipping";
import { Select, Col, Row } from "antd";
import axios from "axios";

const { Option } = Select;
import { Switch, message } from "antd";
import CustomLoader from "../components/customLoader";
import DeleteModal from "../components/deleteModal/index";
const label = { inputProps: { "aria-label": "Switch demo" } };
const DiscountTaxes = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const token = localStorage.getItem("access_token");
    const [discountName, setDiscountName] = useState("");
    const [discountTax, setDiscountTax] = useState("");
    const [discountId, setDiscountId] = useState(null);
    let [discounts, setDiscounts] = useState([]);
    const [discountType, setDiscountType] = useState("percentage");
    const [taxName, setTaxName] = useState("Sales Tax");
    const [stateSetting, setStateSetting] = useState("");
    const [taxValue, setTaxValue] = useState("");
    let [tax, setTaxes] = useState([]);
    const [taxState, setTaxState] = useState([]);
    const [idState, setIdState] = useState(null);
    let [shipping, setShipping] = useState();

    const [showDeleteTaxes, setShowDeleteTaxes] = useState(false);
    const [deleteTaxesId, setDeleteTaxesId] = useState(0);
    const [showDeleteDiscount, setShowDeleteDiscount] = useState(false);
    const [deleteDiscountId, setDeleteDiscountId] = useState(0);
    let [discountLoading, setDiscountLoading] = useState(false);
    let [taxLoading, setTaxLoading] = useState(false);
    const [taxStatus, setTaxStatus] = useState("inactive");
    const [editId, setEditId] = useState("");
    const [loading, setLoading] = useState(false);
    const [discountButtonLoader, setDiscountButtonLoader] = useState(false);
    const [taxButtonLoader, setTaxButtonLoader] = useState(false);

    useEffect(() => {
        if (props.userID == null) return;
        getState();
        getDiscount();
        getTaxes();
        getShipping();
    }, [props.userID]);

    const addDiscount = () => {
        setDiscountButtonLoader(true);
        let data = new FormData();
        data.append("userId", props.userID);
        data.append("name", discountName);
        data.append("value", new Number(discountTax));
        data.append("type", discountType);
        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/add-discount`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                getDiscount();
                message.destroy();
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: "custom-postion",
                });
                setDiscountId(null);
                setDiscountName("");
                setDiscountTax("");
                setDiscountLoading(false);
                setDiscountButtonLoader(false);
            })
            .catch(function (error) {
                setDiscountButtonLoader(false);
                console.log(error);
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
            });
    };

    const deleteDiscount = (id) => {
        let data = new FormData();
        data.append("id", id);

        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/delete-discount`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                message.destroy();
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: "custom-postion",
                });
                getDiscount();
                setDiscountId(null);
                setShowDeleteDiscount(false);
            })
            .catch(function (error) {
                console.log(error);
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
            });
    };

    const addTax = () => {
        setTaxButtonLoader(true);
        let data = new FormData();
        data.append("userId", props.userID);
        data.append("stateId", stateSetting);
        data.append("name", taxName);
        data.append("value", taxValue);
        data.append("status", taxStatus);

        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/add-tax`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                message.destroy();
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: "custom-postion",
                });
                setTaxName("");
                setTaxValue("");
                setIdState(null);
                getTaxes();
                setTaxLoading(false);
                setTaxButtonLoader(false);
            })
            .catch(function (error) {
                console.log(error);
                setTaxButtonLoader(false);
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
            });
    };

    const editTax = (values) => {
        setTaxButtonLoader(true);
        let data = new FormData();
        data.append("id", idState);
        data.append("stateId", stateSetting);
        data.append("name", taxName);
        data.append("value", taxValue);
        data.append("status", taxStatus);

        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/edit-tax`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                message.destroy();
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: "custom-postion",
                });
                getTaxes();
                setTaxName("");
                setTaxValue("");
                setIdState(null);
                setTaxButtonLoader(false);
            })
            .catch(function (error) {
                console.log(error);
                setTaxButtonLoader(false);
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
            });
    };

    const deleteTax = (tid) => {
        let data = new FormData();
        data.append("id", tid);

        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/delete-tax`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                message.destroy();
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: "custom-postion",
                });
                setShowDeleteTaxes(false);
            })
            .catch(function (error) {
                console.log(error);
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
            });
    };
    const getState = () => {
        let data = new FormData();
        let config = {
            method: "get",
            url: `${process.env.MIX_REACT_APP_URL}/api/get-states`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setTaxState(response.data.data);
                setStateSetting(response.data.data[0].id);
            })
            .catch(function (error) {
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
                console.log(error);
            });
    };
    const updateDiscount = () => {
        setDiscountButtonLoader(true);
        var data = new FormData();
        data.append("id", discountId);
        data.append("name", discountName);
        data.append("value", new Number(discountTax));
        data.append("type", discountType);
        var config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/edit-discount`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                message.destroy();
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: "custom-postion",
                });
                setEditId(null);
                setDiscountName("");
                setDiscountTax("");
                setDiscountId(null);
                getDiscount();
                setDiscountButtonLoader(false);
            })
            .catch(function (error) {
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
                console.log(error);
                setDiscountButtonLoader(false);
            });
    };
    const handleSubmit = (e) => {
        setDiscountLoading(true);
        e.preventDefault();
        if (discountId !== null) {
            updateDiscount();
        } else {
            addDiscount();
        }
    };

    const handlUpdate = (value) => {
        setDiscountName(value.name);
        setDiscountTax(value.value);
        setDiscountId(value.id);
        setDiscountType(value.type);
    };

    const handleDelete = (id) => {
        setDeleteDiscountId(id);
        setShowDeleteDiscount(true);
    };

    const handleTaxSubmit = (e) => {
        e.preventDefault();
        setTaxLoading(true);
        addTax();
        setTaxes([
            ...tax,
            { name: taxName, state_id: stateSetting, value: taxValue },
        ]);
    };

    const handlUpdateTax = (e) => {
        e.preventDefault();
        setTaxLoading(true);
        editTax();
    };

    const handleDeleteTax = (id) => {
        setDeleteTaxesId(id);
        setShowDeleteTaxes(true);
    };
    const getDiscount = () => {
        setLoading(true);
        let data = new FormData();

        let config = {
            method: "get",
            url: `${process.env.MIX_REACT_APP_URL}/api/get-discount?userId=${props.userID}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setDiscounts(response.data.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
            });
    };

    const getTaxes = () => {
        setLoading(true);
        let data = new FormData();

        let config = {
            method: "get",
            url: `${process.env.MIX_REACT_APP_URL}/api/get-taxes?userId=${props.userID}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                let taxes = response.data.data;
                setTaxes(taxes);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
            });
    };

    const getShipping = () => {
        setLoading(true);
        let data = new FormData();

        let config = {
            method: "get",
            url: `${process.env.MIX_REACT_APP_URL}/api/get-shipping?userId=${props.userID}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                let shippingTax = response.data.data;
                setShipping(shippingTax);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    };

    const updateHandler = (obj) => {
        setIdState(obj.id);
        setTaxName(obj.name);
        setStateSetting(obj.state.id);
        setTaxValue(obj.value);
        setTaxStatus(obj.status);
    };
    const onChangeDiscountActive = (e, disc, index) => {
        let data = new FormData();
        data.append("discount_id", disc.id);
        data.append("status", e ? "active" : "inactive");
        data.append("userId", props.userID);
        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/discount-status`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(response);
                getDiscount();
                message.destroy();
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: "custom-postion",
                });
            })
            .catch(function (error) {
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
                console.log(error);
            });
    };
    const onChangeTaxActive = (e, obj, index) => {
        let data = new FormData();
        data.append("TaxId", obj.id);
        data.append("status", e ? "active" : "inactive");
        data.append("userId", props.userID);
        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/change-tax-status`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };
        axios(config)
            .then(function (response) {
                getTaxes();
                message.destroy();
                messageApi.open({
                    type: "success",
                    content: response.data.message,
                    duration: 5,
                    className: "custom-postion",
                });
            })
            .catch(function (error) {
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: error.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
                console.log(error);
            });
    };
    const handleChangetype = (value) => {
        setDiscountType(value);
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(discountTax)) {
            if (discountTax > 100) {
                setDiscountTax(100);
            } else if (
                discountTax > 100 &&
                discountTax >= 0 &&
                discountType === "percentage"
            ) {
                setDiscountTax(discountTax);
            } else if (discountType === "amount" && discountTax) {
                setDiscountTax(discountTax);
            } else if (!discountTax) {
                setDiscountTax("");
            }
        } else if (!e.target.value) {
            setDiscountTax("");
        }
    };
    const onChangeDiscountValue = (e) => {
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value)) {
            if (
                e.target.value <= 100 &&
                e.target.value >= 0 &&
                discountType === "percentage"
            ) {
                setDiscountTax(e.target.value);
            } else if (discountType === "amount" && e.target.value) {
                setDiscountTax(e.target.value);
            } else if (!e.target.value) {
                setDiscountTax("");
            }
        } else if (!e.target.value) {
            setDiscountTax("");
        }
    };
    return (
        <>
            {loading ? <CustomLoader buttonBool={false} /> : null}
            {showDeleteTaxes ? (
                <DeleteModal
                    accept={() => {
                        deleteTax(deleteTaxesId);
                        setTaxes(
                            [...tax].filter((taxObj) => {
                                return taxObj.id !== deleteTaxesId;
                            })
                        );
                    }}
                    open={showDeleteTaxes}
                    cancel={() => {
                        setShowDeleteTaxes(false);
                    }}
                />
            ) : null}
            {showDeleteDiscount ? (
                <DeleteModal
                    accept={() => {
                        deleteDiscount(deleteDiscountId);
                    }}
                    cancel={() => {
                        setShowDeleteDiscount(false);
                    }}
                    open={showDeleteDiscount}
                />
            ) : null}

            <Row justify="center">
                {contextHolder}
                <Col xs={24}>
                    <Row
                        justify="center"
                        align="middle"
                        className="discount-container discount-tax"
                    >
                        <Col xs={24}>
                            <p className="main discount-container-page-title">{`Discounts & Taxes`}</p>
                        </Col>
                        <Col xs={24}>
                            <Row justify="center" align="middle">
                                <Col
                                    xs={24}
                                    md={24}
                                    lg={16}
                                    className="discount-container_first discount-tax-con"
                                >
                                    <Row justify="center" align="middle">
                                        <Col xs={24} md={24}>
                                            <p className="heading">Discounts</p>
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
                                                        <Row
                                                            justify="center"
                                                            align="middle"
                                                        >
                                                            <Col xs={24}>
                                                                <p className="input-title">
                                                                    Discount
                                                                    Name
                                                                </p>
                                                            </Col>
                                                            <Col xs={24}>
                                                                <input
                                                                    placeholder="Discount Name"
                                                                    value={
                                                                        discountName
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setDiscountName(
                                                                            e
                                                                                .target
                                                                                .value
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
                                                            <Col xs={12}>
                                                                <p className="input-title">
                                                                    Discount
                                                                </p>
                                                            </Col>
                                                            <Col xs={1}></Col>
                                                            <Col
                                                                xs={11}
                                                                sm={12}
                                                                md={10}
                                                            >
                                                                <p className="input-title">
                                                                    Discount
                                                                    Type
                                                                </p>
                                                            </Col>
                                                            <Col xs={24}>
                                                                <Row justify="start">
                                                                    <Col
                                                                        xs={12}
                                                                        md={12}
                                                                    >
                                                                        {" "}
                                                                        <input
                                                                            type={
                                                                                "text"
                                                                            }
                                                                            className="input-discount"
                                                                            placeholder="Discount Value"
                                                                            value={`${discountTax}`}
                                                                            onChange={
                                                                                onChangeDiscountValue
                                                                            }
                                                                        />
                                                                    </Col>
                                                                    <Col
                                                                        xs={1}
                                                                    ></Col>
                                                                    <Col
                                                                        xs={10}
                                                                        sm={11}
                                                                        md={9}
                                                                    >
                                                                        {" "}
                                                                        <Select
                                                                            className="select-width"
                                                                            defaultValue="Select"
                                                                            onChange={
                                                                                handleChangetype
                                                                            }
                                                                            value={
                                                                                discountType ||
                                                                                "Select"
                                                                            }
                                                                        >
                                                                            <Option
                                                                                className="ant-select-item-option-content"
                                                                                value={
                                                                                    "percentage"
                                                                                }
                                                                            >
                                                                                %
                                                                            </Option>
                                                                            <Option
                                                                                className="ant-select-item-option-content"
                                                                                value={
                                                                                    "amount"
                                                                                }
                                                                            >
                                                                                $
                                                                            </Option>
                                                                        </Select>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col
                                                        xs={24}
                                                        lg={4}
                                                        style={{
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <Row
                                                            justify="center"
                                                            align="middle"
                                                        >
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
                                                                        handleSubmit
                                                                    }
                                                                    className={`save-button ${
                                                                        !discountName ||
                                                                        !discountTax ||
                                                                        discountButtonLoader
                                                                            ? "disable"
                                                                            : ""
                                                                    } `}
                                                                    type="submit"
                                                                >
                                                                    {discountId ==
                                                                    null ? (
                                                                        discountButtonLoader ==
                                                                        true ? (
                                                                            <span>
                                                                                <p>
                                                                                    Add
                                                                                </p>
                                                                                <CustomLoader
                                                                                    buttonBool={
                                                                                        true
                                                                                    }
                                                                                />
                                                                            </span>
                                                                        ) : (
                                                                            "Add"
                                                                        )
                                                                    ) : discountButtonLoader ==
                                                                      true ? (
                                                                        <span>
                                                                            <p>
                                                                                Update
                                                                            </p>
                                                                            <CustomLoader
                                                                                buttonBool={
                                                                                    true
                                                                                }
                                                                            />
                                                                        </span>
                                                                    ) : (
                                                                        "Update"
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
                                                <Col
                                                    xs={24}
                                                    className="discount-output"
                                                >
                                                    <Row
                                                        justify="center"
                                                        align="middle"
                                                    >
                                                        <table className="table-color">
                                                            {discounts && (
                                                                <tr className="discount-output_head">
                                                                    <th>
                                                                        Discount
                                                                        Name
                                                                    </th>
                                                                    <th>
                                                                        Discount
                                                                        Value
                                                                    </th>
                                                                    <th></th>
                                                                </tr>
                                                            )}
                                                            {discounts.length >
                                                                0 &&
                                                                discounts.map(
                                                                    (
                                                                        dis,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <tr className="discount-output_body discount-row">
                                                                                <td className="row-1">
                                                                                    {
                                                                                        dis.name
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {dis.type ==
                                                                                    "percentage"
                                                                                        ? `${dis.value} %`
                                                                                        : `$ ${dis.value}`}
                                                                                </td>
                                                                                <td className="discount-col-3">
                                                                                    <img
                                                                                        style={{
                                                                                            width: "18px",
                                                                                            height: "18px",
                                                                                            marginRight:
                                                                                                "20px",
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                        src={
                                                                                            edit
                                                                                        }
                                                                                        onClick={() => {
                                                                                            handlUpdate(
                                                                                                dis
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                    <img
                                                                                        style={{
                                                                                            width: "16px",
                                                                                            height: "16px",
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                        src={
                                                                                            cross
                                                                                        }
                                                                                        onClick={() => {
                                                                                            handleDelete(
                                                                                                dis.id
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                    <Switch
                                                                                        {...label}
                                                                                        className="switch-margin"
                                                                                        checked={
                                                                                            dis?.status ==
                                                                                            "active"
                                                                                                ? true
                                                                                                : false
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            onChangeDiscountActive(
                                                                                                e,
                                                                                                dis,
                                                                                                index
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    }
                                                                )}
                                                        </table>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={24}>
                            <Row justify="center" align="middle">
                                <Col
                                    xs={24}
                                    md={24}
                                    lg={16}
                                    className="discount-container_first discount-tax-con"
                                >
                                    <Col xs={24} md={24}>
                                        <p className="heading">Taxes</p>
                                    </Col>
                                    <Col xs={24}>
                                        <form onSubmit={handleTaxSubmit}>
                                            <Row justify="space-between">
                                                <Col
                                                    xs={24}
                                                    md={12}
                                                    lg={10}
                                                    className="discount-container_first-form_section"
                                                >
                                                    <Row
                                                        justify="center"
                                                        align="middle"
                                                    >
                                                        <Col xs={24}>
                                                            <p className="input-title">
                                                                Tax Name
                                                            </p>
                                                        </Col>
                                                        <Col xs={24}>
                                                            <input
                                                                placeholder="Enter Tax Name"
                                                                value={taxName}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setTaxName(
                                                                        e.target
                                                                            .value
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
                                                    <Row
                                                        justify="center"
                                                        align="middle"
                                                    >
                                                        <Col xs={23}>
                                                            <p className="input-title">
                                                                Tax Value (%)
                                                            </p>
                                                        </Col>
                                                        <Col xs={23}>
                                                            <input
                                                                type={"number"}
                                                                min={0}
                                                                placeholder="Add %"
                                                                value={taxValue}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const regix =
                                                                        new RegExp(
                                                                            "^[0-9]*[/.]?([0-9]*)?$"
                                                                        );

                                                                    if (
                                                                        regix.test(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    ) {
                                                                        if (
                                                                            e
                                                                                .target
                                                                                .value <=
                                                                                100 &&
                                                                            e
                                                                                .target
                                                                                .value >=
                                                                                0
                                                                        ) {
                                                                            setTaxValue(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );
                                                                        } else if (
                                                                            !e
                                                                                .target
                                                                                .value
                                                                        ) {
                                                                            setTaxValue(
                                                                                ""
                                                                            );
                                                                        }
                                                                    } else if (
                                                                        !e
                                                                            .target
                                                                            .value
                                                                    ) {
                                                                        setTaxValue(
                                                                            ""
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col
                                                    xs={24}
                                                    lg={4}
                                                    style={{
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Row
                                                        justify="center"
                                                        align="middle"
                                                    >
                                                        <Col xs={24}>
                                                            <p class="input-title hidden-text">
                                                                Value
                                                            </p>
                                                        </Col>
                                                        <Col
                                                            xs={23}
                                                            className="btn_section"
                                                        >
                                                            <button
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    idState !==
                                                                    null
                                                                        ? handlUpdateTax(
                                                                              e
                                                                          )
                                                                        : handleTaxSubmit(
                                                                              e
                                                                          );
                                                                }}
                                                                className={`save-button ${
                                                                    !taxName ||
                                                                    !taxValue ||
                                                                    taxButtonLoader
                                                                        ? "disable"
                                                                        : ""
                                                                } `}
                                                                type="submit"
                                                            >
                                                                {idState ==
                                                                null ? (
                                                                    taxButtonLoader ==
                                                                    true ? (
                                                                        <span>
                                                                            <p>
                                                                                Add
                                                                            </p>
                                                                            <CustomLoader
                                                                                buttonBool={
                                                                                    true
                                                                                }
                                                                            />
                                                                        </span>
                                                                    ) : (
                                                                        "Add"
                                                                    )
                                                                ) : taxButtonLoader ==
                                                                  true ? (
                                                                    <span>
                                                                        <p>
                                                                            Update
                                                                        </p>
                                                                        <CustomLoader
                                                                            buttonBool={
                                                                                true
                                                                            }
                                                                        />
                                                                    </span>
                                                                ) : (
                                                                    "Update"
                                                                )}
                                                            </button>
                                                        </Col>
                                                    </Row>{" "}
                                                </Col>
                                            </Row>
                                        </form>
                                    </Col>
                                    <Col xs={24} className="discount-output">
                                        <Row>
                                            <Col
                                                xs={24}
                                                className="discount-output"
                                            >
                                                <Row
                                                    justify="center"
                                                    align="middle"
                                                >
                                                    <table className="table-color">
                                                        {tax?.length > 0 && (
                                                            <tr className="discount-output_head">
                                                                <th>
                                                                    Tax Name
                                                                </th>
                                                                <th>
                                                                    Tax Value
                                                                </th>
                                                                <th></th>
                                                            </tr>
                                                        )}
                                                        {tax?.length > 0 &&
                                                            tax?.map(
                                                                (
                                                                    obj,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <tr className="discount-output_body discount-row">
                                                                            <td className="row-1">
                                                                                {
                                                                                    obj.name
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    obj.value
                                                                                }

                                                                                %
                                                                            </td>
                                                                            <td className="col-4 custom-tax-col-3">
                                                                                <img
                                                                                    style={{
                                                                                        width: "18px",
                                                                                        height: "18px",
                                                                                        marginRight:
                                                                                            "20px",
                                                                                        cursor: "pointer",
                                                                                    }}
                                                                                    src={
                                                                                        edit
                                                                                    }
                                                                                    onClick={() => {
                                                                                        updateHandler(
                                                                                            obj
                                                                                        );
                                                                                    }}
                                                                                />
                                                                                <img
                                                                                    style={{
                                                                                        width: "16px",
                                                                                        height: "16px",
                                                                                        cursor: "pointer",
                                                                                    }}
                                                                                    src={
                                                                                        cross
                                                                                    }
                                                                                    onClick={() => {
                                                                                        handleDeleteTax(
                                                                                            obj.id
                                                                                        );
                                                                                    }}
                                                                                />
                                                                                <Switch
                                                                                    {...label}
                                                                                    className="switch-margin"
                                                                                    checked={
                                                                                        obj?.status ===
                                                                                        "active"
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        onChangeTaxActive(
                                                                                            e,
                                                                                            obj,
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            )}
                                                    </table>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24}>
                            <ShippingSettings />
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
export default connect(mapStateToProps)(DiscountTaxes);
