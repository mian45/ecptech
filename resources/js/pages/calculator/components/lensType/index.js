import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import lensIcon from "../../../../../images/calculator/lens.svg";

const LensType = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["sub-container"]}>
                <QuestionIcon icon={lensIcon} />
                <div className={classes["vision-container"]}>
                    <CalculatorHeading title="Lens Type?" />
                    <Radio.Group
                        onChange={() => {}}
                        // value={""}
                        className={classes["radio-group"]}
                    >
                        <CustomRadio
                            label={"Single Vision"}
                            value={"Single Vision"}
                        />
                        <CustomRadio label={"PAL"} value={"PAL"} />
                        <CustomRadio label={"NVF"} value={"NVF"} />
                        <CustomRadio
                            label={"Bifocal/Trifocal"}
                            value={"Bifocal/Trifocal"}
                        />
                    </Radio.Group>
                    <div className={classes["choose-label"]}>Please Choose</div>
                    <Radio.Group
                        onChange={() => {}}
                        // value={""}
                        className={classes["radio-group"]}
                    >
                        <CustomRadio
                            label={"Shamir Autograph 3 SV"}
                            value={"Shamir Autograph 3 SV"}
                        />
                        <CustomRadio
                            label={"Shamir Relax"}
                            value={"Shamir Relax"}
                        />
                    </Radio.Group>
                </div>
            </div>
        </div>
    );
};

export default LensType;
