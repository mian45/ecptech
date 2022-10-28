import React from "react";
import { Input, InputNumber } from "antd";
import classes from "./styles.module.scss";

const AntInput = ({ category, ...rest }) => {
    switch (category) {
        case "number":
            return <NumberInput {...rest} />;

        default:
            return <TextInput {...rest} />;
    }
};

export default AntInput;

const TextInput = ({ className, ...rest }) => {
    return (
        <Input className={`${classes["input-field"]} ${className}`} {...rest} />
    );
};
const NumberInput = ({ className, ...rest }) => {
    return (
        <InputNumber
            className={`${classes["input-field-number"]} ${className}`}
            {...rest}
        />
    );
};
