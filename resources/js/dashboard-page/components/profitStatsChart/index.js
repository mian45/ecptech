import React from "react";
import Chart from "react-apexcharts";
import classes from "./styles.module.scss";

const ProfitStatsChart = () => {
    const options = {
        chart: {
            type: "area",
            toolbar: {
                show: false,
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
            },
        },
        yaxis: {
            label: {
                style: {
                    color: ["#E8E8E8"],
                },
            },
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
        series: [
            {
                data: ["11px", "32px", "45px"],
            },
        ],
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["label"]}>Profit Comparison</div>
            <Chart
                options={options}
                series={options?.series}
                type="area"
                height={200}
            />
            <div className={classes["y-axis-label"]}>
                <div className={classes["date"]}>Jan 2021</div>
                <div className={classes["date"]}>Jul 2022</div>
            </div>
        </div>
    );
};

export default ProfitStatsChart;
