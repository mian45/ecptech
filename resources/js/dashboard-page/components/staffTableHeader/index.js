import React from "react";
import classes from "./styles.module.scss";

const StaffTableHeader = () => {
    return (
        <tr>
            <th className={classes["invoice-column"]}>STAFF NAME</th>
            <th className={classes["invoice-column-text"]}>TOTAL SALES</th>
            <th className={classes["invoice-column-text"]}>PAID IN OFFICE</th>
            <th className={classes["invoice-column-text"]}>PAID ONLINE</th>
            <th className={classes["invoice-column-text"]}>REMINDERS SENT</th>
            <th className={classes["action-column"]}>CAPTURE RATE</th>
        </tr>
    );
};

export default StaffTableHeader;
