import React from "react";
import classes from "./styles.module.scss";

const InvoicesTableHeader = () => {
    return (
        <tr className={classes["t-head"]}>
            <th className={classes["invoice-column"]}>Invoice</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
            <th className={classes["action-column"]}>Action</th>
        </tr>
    );
};

export default InvoicesTableHeader;
