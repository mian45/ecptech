import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";

const InvoicesStatsChart = () => {
    const [maximumValue, setMaximumValue] = useState(0);
    const [maxBreakpoint, setMaxBreakpoint] = useState(0);
    useEffect(() => {
        const maximumPoint = Math.max(
            ...INVOICES_GRAPH_DATA.map((value) => value?.value)
        );
        const maxDecimalValue = Math.ceil(maximumPoint / 100) * 100;
        setMaximumValue(maximumPoint);
        setMaxBreakpoint(maxDecimalValue);
    }, []);

    console.log("maximum value", maximumValue);
    console.log("maxBreakpoint value", maxBreakpoint);
    const getdividerSpace = (index) => {
        const breakpoint = maxBreakpoint / 5;
        const breakpointsArray = [];
        for (let i = 0; i < 5; i++) {
            if (i === 0) {
                breakpointsArray.push({ index: i, value: breakpoint });
            } else {
                breakpointsArray.push({
                    index: i,
                    value: breakpointsArray[i - 1].value + breakpoint,
                });
            }
        }
        console.log("breakpointsArray", breakpointsArray);
        const selectedBar = breakpointsArray.find(
            (point) => point?.index === index
        );
        console.log("selectedBar", selectedBar);
        return selectedBar?.value;
    };

    return (
        <div className={classes["container"]}>
            <div className={classes["label"]}>Invoices</div>
            {INVOICES_GRAPH_DATA?.map((data, index) => {
                return (
                    <div
                        className={classes["divider-wrapper"]}
                        key={index}
                        style={{ paddingLeft: `${getdividerSpace(index)}px` }}
                    >
                        {console.log(
                            "getdividerSpace()",
                            getdividerSpace(index)
                        )}
                        <div className={classes["divider-value"]}>50</div>
                        <div className={classes["divider"]} />
                    </div>
                );
            })}

            {INVOICES_GRAPH_DATA?.map((data, index) => {
                return <ProgressSlot data={data} index={index} key={index} />;
            })}
        </div>
    );
};

export default InvoicesStatsChart;
const getProgressValue = (value) => {
    const maximumValue = Math.max(
        ...INVOICES_GRAPH_DATA.map((value) => value?.value)
    );

    if (maximumValue !== 0) {
        return `${(value / (maximumValue || 1)) * 100}%`;
    }
    return "0%";
};

const ProgressSlot = ({ data, index }) => {
    return (
        <div className={classes["progress-container"]}>
            <div
                className={classes["bar-label"]}
                style={{ color: getColorByIndex(index) }}
            >
                {data?.name}
            </div>
            <div className={classes["bar-wrapper"]}>
                <div
                    className={classes["bar"]}
                    style={{
                        backgroundColor: getColorByIndex(index),
                        width: getProgressValue(data?.value),
                    }}
                >
                    <div className={classes["bar-value"]}>{data?.value}</div>
                </div>
            </div>
        </div>
    );
};

const INVOICES_GRAPH_DATA = [
    {
        name: "Generated",
        value: 285,
    },
    {
        name: "Paid In Office",
        value: 180,
    },
    {
        name: "Paid Online",
        value: 80,
    },
    {
        name: "Capture Rate",
        value: 5,
    },
    {
        name: "Un Paid",
        value: 52,
    },
];

const getColorByIndex = (index) => {
    switch (index) {
        case 0:
            return "#6FA5CB";
        case 1:
            return "#61C77B";
        case 2:
            return "#DB8857";
        case 3:
            return "#BD57DB";
        default:
            return "#CBCBCB";
    }
};
