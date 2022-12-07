import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InvoicesStatsChart from "../components/invoicesStatsChart";
import classes from "./styles.module.scss";
import Axios from "../../js/Http";
import ProfitCard from "../components/profitCard";
import { PROFIT_CARDS_DATA } from "./data/data";
import StaffLogin from "../components/staffLogin";
import HotSellingProducts from "../components/hotSellingProducts";
import StaffListTable from "./components/staffTable";
import TeamPerformanceChart from "./components/teamPerformanceChart";
import ProfitStatsChart from "./components/profitStatsChart";
import AddStaffMembers from "./components/AddStaffMembers";
import { Row, Col, message } from "antd";
const Dashboard = ({ userRole, apiDates, userId }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [invoiceStats, setInvoiceStats] = useState([]);
    const [summaryStats, setSummaryStats] = useState([]);
    useEffect(() => {
        if (userId == null) return;
        const getInvoiceStats = async () => {
            try {
                const invoiceData = {
                    start_date: apiDates.startDate,
                    end_date: apiDates.endDate,
                };
                const res = await Axios.post(
                    process.env.MIX_REACT_APP_URL + "/api/invoice-stats",
                    invoiceData
                );

                const mappedStats = mappedGraphStats(res?.data?.data?.invoice);
                setInvoiceStats(mappedStats);
            } catch (err) {
                setInvoiceStats(DEFAULT_INVOICES_DATA);
                messageApi.open({
                    type: 'error',
                    content: err.message,
                    duration: 5,
                    className: 'custom-postion-error',
                });
            }
        };

        getInvoiceStats();
    }, [apiDates, userId]);

    useEffect(() => {
        if (userId == null) return;
        const getSummaryStats = async () => {
            try {
                const invoiceData = {
                    start_date: apiDates.startDate,
                    end_date: apiDates.endDate,
                };
                const res = await Axios.post(
                    process.env.MIX_REACT_APP_URL + "/api/invoice-summmary",
                    invoiceData
                );
                const mappedSummary = mapSummaryStats(res?.data?.data);
                setSummaryStats(mappedSummary);
            } catch (err) {
                console.log("Error while getting stats");
                messageApi.open({
                    type: "error",
                    content: err.response.data.message,
                    duration: 5,
                    className: 'custom-postion-error',
                });
            }
        };

        getSummaryStats();
    }, [apiDates, userId]);
    return (
        <Row className={classes["container"]} span={24}>
            <div>{contextHolder}</div>
            <Col xs={24} lg={17}>
                <Row
                    className={classes["cards-mapper"]}
                    justify="space-between"
                    align="middle"
                >
                    {PROFIT_CARDS_DATA.map((card, index) => {
                        return (
                            <Col xs={24} md={8} lg={7}>
                                <ProfitCard
                                    key={index}
                                    cartData={card}
                                    stats={summaryStats[index]}
                                />
                            </Col>
                        );
                    })}
                </Row>

                <InvoicesStatsChart data={invoiceStats} />
                <StaffListTable />
                {userRole !== "staff" && <StaffLogin />}
            </Col>
            <Col xs={24} lg={6} className={classes["left-stats"]}>
                <ProfitStatsChart dates={apiDates} />
                <HotSellingProducts />
                <TeamPerformanceChart />
                {userRole !== "staff" && <AddStaffMembers />}
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => ({
    userRole: state.Auth.userRole?.name,
    userId: state.Auth?.user?.id,
});

export default connect(mapStateToProps)(Dashboard);

const mapSummaryStats = (data) => {
    const stats = [
        {
            price: data?.sales?.total_sale,
            diff: data?.sales?.last_range_diff,
        },
        {
            price: data?.estimates?.amount_estimate,
            diff: data?.estimates?.last_range_diff,
        },
        {
            price: data?.orders?.total_paid_orders,
            diff: data?.orders?.last_range_diff,
        },
    ];
    return stats;
};

const DEFAULT_INVOICES_DATA = [
    {
        x: "Generated",
        y: 0,
    },
    {
        x: "Paid In Office",
        y: 0,
    },
    {
        x: "Paid Online",
        y: 0,
    },
    {
        x: "Capture Rate",
        y: 0,
    },

    {
        x: "Un Paid",
        y: 0,
    },
];

const mappedGraphStats = (response) => {
    const payable = response["office_paid"] + response["online_paid"];
    const total = payable / (response["generated"] || 1);
    const percent = Math.floor(total || 0) * 100;

    const stats = [
        {
            x: "Generated",
            y: response["generated"] || 0,
            percentage: "",
        },
        {
            x: "Paid In Office",
            y: response["office_paid"] || 0,
            percentage: response["office_paid_percent"],
        },
        {
            x: "Paid Online",
            y: response["online_paid"] || 0,
            percentage: response["online_paid_percent"],
        },
        {
            x: "Capture Rate",
            y: Math.ceil(percent) || 0,
            percentage: response["capture_rate"],
        },

        {
            x: "Un Paid",
            y: response["unpaid"] || 0,
            percentage: "",
        },
    ];
    return stats;
};
