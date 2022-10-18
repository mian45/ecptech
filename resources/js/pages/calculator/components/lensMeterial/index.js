import React, { useState } from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import icon from "../../../../../images/calculator/lens-material.svg";
import EyePrescriptionModal from "../eyePrescriptionModal";

const LensMeterials = ({ formProps, calculatorObj }) => {
    const { values, handleChange, handleBlur } = formProps;
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const lensMaterialVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Lens Material"
        )?.visibility;

    const handleLensMererialChange = (e) => {
        handleChange(e);
        if (values.isCopayPolycarbonate && e.target.value !== "Polycarbonate") {
            setError("Are you sure you don't want to avail the discount");
        } else if (
            values.isCopayHighIndex &&
            e.target.value.includes("Hi Index")
        ) {
            setError("Are you sure you don't want to avail the discount");
        } else {
            setError("");
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <>
            {lensMaterialVisibility ? (
                <div className={classes["container"]}>
                    {showModal && (
                        <EyePrescriptionModal onClose={handleCloseModal} />
                    )}
                    <QuestionIcon icon={icon} active={values?.lensMaterial} />
                    <div className={classes["vision-container"]}>
                        <CalculatorHeading
                            title="Lens Material?"
                            active={values?.lensMaterial}
                        />
                        <Radio.Group
                            onBlur={handleBlur}
                            onChange={handleLensMererialChange}
                            value={values?.lensMaterial}
                            id="lensMaterial"
                            name="lensMaterial"
                            className={classes["radio-group"]}
                        >
                            {calculatorObj["lens_material"]?.map(
                                (lensName, index) => {
                                    return (
                                        <CustomRadio
                                            key={index}
                                            label={
                                                lensName?.lens_material_title
                                            }
                                            value={
                                                lensName?.lens_material_title
                                            }
                                            headClass={classes["radio"]}
                                            active={
                                                values?.lensMaterial ===
                                                lensName?.lens_material_title
                                            }
                                        />
                                    );
                                }
                            )}
                        </Radio.Group>
                        <FormikError name={"lensMaterial"} />
                        {error && (
                            <div className={classes["error"]}>{error}</div>
                        )}
                        <div className={classes["tagline-box"]}>
                            <span
                                className={classes["tagline"]}
                                onClick={handleOpenModal}
                            >
                                Click here
                            </span>
                            <span>
                                to input Rx to determine optimal lens material
                                for your patient's glasses
                            </span>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
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
