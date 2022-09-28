import React, { useEffect,useState } from "react";
import Chart from "react-apexcharts";
import classes from "./styles.module.scss";
import Axios from "../../../Http";
import { connect } from "react-redux";

const ProfitStatsChart = ({ userId }) => {
    const options = getChartOptions();
    const [data,setData]=useState()
    const getProfitStats = async () => {
        console.log("the data in the charts are here",options.series)
        try {
            const payload = {
                start_date: "2022-08-16",
                end_date: "2022-09-15",
                user_id: userId,
            };
            const res = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/profit-comparison",
                payload
            );
            console.log("res chart data", res);
        } catch (err) {
            console.log("Error while getting profit stats", err);
        }
    };
    useEffect(() => {
       
        getProfitStats();
    }, []);

    return (
        <div className={classes["container"]}>
            <div className={classes["label"]}>Profit Comparison</div>
            <Chart
                options={options}
                series={[{data:[150,23,25]}]}
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

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
});

export default connect(mapStateToProps)(ProfitStatsChart);

const getChartOptions = () => {
    return {
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
};
