import React, { useEffect,useState } from "react";
import Chart from "react-apexcharts";
import classes from "./styles.module.scss";
import Axios from "../../../Http";
import { connect } from "react-redux";
import dayjs from "dayjs";

const ProfitStatsChart = ({ userId , dates}) => {
    const {startDate,endDate} = dates
    const options = getChartOptions();
    const [data,setData]=useState([])
    const [startTag,setStartTag]=useState("")
    const [endTag,setEndTag]=useState("")
    const getProfitStats = async () => {
        try {
            const formData= new FormData();
            console.log("the date is here",`${dayjs(dates.startDate).format("DD/MM/YYYY")}`)
            formData.append("start_date",`${dayjs(startDate).format("MM/DD/YYYY")}`)
            formData.append("end_date",`${dayjs(endDate).format("MM/DD/YYYY")}`)
            
            const res = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/profit-comparison",
                formData
            );
        if(res.data.statusCode===200){
            if(res?.data?.data?.range?.length>0){
                const newData= res?.data?.data?.range.map((item,index)=>{
                    return item.total
                })
                setData(newData)
                setStartTag(res?.data?.data?.range[0]?.date)
                setEndTag(res?.data?.data?.range[res?.data?.data?.range.length-1]?.date)
            }

        }
        } catch (err) {
            console.log("Error while getting profit stats", err);
        }
    };
    useEffect(() => {
        console.log(dates)
       
        getProfitStats();
    }, [dates]);

    return (
        <div className={classes["container"]}>
            <div className={classes["label"]}>Profit Comparison</div>
            <Chart
                options={options}
                series={[{data:data}]}
                type="area"
                height={200}
            />
            <div className={classes["y-axis-label"]}>
                <div className={classes["date"]}>{startTag}</div>
                <div className={classes["date"]}>{endTag}</div>
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
