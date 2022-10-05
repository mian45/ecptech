import React from "react";
import classes from "./styles.module.scss";

const StaffTableBodySlot = ({ data }) => {
    return (
        <tr className={classes["container"]}>
            <td className={classes["name"]}>{data && data["staff_name"]}</td>
            <td>{data && data["total_sales"]}</td>
            <td>{data && data["paid_in_office"]}</td>
            <td>{data && data["paid_online"]}</td>
            <td>{data && data["reminder_sent"]}</td>
            <td>{data && data["capture_rate"]}</td>
        </tr>
    );
};

export default StaffTableBodySlot;
