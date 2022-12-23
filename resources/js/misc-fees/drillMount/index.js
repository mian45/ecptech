import React, { useState, useEffect } from "react";
import Axios from "../../Http";
import { connect } from "react-redux";
import edit from "../../../images/edit.png";
import cross from "../../../images/cross.png";
import CustomLoader from "../../components/customLoader";
import DeleteModal from "../../components/deleteModal/index";
import { Row, Col, message, Tooltip, Switch } from "antd";
const label = { inputProps: { "aria-label": "Switch demo" } };
const DrillSettings = ({ userId,setLoading }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [Amount, setAmount] = useState("");
    const [Drill, setDrill] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [DrillButtonLoader, setDrillButtonLoader] = useState(false);

    const [editState, setEditState] = useState(false);
    const [showDeleteDrill, setShowDeleteDrill] = useState(false);
    const [deleteDrillId, setDeleteDrillId] = useState(0);
    useEffect(() => {
        if (userId == null) return;
        setEditState(false);
        getDrillMount();
    }, [userId]);
    const getDrillMount = async () => {
        setLoading(true);
        try {
            const res = await Axios.get(
                process.env.MIX_REACT_APP_URL + "/api/drill-mount",
                { params: { userId: userId } }
            );
            const DrillData = res?.data?.data;
            setDrill({ ...DrillData });
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
    const handleUpdateDrill = async (data) => {
        setAmount(data?.value);
        setIsSubmitted(false);
    };
    const deleteDrill = async (id) => {
        try {
            const res = await Axios.delete(
                process.env.MIX_REACT_APP_URL + `/api/drill-mount/${id}`,
            );
            setDrill({});
            setIsSubmitted(false);
            setShowDeleteDrill(false);
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: 'custom-postion',
            });
        } catch (err) {
            console.log("error while delete Drill");
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: 'custom-postion-error',
            });
        }
    };
    const handleDeleteDrill = async (id) => {
        setDeleteDrillId(id);
        setShowDeleteDrill(true);
        setAmount("");
        setIsSubmitted(true);
    };
    const handleDrillSubmit = async (e) => {
        setDrillButtonLoader(true);
        e?.preventDefault();

        try {
            const payload = {
                userId: userId,
                value: Amount,
            };
            const res = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/drill-mount",
                payload
            );
            setDrill(res?.data?.data);
            setEditState(false);
            setAmount("");
            setIsSubmitted(true);
            setDrillButtonLoader(false);
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: 'custom-postion',
            });
        } catch (err) {
            console.log("error while adding Drill");
            setDrillButtonLoader(false);
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
                process.env.MIX_REACT_APP_URL + `/api/drill-mount/${id}`,
                {
                    userId:userId,
                    status:status?"active":"inactive"
                   }
            );
            setDrill(res?.data?.data);
            setEditState(false);
            setAmount("");
            setIsSubmitted(true);
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: 'custom-postion',
            });
        } catch (err) {
            console.log("error while adding shipping");
            setDrillButtonLoader(false);
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
            {showDeleteDrill ? (
                <DeleteModal
                    accept={() => {
                        deleteDrill(deleteDrillId);
                    }}
                    cancel={() => {
                        setShowDeleteDrill(false);
                    }}
                    open={showDeleteDrill}
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
                            <p className="heading">Drill Mount</p>
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
                                        <Row>
                                            <Col xs={24}>
                                                <p className="input-title">
                                                    Enter Amount
                                                </p>
                                            </Col>
                                            <Col xs={24}>
                                                <input
                                                    placeholder="Enter Amount"
                                                    type={"number"}
                                                    min={0}
                                                    value={Amount}
                                                    onChange={(e) => {
                                                        setAmount(
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
                                                        handleDrillSubmit
                                                    }
                                                    className={`save-button ${
                                                        !Amount
                                                        ? "disable"
                                                        : ""
                                                        } `}
                                                >
                                                    {editState ? (
                                                        "Update"
                                                    ) : DrillButtonLoader ==
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
                                            {Object.keys(Drill).length >
                                                0 && (
                                                    <tr className="discount-output_head">
                                                        <th>Drill Amount</th>
                                                        <th>Final Amount</th>
                                                        <th></th>
                                                    </tr>
                                                )}
                                            {Object.keys(Drill).length >
                                                0 && (
                                                    <tr className="discount-output_body">
                                                        <td>${Drill.value}</td>
                                                        <td>${Drill.value-((Drill.value/100)*20)}</td>
                                                        <td className="col-4 custom-tax-col-3">
                                                        <Tooltip title={"Edit"} color={'#6fa5cb'} key={0}>
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
                                                                  
                                                                    handleUpdateDrill(
                                                                        Drill
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
                                                                    handleDeleteDrill(
                                                                        Drill.id
                                                                    );
                                                                }}
                                                            /></Tooltip>
                                                            <Switch
                                                            {...label}
                                                            className="switch-margin"
                                                            checked={Drill?.status ==="active"? true: false}
                                                            onChange={(e) => { updateStatus(e,Drill.id)}}
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
export default connect(mapStateToProps)(DrillSettings);
