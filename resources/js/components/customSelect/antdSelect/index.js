import React from "react";
import "./styles.scss";
import { Select } from "antd";
import downIcon from "../../../../images/down-arrow.png";

const { Option } = Select;

const AntdSelect = ({ options, ...rest }) => {
    return (
        <Select
            className={`select ${rest.className}`}
            suffixIcon={
                <img src={downIcon} alt="icon" className="icon-select-class" />
            }
            {...rest}
        >
            {Object.keys(options).map((option, index) => {
                return (
                    <Option value={option} key={index}>
                        {options[option]}
                    </Option>
                );
            })}
        </Select>
    );
};

export default AntdSelect;
