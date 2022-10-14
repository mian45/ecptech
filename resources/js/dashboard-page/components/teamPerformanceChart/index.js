import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import classes from "./styles.module.scss";
import Axios from "../../../Http";
import { connect } from "react-redux";

const TeamPerformanceChart = (userId) => {
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
        <div className={classes["status-container"]}>
            <div className={isGray ? classes["icon-grey"] : classes["icon"]} />
            <div className={isGray ? classes["title-grey"] : classes["title"]}>
                {title}
            </div>
        </div>
    );
};

const getChartOptions = (data) => {
    return {
        series: [
            {
                name: "Current",
                data: data?.current || [],
            },
            {
                name: "Previous",
                data: data?.prev || [],
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
            categories: data?.names || [],
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
};
