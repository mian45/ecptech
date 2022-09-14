import React from "react";
import Chart from "react-apexcharts";
import classes from "./styles.module.scss";

const TeamPerformanceChart = () => {
    const options = {
        series: [
            {
                name: "Current Month",
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            },
            {
                name: "Previous",
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            },
        ],
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["label"]}>Team Performance</div>
            <Chart
                options={options?.options}
                series={options?.series}
                type="bar"
                height={200}
            />
        </div>
    );
};

export default TeamPerformanceChart;
