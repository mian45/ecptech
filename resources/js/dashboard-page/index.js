import React from "react";
import InvoicesStatsChart from "../components/invoicesStatsChart";
import classes from "./styles.module.scss";

const Dashboard = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["left-stats"]}>
                <InvoicesStatsChart />
            </div>
            <div className={classes["right-stats"]}>right</div>
        </div>
    );
};

export default Dashboard;
