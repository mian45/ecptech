// import React, { useEffect, useState } from "react";
// import classes from "./styles.module.scss";

// const InvoicesStatsChart = () => {
//     const [maximumValue, setMaximumValue] = useState(0);
//     const [maxBreakpoint, setMaxBreakpoint] = useState(0);
//     console.log("process", process.env.MIX_REACT_APP_URL);
//     useEffect(() => {
//         const maximumPoint = Math.max(
//             ...INVOICES_GRAPH_DATA.map((value) => value?.value)
//         );
//         const maxDecimalValue = Math.ceil(maximumPoint / 100) * 100;
//         setMaximumValue(maximumPoint);
//         setMaxBreakpoint(maxDecimalValue);
//     }, []);

//     console.log("maximum value", maximumValue);
//     console.log("maxBreakpoint value", maxBreakpoint);
//     const getdividerSpace = (index) => {
//         const breakpoint = maxBreakpoint / 6;
//         const breakpointsArray = [];
//         let padding = 0.4;
//         for (let i = 0; i < 7; i++) {
//             if (i === 0) {
//                 // breakpointsArray.push({ index: i, value: breakpoint });
//                 breakpointsArray.push({
//                     index: i,
//                     value: padding,
//                     breakpoint: 0,
//                 });
//             } else {
//                 padding += 12.1;
//                 breakpointsArray.push({
//                     index: i,
//                     value: padding,
//                     breakpoint: breakpointsArray[i - 1].breakpoint + breakpoint,
//                 });
//             }
//         }
//         console.log("breakpointsArray", breakpointsArray);
//         const selectedBar = breakpointsArray.find(
//             (point) => point?.index === index
//         );
//         console.log("selectedBar", selectedBar);
//         return {
//             value: selectedBar?.value,
//             breakpoint: selectedBar.breakpoint,
//         };
//     };

//     return (
//         <div className={classes["container"]}>
//             <div className={classes["label"]}>Invoices</div>
//             {Array(7)
//                 ?.fill(".")
//                 .map((data, index) => {
//                     const { value, breakpoint } = getdividerSpace(index);
//                     return (
//                         <div
//                             className={classes["divider-wrapper"]}
//                             key={index}
//                             style={{
//                                 paddingLeft: `${value}%`,
//                             }}
//                         >
//                             {console.log(
//                                 "getdividerSpace()",
//                                 getdividerSpace(index)
//                             )}
//                             <div className={classes["divider-value"]}>
//                                 {breakpoint.toFixed(0)}
//                             </div>
//                             <div className={classes["divider"]} />
//                         </div>
//                     );
//                 })}

//             {INVOICES_GRAPH_DATA?.map((data, index) => {
//                 return <ProgressSlot data={data} index={index} key={index} />;
//             })}
//         </div>
//     );
// };

// export default InvoicesStatsChart;
// const getProgressValue = (value) => {
//     const maximumValue = Math.max(
//         ...INVOICES_GRAPH_DATA.map((value) => value?.value)
//     );
//     console.log("maximum value", maximumValue);
//     const maxDecimalValue = Math.ceil(maximumValue / 100) * 100;
//     console.log("maxDecimalValue maxDecimalValue", maxDecimalValue);

//     if (maximumValue !== 0) {
//         return `${(value / (maxDecimalValue || 1)) * 100}%`;
//     }
//     return "0%";
// };

// const ProgressSlot = ({ data, index }) => {
//     return (
//         <div className={classes["progress-container"]}>
//             <div
//                 className={classes["bar-label"]}
//                 style={{ color: getColorByIndex(index) }}
//             >
//                 {data?.name}
//             </div>
//             <div className={classes["bar-wrapper"]}>
//                 <div
//                     className={classes["bar"]}
//                     style={{
//                         backgroundColor: getColorByIndex(index),
//                         width: getProgressValue(data?.value),
//                     }}
//                 >
//                     <div className={classes["bar-value"]}>{data?.value}</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const INVOICES_GRAPH_DATA = [
//     {
//         name: "Generated",
//         value: 25,
//     },
//     {
//         name: "Paid In Office",
//         value: 10,
//     },
//     {
//         name: "Paid Online",
//         value: 80,
//     },
//     {
//         name: "Capture Rate",
//         value: 5,
//     },
//     {
//         name: "Un Paid",
//         value: 100,
//     },
// ];

// const getColorByIndex = (index) => {
//     switch (index) {
//         case 0:
//             return "#6FA5CB";
//         case 1:
//             return "#61C77B";
//         case 2:
//             return "#DB8857";
//         case 3:
//             return "#BD57DB";
//         default:
//             return "#CBCBCB";
//     }
// };

import React from "react";
import Chart from "react-apexcharts";
import classes from "./styles.module.scss";

const InvoicesStatsChart = () => {
    const options = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                distributed: true, // this line is mandatory
                borderRadius: 10,
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#6FA5CB", "#61C77B", "#DB8857", "#BD57DB", "#CBCBCB"],
        yaxis: {
            labels: {
                style: {
                    colors: [
                        "#6FA5CB",
                        "#61C77B",
                        "#DB8857",
                        "#BD57DB",
                        "#CBCBCB",
                    ],
                },
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: "end",
            formatter: function (val, opt) {
                // return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                return 0;
            },
            offsetX: 0,
        },
        series: [
            {
                data: [
                    {
                        x: "Generated",
                        y: 10,
                    },
                    {
                        x: "Paid In Office",
                        y: 18,
                    },
                    {
                        x: "Paid Online",
                        y: 13,
                    },
                    {
                        x: "Capture Rate",
                        y: 130,
                    },

                    {
                        x: "Un Paid",
                        y: 130,
                    },
                ],
            },
        ],
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["label"]}>Invoices</div>
            <Chart
                options={options}
                series={options.series}
                type="bar"
                height={200}
            />
        </div>
    );
};
export default InvoicesStatsChart;
