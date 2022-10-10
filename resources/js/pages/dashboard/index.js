import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as daterange from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import axios from "axios";
import classes from "./styles.module.scss";
import DashboardPage from "../../dashboard-page";

const Dashboard = () => {
    const DateRangePicker = daterange.DateRangePicker;
    dayjs.extend(quarterOfYear);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [label, setLabel] = useState("");
    const [apiDates, setApiDates] = useState({
        startDate: dayjs(new Date()).format("YYYY-MM-DD"),
        endDate: dayjs(new Date()).format("YYYY-MM-DD"),
    });
    useEffect(() => {
        const date1 = dayjs(dayjs(startDate).format("YYYY-MM-DD"));
        const date2 = dayjs(dayjs(endDate).format("YYYY-MM-DD"));
        dayjs.extend(isBetween);
        if (date2.diff(date1, "day", true) == 0) {
            //today/yesterday
            if (dayjs(date1).isSame(dayjs(new Date()).format("YYYY-MM-DD"))) {
                setLabel("Today");
            } else {
                setLabel("Yesterday");
            }
        } else if (date2.diff(date1, "day", true) == 6) {
            //this week/ last week

            if (
                dayjs(dayjs(new Date()).format("YYYY-MM-DD")).isBetween(
                    date1,
                    date2
                )
            ) {
                setLabel("This Week");
            } else {
                setLabel("Last Week");
            }
        } else if (date2.diff(date1, "day", true) == 29) {
            setLabel("This Month");
        } else if (date2.diff(date1, "day", true) == 30) {
            setLabel("Last Month");
        } else if (
            new Date(date1).getFullYear() == new Date().getFullYear() - 1 &&
            new Date(date2).getFullYear() == new Date().getFullYear() - 1
        ) {
            //last Year
            setLabel("Last Year");
        } else {
            // custom
            setLabel("Custom");
        }
        setApiDates({
            startDate: dayjs(startDate).format("YYYY-MM-DD"),
            endDate: dayjs(endDate).format("YYYY-MM-DD"),
        });
    }, [date, startDate, endDate]);
    return (
        <div className={classes["main-container"]}>
            <div className={classes["cal-container"]}>
                <div className={classes["page-label"]}>Dashboard</div>
                <div
                    onClickCapture={() => {
                        setShowDatePicker(!showDatePicker);
                    }}
                    style={{
                        backgroundColor: "#fff",
                        width: "107px",
                        height: "27px",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "10px",
                        justifyContent: "space-evenly",
                        border: "1px solid #E8E8E8",
                    }}
                >
                    <div style={{ fontSize: 17 }}>{label}</div>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        size={17}
                        color="#ccc"
                        style={{ alignSelf: "center" }}
                    />
                </div>
            </div>
            {showDatePicker ? (
                <div
                    style={{
                        boxShadow: "5px 10px 11px 5px #ccc",
                        width: "882px",
                    }}
                >
                    <DateRangePicker
                        onChange={(item) => {
                            setDate([item.selection]);
                            setShowDatePicker(false);
                            setStartDate(item.selection.startDate);
                            setEndDate(item.selection.endDate);
                        }}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={date}
                        direction="horizontal"
                        staticRanges={[
                            ...daterange.defaultStaticRanges,
                            {
                                label: "This Quarter",
                                range: () => ({
                                    startDate: new Date(
                                        dayjs().startOf("quarter").$d
                                    ),
                                    endDate: new Date(
                                        dayjs().endOf("quarter").$d
                                    ),
                                }),
                                isSelected() {
                                    return false;
                                },
                            },
                            {
                                label: "Last Quarter",
                                range: () => ({
                                    startDate: new Date(
                                        new Date().getFullYear(),
                                        Math.floor(new Date().getMonth() / 3) *
                                            3 -
                                            3,
                                        1
                                    ),
                                    endDate: new Date(
                                        new Date(
                                            new Date().getFullYear(),
                                            Math.floor(
                                                new Date().getMonth() / 3
                                            ) *
                                                3 -
                                                3,
                                            1
                                        ).getFullYear(),
                                        new Date(
                                            new Date().getFullYear(),
                                            Math.floor(
                                                new Date().getMonth() / 3
                                            ) *
                                                3 -
                                                3,
                                            1
                                        ).getMonth() + 3,
                                        0
                                    ),
                                }),
                                isSelected() {
                                    return false;
                                },
                            },
                            {
                                label: "Last Year",
                                range: () => ({
                                    startDate: new Date(
                                        `${new Date().getFullYear() - 1}-01-01`
                                    ),
                                    endDate: new Date(
                                        `${new Date().getFullYear() - 1}-12-31`
                                    ),
                                }),
                                isSelected() {
                                    return false;
                                },
                            },
                        ]}
                    />
                </div>
            ) : null}
            <DashboardPage apiDates={apiDates} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
});

export default connect(mapStateToProps)(Dashboard);
