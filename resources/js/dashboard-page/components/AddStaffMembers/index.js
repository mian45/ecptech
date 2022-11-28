import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./styles.module.scss";
import userIcon from "../../../../images/user-icon.svg";
import tickIcon from "../../../../images/tick.svg";
import editIcon from "../../../../images/edit-icon.svg";
import deleteIcon from "../../../../images/delete-icon.svg";
import Axios from "../../../Http";
import DeleteModal from "../../../components/deleteModal/index";
import { Row, Col, message } from "antd";
const AddStaffMember = ({ userId }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [staffList, setStaffList] = useState([]);
    const [staffInput, setStaffInput] = useState("");
    const [editId, setEditId] = useState(null);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        if (!userId) return;
        const getAllStaff = async () => {
            try {
                const payload = { userId: userId };
                const res = await Axios.post(
                    `${process.env.MIX_REACT_APP_URL}/api/getStaff`,
                    payload
                );
                const staffRes = res?.data?.data;
                setStaffList(
                    [...staffRes].sort(function (a, b) {
                        var nameA = a?.name?.toUpperCase();
                        var nameB = b?.name?.toUpperCase();
                        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
                    })
                );
            } catch (err) {
                console.log("Error while fetch Staff", err);
                messageApi.open({
                    type: "error",
                    content: err.message,
                    duration: 5,
                    className: 'custom-postion',
                });
            }
        };
        getAllStaff();
    }, [userId]);
    const handleEdit = async () => {
        try {
            const payload = { userId: userId, id: editId, name: staffInput };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/editStaff`,
                payload
            );
            const updatedStaff = {
                id: res?.data?.data?.id,
                name: res?.data?.data?.name,
            };

            const editIndex = [...staffList].findIndex(
                (singleStaff) => editId === singleStaff.id
            );
            const staff = [...staffList];
            staff.splice(editIndex, 1, updatedStaff);
            setStaffList([...staff]);
            setStaffInput("");
            setEditId(null);
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: 'custom-postion',
            });
        } catch (err) {
            console.log("Error while edit Staff", err);
            messageApi.open({
                type: "error",
                content: err.message,
                duration: 5,
                className: 'custom-postion',
            });
        }
    };
    const handleCreate = async () => {
        try {
            const payload = { userId: userId, name: staffInput };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/addStaff`,
                payload
            );
            const newStaff = res?.data?.data;

            setStaffList(
                [newStaff, ...staffList].sort(function (a, b) {
                    var nameA = a?.name?.toUpperCase();
                    var nameB = b?.name?.toUpperCase();
                    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
                })
            );
            setStaffInput("");
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: 'custom-postion',
            });
        } catch (err) {
            console.log("Error while create Staff", err);
            messageApi.open({
                type: "error",
                content: err.message,
                duration: 5,
                className: 'custom-postion',
            });
        }
    };

    const handleSubmit = async () => {
        if (staffInput?.length < 3) return;
        if (editId) {
            await handleEdit();
        } else {
            await handleCreate();
        }
    };
    const handleDeleteClick = async (id) => {
        try {
            const payload = { id: id };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/delete-staff`,
                payload
            );
            let filteredStaff = [...staffList].filter(
                (staff) => staff.id !== id
            );
            setStaffList([...filteredStaff]);
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: 'custom-postion',
            });
            setEditId(null);
        } catch (err) {
            console.log("Error while delete Staff", err);
            messageApi.open({
                type: "error",
                content: err.message,
                duration: 5,
                className: 'custom-postion',
            });
        }
    };

    const handleStaffChange = (e) => {
        setStaffInput(e.target.value);
    };
    const handleEditClick = (data) => {
        setStaffInput(data?.name || "");
        setEditId(data?.id || "");
    };
    const getBackgroundButton = () => {
        if (isHover && staffInput?.length > 3) {
            return classes["active-button"];
        } else if (staffInput?.length < 3) {
            return classes["disabled-button"];
        } else {
            return classes["default-button"];
        }
    };
    return (
        <div className={classes["container"]}>
            <div>{contextHolder}</div>
            <div className={classes["label"]}>Add Staff Members</div>
            <Row justify="space-between" align="middle">
                <Col xs={18}>
                    <input
                        className={classes["input-field"]}
                        placeholder={"Enter staff member name"}
                        onChange={handleStaffChange}
                        value={staffInput}
                    />
                </Col>
                <Col xs={5}>
                    <Row
                        className={`${
                            classes["tick-wrapper"]
                        } ${getBackgroundButton()}`}
                        onClick={handleSubmit}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        justify="center"
                        align="middle"
                    >
                        <img
                            src={tickIcon}
                            alt="tick"
                            className={classes["tick-icon"]}
                        />
                    </Row>
                </Col>
            </Row>
            <div className={classes["staff-map"]}>
                {[...staffList]?.map((staff, index) => {
                    return (
                        <StaffMemberSlot
                            staff={staff}
                            key={index}
                            handleEdit={handleEditClick}
                            handleDelete={handleDeleteClick}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth?.user?.id,
});

export default connect(mapStateToProps)(AddStaffMember);

const StaffMemberSlot = ({ staff, handleEdit, handleDelete }) => {
    const [showDelete, setShowDelete] = useState(false);
    return (
        <>
            {showDelete ? (
                <DeleteModal
                    accept={async () => {
                        setShowDelete(false);
                        await handleDelete(staff?.id);
                    }}
                    open={showDelete}
                    cancel={() => {
                        setShowDelete(false);
                    }}
                />
            ) : null}
            <Row
                className={classes["slot-container"]}
                justify={"center"}
                align={"middle"}
            >
                <Col xs={18}>
                    <Row justify="center" align="middle">
                        <Col xs={6}>
                            <img
                                src={userIcon}
                                alt={"user-icon"}
                                className={classes["user-icon"]}
                            />
                        </Col>
                        <Col xs={18}>
                            <div className={classes["staff-name"]}>
                                {staff?.name || ""}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6}>
                    <Row justify="space-between" align="middle">
                        <Col xs={6}>
                            <img
                                src={editIcon}
                                alt={"edit-icon"}
                                className={classes["edit-icon"]}
                                onClick={() => handleEdit(staff)}
                            />
                        </Col>
                        <Col xs={6}>
                            <img
                                src={deleteIcon}
                                alt={"delete-icon"}
                                className={classes["delete-icon"]}
                                onClick={() => {
                                    setShowDelete(true);
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};
