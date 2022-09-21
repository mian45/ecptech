import React from "react";
import classes from "./styles.module.scss";

const StaffTableHeader = () => {
    return (
        <tr>
            <th className={classes["invoice-column"]}>STAFF NAME</th>
            <th>TOTAL SALES</th>
            <th>PAID IN OFFICE</th>
            <th>PAID ONLINE</th>
            <th>REMINDERS SENT</th>
            <th className={classes["action-column"]}>CAPTURE RATE</th>
        </tr>
    );
};

export default StaffTableHeader;
