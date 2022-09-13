import React from "react";
import classes from "./styles.module.scss";
import upIcon from "../../../images/up-graph.svg";
import downIcon from "../../../images/down-graph.svg";

const ProfitCard = ({ cartData, stats }) => {
    return (
        <div className={classes["container"]}>
            <img
                src={cartData.icon}
                alt={"profile-icon"}
                className={classes["icon"]}
            />
            <div className={classes["title"]}>{cartData.title}</div>
            <div className={classes["price"]}>{stats?.price}</div>
            <div className={classes["tag-wrapper"]}>
                <img
                    src={
                        stats?.diff[0] == 0 || stats?.diff[0] == "+"
                            ? upIcon
                            : downIcon
                    }
                    alt={"graph-icon"}
                    className={classes["graph-icon"]}
                />
                <div
                    className={classes["tag-line"]}
                    style={{
                        color:
                            stats?.diff[0] == 0 || stats?.diff[0]
                                ? "#61C77B"
                                : "#61C77B",
                    }}
                >
                    {stats?.diff} from last month
                </div>
            </div>
        </div>
    );
};

export default ProfitCard;
