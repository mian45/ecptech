import React, { useState } from "react";
import classes from "./style.module.scss";
import CustomToggle from "../customToggle";
import { SketchPicker } from "react-color";
import { useOuterClick } from "../../hooks/useOuterClick";
import { ThemeTypeEnum } from "../../enum/enum";

const ColorTheme = () => {
    const [toggle, setToggle] = useState(ThemeTypeEnum.light);

    const [colorModal, showColorModal] = useState(false);
    const [themeColor, setThemeColor] = useState("#6FA5CB");
    const handleTogglerChange = () => {
        if (toggle.includes(ThemeTypeEnum.light)) {
            setToggle(ThemeTypeEnum.dark);
        } else {
            setToggle(ThemeTypeEnum.light);
        }
    };
    const handleColorClick = (e) => {
        e.stopPropagation();
        showColorModal(!colorModal);
    };

    const innerRef = useOuterClick((e) => {
        showColorModal(false);
    });
    const handleColorChange = (color) => {
        setThemeColor(color.hex);
    };
    const handleColorInput = (e) => {
        setThemeColor(e.target.value);
    };
    return (
        <div className={classes.container}>
            <div className={classes.title}>Color Scheme</div>
            <label className={classes.subtitle}>Choose theme color</label>
            <div className={classes["color-wrapper"]}>
                <div ref={innerRef}>
                    <div
                        className={classes["color-picker-handle"]}
                        onClick={handleColorClick}
                        style={{ backgroundColor: themeColor }}
                    />
                    {colorModal && (
                        <div className={classes["picker-wrapper"]}>
                            <SketchPicker
                                color={themeColor}
                                onChangeComplete={handleColorChange}
                            />
                        </div>
                    )}
                </div>
                <input
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
