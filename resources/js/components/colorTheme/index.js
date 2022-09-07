import React, { useState } from "react";
import classes from "./style.module.scss";
import CustomToggle from "../customToggle";
import { ThemeTypeEnum } from "../../enum/enum";

const ColorTheme = () => {
    const [toggle, setToggle] = useState(ThemeTypeEnum.light);

    const [themeColor, setThemeColor] = useState("#6FA5CB");
    const handleTogglerChange = () => {
        if (toggle.includes(ThemeTypeEnum.light)) {
            setToggle(ThemeTypeEnum.dark);
        } else {
            setToggle(ThemeTypeEnum.light);
        }
    };
    const handleColorChange = (e) => {
        setThemeColor(e.target.value);
    };
    const handleColorInput = (e) => {
        setThemeColor(e.target.value);
    };
    return (
        <div className={classes.container}>
            <div className={classes.title}>Color Scheme</div>
            <label className={classes.subtitle}>Choose theme color</label>
            <div className={classes["color-wrapper"]}>
                <div>
                    <input
                        className={classes["color-picker"]}
                        type={"color"}
                        onChange={handleColorChange}
                        value={themeColor}
                    />
                </div>
                <input
                    maxLength={7}
                    type={"text"}
                    className={classes["color-input"]}
                    value={themeColor}
                    onChange={handleColorInput}
                />
            </div>

            <label className={classes.subtitle}>Choose theme mode</label>

            <div className={classes["toggle-wrapper"]}>
                <CustomToggle
                    label={[ThemeTypeEnum.light, ThemeTypeEnum.dark]}
                    toggle={!toggle.includes(ThemeTypeEnum.light)}
                    handleTogglerChange={handleTogglerChange}
                />
            </div>
        </div>
    );
};
export default ColorTheme;
