import React from "react";
import Chart from "react-apexcharts";
import classes from "./styles.module.scss";

const TeamPerformanceChart = () => {
    const options = {
        series: [
            {
                name: "Current Month",
                data: [44, 55, 57, 56, 61],
            },
            {
                name: "Previous",
                data: [76, 85, 101, 98, 87],
            },
        ],
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            enable: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "35px",
                endingShape: "rounded",
                borderRadius: 5,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#6FA5CB", "#CBCBCB"],

        xaxis: {
            categories: ["John", "David", "Peter", "Joseph", "Jenny"],
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        states: {
            hover: {
                filter: {
                    type: "none",
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#CBCBCB",
            strokeDashArray: 5,
            position: "back",
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
            row: {
                colors: undefined,
                opacity: 0.5,
            },
            column: {
                colors: undefined,
                opacity: 0.5,
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
        },
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["label"]}>Team Performance</div>
            <Chart
                options={options}
                series={options?.series}
                type="bar"
                height={200}
            />
            <div className={classes["status-map"]}>
                <StatusSlot title={"Current Month"} />
                <StatusSlot title={"Previous"} isGray />
            </div>
        </div>
    );
};

export default TeamPerformanceChart;

const StatusSlot = ({ title, isGray }) => {
    return (
        <div className={classes["status-container"]}>
            <div className={isGray ? classes["icon-grey"] : classes["icon"]} />
            <div className={isGray ? classes["title-grey"] : classes["title"]}>
                {title}
            </div>
        </div>
    );
};
