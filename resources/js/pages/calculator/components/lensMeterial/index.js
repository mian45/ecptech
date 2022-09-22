import React, { useState } from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import icon from "../../../../../images/calculator/lens-material.svg";
import EyePrescriptionModal from "../eyePrescriptionModal";

const LensMeterials = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div className={classes["container"]}>
            {showModal && <EyePrescriptionModal onClose={handleCloseModal} />}
            <QuestionIcon icon={icon} />
            <div className={classes["vision-container"]}>
                <CalculatorHeading title="Lens Material?" />
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio
                        label={"CR39"}
                        value={"CR39"}
                        headClass={classes["radio"]}
                    />
                    <CustomRadio
                        label={"Polycarbonate"}
                        value={"Polycarbonate"}
                        headClass={classes["radio"]}
                    />
                    <CustomRadio
                        label={"Trivex"}
                        value={"Trivex"}
                        headClass={classes["radio"]}
                    />
                    <CustomRadio
                        label={"Hi Index 1.67"}
                        value={"Hi Index 1.67"}
                        headClass={classes["radio"]}
                    />
                    <CustomRadio
                        label={"Hi Index 1.70 & Above"}
                        value={"Hi Index 1.70 & Above"}
                        headClass={classes["radio"]}
                    />
                    <CustomRadio
                        label={"Hi Index 1.60"}
                        value={"Hi Index 1.60"}
                        headClass={classes["radio"]}
                    />
                </Radio.Group>
                <div className={classes["tagline-box"]}>
                    <span
                        className={classes["tagline"]}
                        onClick={handleOpenModal}
                    >
                        Click here
                    </span>
                    <span>
                        to input Rx to determine optimal lens material for your
                        patient's glasses
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LensMeterials;
