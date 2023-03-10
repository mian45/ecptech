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
import classes from "./styles.module.scss";
import DashboardPage from "../../dashboard-page";
import { Col } from "antd";
import ButtonComponent from "../../components/Button";
import { useHistory } from "react-router";

const Dashboard = () => {
    const history = useHistory();
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
        } else if (
            new Date().getMonth() === new Date(date1).getMonth() &&
            new Date(date1).getMonth() === new Date(date2).getMonth()
        ) {
            setLabel("This Month");
        } else if (
            new Date().getMonth() !== new Date(date1).getMonth() &&
            new Date(date1).getMonth() === new Date(date2).getMonth()
        ) {
            setLabel("Last Month");
        } else if (
            new Date(date1).getFullYear() == new Date().getFullYear() - 1 &&
            new Date(date2).getFullYear() == new Date().getFullYear() - 1
        ) {
            setLabel("Last Year");
        } else if (
            new Date(endDate).getMonth() - new Date(startDate).getMonth() ==
            2
        ) {
            if (
                new Date(startDate).getMonth() <= new Date().getMonth() &&
                new Date().getMonth() <= new Date(endDate).getMonth()
            ) {
                setLabel("This Quarter");
            } else {
                setLabel("Last Quarter");
            }
        } else {
            setLabel("Custom");
        }
        setApiDates({
            startDate: dayjs(startDate).format("YYYY-MM-DD"),
            endDate: dayjs(endDate).format("YYYY-MM-DD"),
        });
    }, [date, startDate, endDate]);
    const staticRanges = [
        ...daterange.defaultStaticRanges,
        {
            label: "This Quarter",
            range: () => ({
                startDate: new Date(dayjs().startOf("quarter").$d),
                endDate: new Date(dayjs().endOf("quarter").$d),
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
                    Math.floor(new Date().getMonth() / 3) * 3 - 3,
                    1
                ),
                endDate: new Date(
                    new Date(
                        new Date().getFullYear(),
                        Math.floor(new Date().getMonth() / 3) * 3 - 3,
                        1
                    ).getFullYear(),
                    new Date(
                        new Date().getFullYear(),
                        Math.floor(new Date().getMonth() / 3) * 3 - 3,
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
                startDate: new Date(`${new Date().getFullYear() - 1}-01-01`),
                endDate: new Date(`${new Date().getFullYear() - 1}-12-31`),
            }),
            isSelected() {
                return false;
            },
        },
    ];
    return (
        <div className={classes["main-container"]}>
            <div className={classes["date-container"]}>
                <div className={classes["cal-container"]}>
                    <div className={classes["page-label"]}>Dashboard</div>
                    <div
                        onClickCapture={() => {
                            setShowDatePicker(!showDatePicker);
                        }}
                        className={classes["date-selector"]}
                    >
                        <div className={classes["date-label"]}>{label}</div>
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            size={"1x"}
                            color="#ccc"
                            style={{ alignSelf: "center" }}
                        />
                    </div>
                </div>
                {showDatePicker ? (
                    <div
                        className={classes["backdrop"]}
                        onClick={() => {
                            setShowDatePicker(false);
                        }}
                    >
                        <div
                            className={classes["picker-container"]}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Col xs={24}>
                                <DateRangePicker
                                    className="picker"
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
                                    direction={
                                        window.innerWidth <= 1024
                                            ? "vertical"
                                            : "horizontal"
                                    }
                                    staticRanges={staticRanges}
                                    inputRanges={[]}
                                />
                            </Col>
                        </div>
                    </div>
                ) : null}
                <ButtonComponent
                    className={classes["invoice-button"]}
                    type={"button"}
                    onClick={() => history.push("/invoices")}
                >
                    Create New Estimate
                </ButtonComponent>
            </div>
            <DashboardPage apiDates={apiDates} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
});

export default connect(mapStateToProps)(Dashboard);
