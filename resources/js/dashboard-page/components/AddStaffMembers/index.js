import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./styles.module.scss";
import userIcon from "../../../../images/user-icon.svg";
import tickIcon from "../../../../images/tick.svg";
import editIcon from "../../../../images/edit-icon.svg";
import deleteIcon from "../../../../images/delete-icon.svg";
import Axios from "../../../Http";

const AddStaffMember = ({ userId }) => {
    const [staffList, setStaffList] = useState([]);
    const [staffInput, setStaffInput] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const getAllStaff = async () => {
            try {
                const payload = { userId: userId };
                const res = await Axios.post(
                    `${process.env.MIX_REACT_APP_URL}/api/getStaff`,
                    payload
                );
                const staffRes = res?.data?.data;
                setStaffList([...staffRes]);
            } catch (err) {
                console.log("Error while fetch Staff", err);
            }
        };
        getAllStaff();
    }, []);
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
        } catch (err) {
            console.log("Error while edit Staff", err);
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
            setStaffList([newStaff, ...staffList]);
            setStaffInput("");
        } catch (err) {
            console.log("Error while create Staff", err);
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
            await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/delete-staff`,
                payload
            );

            const filteredStaff = [...staffList].filter(
                (staff) => staff.id !== id
            );
            setStaffList([...filteredStaff]);
        } catch (err) {
            console.log("Error while delete Staff", err);
        }
    };

    const handleStaffChange = (e) => {
        setStaffInput(e.target.value);
    };
    const handleEditClick = (data) => {
        setStaffInput(data?.name || "");
        setEditId(data?.id || "");
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["label"]}>Add Staff Members</div>
            <div className={classes["input-wrapper"]}>
                <input
                    className={classes["input-field"]}
                    placeholder={"Enter staff member name"}
                    onChange={handleStaffChange}
                    value={staffInput}
                />
                <div
                    className={classes["tick-wrapper"]}
                    onClick={handleSubmit}
                    style={{
                        backgroundColor:
                            staffInput?.length < 3 ? "#CBCBCB" : "#6fa5cb",
                    }}
                >
                    <img
                        src={tickIcon}
                        alt="tick"
                        className={classes["tick-icon"]}
                    />
                </div>
            </div>
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
    return (
        <div className={classes["slot-container"]}>
            <div className={classes["slot-info"]}>
                <img
                    src={userIcon}
                    alt={"user-icon"}
                    className={classes["user-icon"]}
                />
                <div className={classes["staff-name"]}>{staff?.name || ""}</div>
            </div>
            <div className={classes["slot-actions"]}>
                <img
                    src={editIcon}
                    alt={"edit-icon"}
                    className={classes["edit-icon"]}
                    onClick={() => handleEdit(staff)}
                />
                <img
                    src={deleteIcon}
                    alt={"delete-icon"}
                    className={classes["delete-icon"]}
                    onClick={() => handleDelete(staff?.id)}
                />
            </div>
        </div>
    );
};
