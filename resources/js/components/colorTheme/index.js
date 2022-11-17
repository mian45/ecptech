import React from "react";
import classes from "./style.module.scss";
import CustomToggle from "../customToggle";
import { ThemeTypeEnum } from "../../enum/enum";
import { ErrorMessage } from "formik";

const ColorTheme = ({ values, setFieldValue, handleChange }) => {
    const handleTogglerChange = () => {
        if (values.themeType === 0) {
            setFieldValue("themeType", 1);
        } else {
            setFieldValue("themeType", 0);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.title}>Color Scheme</div>
            <label className={classes.subtitle}>Choose theme color</label>
            <div className={classes["color-wrapper"]}>
                <div className={classes["color-picker-wrapper"]}>
                    <input
                        className={classes["color-picker"]}
                        type={"color"}
                        onChange={handleChange}
                        value={values?.themeColor}
                        id="themeColor"
                        name="themeColor"
                    />
                </div>
                <input
                    maxLength={7}
                    type={"text"}
                    className={classes["color-input"]}
                    value={values?.themeColor}
                    onChange={handleChange}
                    id="themeColor"
                    name="themeColor"
                />
            </div>
            <ErrorMessage
                name="themeColor"
                component="div"
                className={classes["error"]}
            />

            <label className={classes.subtitle}>Choose theme mode</label>

            <div className={classes["toggle-wrapper"]}>
                <CustomToggle
                    label={[ThemeTypeEnum.light, ThemeTypeEnum.dark]}
                    toggle={values.themeType === 1}
                    handleTogglerChange={handleTogglerChange}
                />
            </div>
        </div>
    );
};
export default ColorTheme;
