import React, { useState } from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import icon from "../../../../../images/calculator/lens-material.svg";
import EyePrescriptionModal from "../eyePrescriptionModal";

const LensMeterials = ({ formProps }) => {
    const { values, handleChange, handleBlur } = formProps;
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
            <QuestionIcon icon={icon} active={values?.lensMaterial} />
            <div className={classes["vision-container"]}>
                <CalculatorHeading
                    title="Lens Material?"
                    active={values?.lensMaterial}
                />
                <Radio.Group
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.lensMaterial}
                    id="lensMaterial"
                    name="lensMaterial"
                    className={classes["radio-group"]}
                >
                    {LEND_MATERIAL_DATA?.map((lensName, index) => {
                        return (
                            <CustomRadio
                                key={index}
                                label={lensName}
                                value={lensName}
                                headClass={classes["radio"]}
                                active={values?.lensMaterial === lensName}
                            />
                        );
                    })}
                </Radio.Group>
                <FormikError name={"lensMaterial"} />
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

const LEND_MATERIAL_DATA = [
    "CR39",
    "Polycarbonate",
    "Trivex",
    "Hi Index 1.67",
    "Hi Index 1.70 & Above",
    "Hi Index 1.60",
];
