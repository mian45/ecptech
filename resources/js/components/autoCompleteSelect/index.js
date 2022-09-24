import React from "react";
import classes from "./styles.module.scss";
import { AutoComplete, Input } from "antd";
import downIcon from "../../../images/down-arrow.png";

const AutoCompleteSelect = ({
    placeholder,
    className,
    options = [],
    ...rest
}) => {
    return (
        <AutoComplete
            options={options}
            filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
            }
            {...rest}
        >
            <Input
                suffix={
                    <img
                        src={downIcon}
                        alt={"icon"}
                        className={classes["arrow-icon"]}
                    />
                }
                className={`${classes["ant-input"]} ${className}`}
                placeholder={placeholder || "placeholder"}
            />
        </AutoComplete>
    );
};

export default AutoCompleteSelect;
