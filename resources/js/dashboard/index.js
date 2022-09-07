import React from "react";
import StaffLogin from "../components/staffLogin";
import classes from "./styles.module.scss";

const Dashboard = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["left-board"]}>
                <StaffLogin />
            </div>
            <div className={classes["right-board"]}></div>
        </div>
    );
};

export default Dashboard;
