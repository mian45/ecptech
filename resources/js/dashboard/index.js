import React from "react";
import { connect } from "react-redux";
import StaffLogin from "../components/staffLogin";
import classes from "./styles.module.scss";

const Dashboard = ({ userRole }) => {
    return (
        <div className={classes["container"]}>
            <div className={classes["left-board"]}>
                {userRole !== "staff" && <StaffLogin />}
            </div>
            <div className={classes["right-board"]}></div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userRole: state.Auth.userRole?.name,
});
export default connect(mapStateToProps)(Dashboard);
