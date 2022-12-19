import React from "react";
import classes from "./styles.module.scss";

const InvoicesTableHeader = () => {
    return (
        <tr className={classes["t-head"]}>
            <th className={classes["invoice-column"]}>Invoice</th>
            <th className={classes['invoice-second']}>Customer Name</th>
            <th className={classes['invoice-second']}>Email</th>
            <th className={classes['invoice-second']}>Date</th>
            <th className={classes['invoice-second']}>Price</th>
            <th className={classes['invoice-center']}>Status</th>
            <th className={classes["action-column"]}>Action</th>
        </tr>
    );
};

export default InvoicesTableHeader;
