import React, { useEffect, useState } from "react";
import StaffTableBodySlot from "../staffTableBodySlot";
import StaffTableHeader from "../staffTableHeader";
import classes from "./styles.module.scss";
import Axios from "../../../Http";
import { connect } from "react-redux";

const StaffListTable = ({ userId }) => {
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        if (!userId) return;
        const getStaffList = async () => {
            try {
                const invoiceData = {
                    start_date: "2022-08-16",
                    end_date: "2022-09-15",
                };
                const res = await Axios.post(
                    process.env.MIX_REACT_APP_URL + "/api/team-progress",
                    invoiceData
                );
                setStaffList(res?.data?.data);
            } catch (err) {
                console.log("Error while getting staff");
            }
        };

        getStaffList();
    }, []);

    return (
        <div className={classes["container"]}>
            <table className={classes["table"]}>
                <thead className={classes["table-header"]}>
                    <StaffTableHeader />
                </thead>

                <tbody>
                    {staffList?.map((staff, index) => {
                        return <StaffTableBodySlot data={staff} key={index} />;
                    })}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
});

export default connect(mapStateToProps)(StaffListTable);
