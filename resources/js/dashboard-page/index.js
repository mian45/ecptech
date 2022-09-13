import React from "react";
import InvoicesStatsChart from "../components/invoicesStatsChart";
import classes from "./styles.module.scss";

const Dashboard = () => {
    const data = mappedGraphData(response);
    return (
        <div className={classes["container"]}>
            <div className={classes["left-stats"]}>
                <InvoicesStatsChart data={data} />
            </div>
            <div className={classes["right-stats"]}>right</div>
        </div>
    );
};

export default Dashboard;

const response = {
    generated: 3,
    office_paid: 0,
    office_paid_percent: 0,
    online_paid: 1,
    online_paid_percent: 100,
    capture_rate: 33,
    unpaid: 2,
};

const mappedGraphData = (response) => {
    const dataArray = [
        {
            x: "Generated",
            y: response["generated"],
            percentage: "",
        },
        {
            x: "Paid In Office",
            y: response["office_paid"],
            percentage: response["office_paid_percent"],
        },
        {
            x: "Paid Online",
            y: response["online_paid"],
            percentage: response["online_paid_percent"],
        },
        {
            x: "Capture Rate",
            y: Math.floor(
                (response["office_paid"] + response["online_paid"]) /
                    response["generated"]
            ),
            percentage: response["capture_rate"],
        },

        {
            x: "Un Paid",
            y: response["unpaid"],
            percentage: "",
        },
    ];
    return dataArray;
};
