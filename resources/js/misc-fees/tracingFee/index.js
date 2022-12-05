import React, { useState, useEffect } from "react";
import Axios from "../../Http";
import { connect } from "react-redux";
import edit from "../../../images/edit.png";
import cross from "../../../images/cross.png";
import CustomLoader from "../../components/customLoader";
import DeleteModal from "../../components/deleteModal/index";
import { Row, Col, message, Tooltip, Switch } from "antd";
const label = { inputProps: { "aria-label": "Switch demo" } };
const TracingSettings = ({ userId,setLoading }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [TracingName, setTracingName] = useState("");
    const [TracingAmount, setTracingAmount] = useState("");
    const [Tracing, setTracing] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [TracingButtonLoader, setTracingButtonLoader] = useState(false);

    const [editState, setEditState] = useState(false);
    const [showDeleteTracing, setShowDeleteTracing] = useState(false);
    const [deleteTracingId, setDeleteTracingId] = useState(0);
    useEffect(() => {
        if (userId == null) return;
        setEditState(false);
        getTracing();
    }, [userId]);
    const getTracing = async () => {
        setLoading(true);
        try {
            const res = await Axios.get(
                process.env.MIX_REACT_APP_URL + "/api/tracing-fee",
                { params: { userId: userId } }
            );
            const TracingData = res?.data?.data;
            setTracing({ ...TracingData });
            setLoading(false);
        } catch (err) {
            if (err.response.data.statusCode === 404) {
                messageApi.open({
                    type: "error",
                    content: err.response.data.message,
                    duration: 5,
                    className: 'custom-postion-error',
                });
            } else {
                messageApi.open({
                    type: "error",
                    content: err.response.data.message,
                    duration: 5,
                    className: 'custom-postion-error',
                });
            }
            setLoading(false);
        }
    };
    const handleUpdateTracing = async (data) => {
        setTracingName(data?.name);
        setTracingAmount(data?.value);
        setIsSubmitted(false);
    };
    const deleteTracing = async (id) => {
        try {
            const res = await Axios.delete(
                process.env.MIX_REACT_APP_URL + `/api/tracing-fee/${id}`,
            );
            setTracing({});
            setIsSubmitted(false);
            setShowDeleteTracing(false);
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: 'custom-postion',
            });
        } catch (err) {
            console.log("error while delete Tracing");
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: 'custom-postion-error',
            });
        }
    };
    const handleDeleteTracing = async (id) => {
        setDeleteTracingId(id);
        setShowDeleteTracing(true);
        setTracingName("");
        setTracingAmount("");
        setIsSubmitted(true);
    };
    const handleTracingSubmit = async (e) => {
        setTracingButtonLoader(true);
        e?.preventDefault();

        try {
            const payload = {
                userId: userId,
                name: TracingName,
                value: TracingAmount,
            };
            const res = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/tracing-fee",
                payload
            );
            setTracing(res?.data?.data);
            setTracingName("");
            setEditState(false);
            setTracingAmount("");
            setIsSubmitted(true);
            setTracingButtonLoader(false);
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: 'custom-postion',
            });
        } catch (err) {
            console.log("error while adding Tracing");
            setTracingButtonLoader(false);
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: 'custom-postion-error',
            });
        }
    };
    const updateStatus=async (status,id)=>{
        try {
            const res = await Axios.put(
                process.env.MIX_REACT_APP_URL + `/api/tracing-fee/${id}`,
                {
                    userId:userId,
                    status:status?"active":"inactive"
                   }
            );
            setTracing(res?.data?.data);
            setTracingName("");
            setEditState(false);
            setTracingAmount("");
            setIsSubmitted(true);
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: 'custom-postion',
            });
        } catch (err) {
            console.log("error while adding shipping");
            setTracingButtonLoader(false);
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: 'custom-postion-error',
            });
        }
    }
    return (
        <>
            {showDeleteTracing ? (
                <DeleteModal
                    accept={() => {
                        deleteTracing(deleteTracingId);
                    }}
                    cancel={() => {
                        setShowDeleteTracing(false);
                    }}
                    open={showDeleteTracing}
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
                            <p className="heading">Tracing</p>
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
                                                    value={TracingName}
                                                    onChange={(e) => {
                                                        setTracingName(
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
                                                    Add Tracing Amount
                                                </p>
                                            </Col>
                                            <Col xs={24}>
                                                <input
                                                    placeholder="Enter Amount"
                                                    type={"number"}
                                                    min={0}
                                                    value={TracingAmount}
                                                    onChange={(e) => {
                                                        setTracingAmount(
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
                                                        handleTracingSubmit
                                                    }
                                                    className={`save-button ${!TracingName ||
                                                        !TracingAmount
                                                        ? "disable"
                                                        : ""
                                                        } `}
                                                >
                                                    {editState ? (
                                                        "Update"
                                                    ) : TracingButtonLoader ==
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
                                            {Object.keys(Tracing).length >
                                                0 && (
                                                    <tr className="discount-output_head">
                                                        <th>Tracing Label</th>
                                                        <th>Amount</th>
                                                        <th></th>
                                                    </tr>
                                                )}
                                            {Object.keys(Tracing).length >
                                                0 && (
                                                    <tr className="discount-output_body">
                                                        <td>{Tracing.name}</td>
                                                        <td>${Tracing.value}</td>
                                                        <td className="shipping-custom-col-3">
                                                        <Tooltip title={"Edit"} color={'#6fa5cb'} key={0}>
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
                                                                  
                                                                    handleUpdateTracing(
                                                                        Tracing
                                                                    );
                                                                }}
                                                            /></Tooltip>
                                                            <Tooltip title={"Delete"} color={'#6fa5cb'} key={0}>
                                                            <img
                                                                style={{
                                                                    width: "16px",
                                                                    height: "16px",
                                                                    cursor: "pointer",
                                                                }}
                                                                src={cross}
                                                                onClick={() => {
                                                                    handleDeleteTracing(
                                                                        Tracing.id
                                                                    );
                                                                }}
                                                            /></Tooltip>
                                                            <Switch
                                                            {...label}
                                                            className="switch-margin"
                                                            checked={Tracing?.status ==="active"? true: false}
                                                            onChange={(e) => { updateStatus(e,Tracing.id)}}
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
export default connect(mapStateToProps)(TracingSettings);
