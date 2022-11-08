import React from "react";
import classes from "./styles.module.scss";
import upIcon from "../../../images/up-graph.svg";
import downIcon from "../../../images/down-graph.svg";
import { Col, Row } from "antd";

const ProfitCard = ({ cartData, stats }) => {
    return (
        <Row justify={window.innerWidth>763?"start":"center"} align={window.innerWidth<763?"middle":""} className={`${classes["container"]} ${window.innerWidth>763?classes['margin-desktop']:''}`}>
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
                            stats?.diff[0] == 0 || stats?.diff[0] == "+"
                                ? "#61C77B"
                                : "#FF0000",
                    }}
                >
                    {stats?.diff} from last month
                </div>
            </div>
        </Row>
    );
};

export default ProfitCard;
