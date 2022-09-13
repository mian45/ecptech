import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InvoicesStatsChart from "../components/invoicesStatsChart";
import classes from "./styles.module.scss";
import Http from "../../js/Http";

const Dashboard = ({}) => {
    const [invoiceStats, setInvoiceStats] = useState([]);
    useEffect(() => {
        const getInvoiceStats = async () => {
            try {
                const invoiceData = {
                    start_date: "2022-08-16",
                    end_date: "2022-09-15",
                };
                const res = await Http.post(
                    process.env.MIX_REACT_APP_URL + "api/invoice-stats",
                    invoiceData
                );

                const mappedStats = mappedGraphStats(res?.data?.data?.invoice);
                setInvoiceStats(mappedStats);
            } catch (err) {
                setInvoiceStats(DEFAULT_INVOICES_DATA);
            }
        };

        getInvoiceStats();
    }, []);
    return (
        <div className={classes["container"]}>
            <div className={classes["left-stats"]}>
                <InvoicesStatsChart data={invoiceStats} />
            </div>
            <div className={classes["right-stats"]}></div>
        </div>
    );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Dashboard);
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
            y:
                Math.floor(
                    (response["office_paid"] + response["online_paid"]) /
                        (response["generated"] || 1)
                ) || 0,
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
