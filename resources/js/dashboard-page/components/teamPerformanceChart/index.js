import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import classes from "./styles.module.scss";
import Axios from "../../../Http";
import { connect } from "react-redux";
import { message } from "antd";

const TeamPerformanceChart = (userId) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [points, setPoints] = useState({
        current: [],
        prev: [],
        names: [],
    });

    const options = getChartOptions(points);

    useEffect(() => {
        if (!userId) return;
        const getStats = async () => {
            try {
                const payload = {
                    start_date: "2022-08-16",
                    end_date: "2022-09-15",
                };
                const res = await Axios.post(
                    process.env.MIX_REACT_APP_URL + "/api/team-performance",
                    payload
                );
                manageValues(res?.data?.data);
            } catch (err) {
                console.log("Error while getting performance stats", err);
                messageApi.open({
                    type: "error",
                    content: err.message,
                    duration: 5,
                    className: 'custom-postion',
                });
            }
        };
        getStats();
    }, [userId]);
    const manageValues = (data) => {
        let current = [];
        let prev = [];
        let names = [];
        data.forEach((item) => {
            current.push(item["current_sales"]);
            prev.push(item["prev_sales"]);
            names.push(item["staff_name"].split(" ")[0]);
        });
        setPoints({
            current: [...current].slice(0, 5),
            prev: [...prev].slice(0, 5),
            names: [...names].slice(0, 5),
        });
    };
    return (
        <div className={`${classes["container"]} performance-chart`}>
            <div>{contextHolder}</div>
            <div className={classes["label"]}>Team Performance</div>
            <Chart
                options={options}
                series={options?.series}
                type="bar"
                height={200}
            />
            <div className={classes["status-map"]}>
                <StatusSlot title={"Current"} />
                <StatusSlot title={"Previous"} isGray />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
});

export default connect(mapStateToProps)(TeamPerformanceChart);

const StatusSlot = ({ title, isGray }) => {
    return (
        <div
            className={`${classes["status-container"]} ${
                isGray ? classes["status-container-margin"] : ""
            }`}
        >
            <div className={isGray ? classes["icon-grey"] : classes["icon"]} />
            <div className={isGray ? classes["title-grey"] : classes["title"]}>
                {title}
            </div>
        </div>
    );
};

const getChartOptions = () => {
    return {
        chart: {
            offsetX: 6,
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
            labels: {
                offsetX: -8,
                offsetY: 1,
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
};
