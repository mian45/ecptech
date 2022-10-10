import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";

const CustomCheckbox = ({
    defaultChecked = false,
    onValueChange,
    isDisable,
    label,
    style,
    active,
    labelClass,
    containerClass,
    ...rest
}) => {
    const [isChecked, setCheckedStatus] = useState(defaultChecked || false);

    useEffect(() => {
        setCheckedStatus(defaultChecked);
    }, [defaultChecked]);
    return (
        <div className={`${classes["container"]} ${containerClass}`}>
            <div
                style={{
                    ...style,
                    pointerEvents: isDisable ? "none" : "all",
                }}
                className={classes["checkbox"]}
                onClick={(e) => {
                    if (onValueChange) onValueChange(!isChecked);
                }}
                {...rest}
            >
                {defaultChecked ? <SVG /> : <SVGBlack />}
            </div>
            <div
                className={`${classes["label"]} ${labelClass}`}
                style={{ fontWeight: active ? "bold" : "normal" }}
            >
                {label}
            </div>
        </div>
    );
};

export default CustomCheckbox;

const SVG = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.96"
            height="19.96"
            viewBox="0 0 19.96 19.96"
        >
            <g id="check-icon" transform="translate(-4.5 -4.5)">
                <path
                    id="Path_98"
                    data-name="Path 98"
                    d="M22.8,4.5H6.163A1.662,1.662,0,0,0,4.5,6.163V22.8A1.662,1.662,0,0,0,6.163,24.46H22.8A1.662,1.662,0,0,0,24.46,22.8V6.163A1.662,1.662,0,0,0,22.8,4.5Zm.208,18.089a.417.417,0,0,1-.416.416H6.371a.417.417,0,0,1-.416-.416V6.371a.417.417,0,0,1,.416-.416H22.589a.417.417,0,0,1,.416.416Z"
                    fill="#6FA5CB"
                />
                <path
                    id="Path_99"
                    data-name="Path 99"
                    d="M21.639,13.209l-.915-.941a.2.2,0,0,0-.146-.062h0a.189.189,0,0,0-.146.062l-6.342,6.388-2.308-2.308a.2.2,0,0,0-.291,0l-.925.925a.207.207,0,0,0,0,.3l2.911,2.911a.921.921,0,0,0,.608.3.965.965,0,0,0,.6-.286h.005l6.95-6.986A.222.222,0,0,0,21.639,13.209Z"
                    transform="translate(-1.566 -2.009)"
                    fill="#6FA5CB"
                />
            </g>
        </svg>
    );
};

const SVGBlack = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.96"
            height="19.96"
            viewBox="0 0 19.96 19.96"
        >
            <g id="check-icon" transform="translate(-4.5 -4.5)">
                <path
                    id="Path_98"
                    data-name="Path 98"
                    d="M22.8,4.5H6.163A1.662,1.662,0,0,0,4.5,6.163V22.8A1.662,1.662,0,0,0,6.163,24.46H22.8A1.662,1.662,0,0,0,24.46,22.8V6.163A1.662,1.662,0,0,0,22.8,4.5Zm.208,18.089a.417.417,0,0,1-.416.416H6.371a.417.417,0,0,1-.416-.416V6.371a.417.417,0,0,1,.416-.416H22.589a.417.417,0,0,1,.416.416Z"
                    fill="#000"
                />
            </g>
        </svg>
    );
};
