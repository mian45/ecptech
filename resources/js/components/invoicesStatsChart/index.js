import React from "react";
import Chart from "react-apexcharts";
import classes from "./styles.module.scss";

const InvoicesStatsChart = ({ data }) => {
    const options = {
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
            enabled: false,
        },
        plotOptions: {
            bar: {
                distributed: true,
                borderRadius: 10,
                horizontal: true,
                dataLabels: {
                    position: "top",
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#6FA5CB", "#61C77B", "#DB8857", "#BD57DB", "#CBCBCB"],
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: ["#E8E8E8"],
                },
            },
        },
        yaxis: {
            labels: {
                align: "left",
                style: {
                    fontSize: "14px",
                    maxWidth: 130,
                    fontFamily: "Montserrat",
                    colors: [
                        "#6FA5CB",
                        "#61C77B",
                        "#DB8857",
                        "#BD57DB",
                        "#CBCBCB",
                    ],
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
        dataLabels: {
            enabled: true,
            textAnchor: "end",
            offsetX: 0,
            formatter: function (val, opt) {
                let isPercentage = "";
                if (data[opt.dataPointIndex]?.percentage)
                    isPercentage = `- ${data[opt.dataPointIndex]?.percentage}%`;
                return data[opt.dataPointIndex]?.x === "Capture Rate"
                    ? `${data[opt.dataPointIndex]?.percentage || 0}%`
                    : `${data[opt.dataPointIndex]?.y} ${isPercentage}`;
            },
        },
        series: [
            {
                data: data,
            },
        ],
        grid: {
            show: true,
            borderColor: "#CBCBCB",
            strokeDashArray: 5,
            position: "back",
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: false,
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
            <div className={classes["label"]}>Invoices</div>
            <Chart
                options={options}
                series={options?.series}
                type="bar"
                height={200}
            />
        </div>
    );
};
export default InvoicesStatsChart;
