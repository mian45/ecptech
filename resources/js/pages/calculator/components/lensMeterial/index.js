import React, { useState } from "react";
import { Col, Radio, Row } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import icon from "../../../../../images/calculator/lens-material.svg";
import EyePrescriptionModal from "../eyePrescriptionModal";

const LensMeterials = ({ formProps, calculatorObj }) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const lensMaterialVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Lens Material"
        )?.visibility;

    const getActiveMaterials = (material) => {
        const lensType = calculatorObj?.lens_types?.find(
            (item) => item?.title === values?.lensType
        );

        let activeMaterials = [];
        lensType?.brands?.forEach((item) => {
            item?.collections?.forEach((val) => {
                if (val?.display_name) {
                    if (val?.display_name == values?.lensTypeValue) {
                        activeMaterials = val?.lenses;
                    }
                } else {
                    if (val?.title == values?.lensTypeValue) {
                        activeMaterials = val?.lenses;
                    }
                }
            });
        });

        let isMaterialFound = true;

        isMaterialFound = activeMaterials?.some(
            (item) =>
                item?.lens_material_title?.toLowerCase() ===
                material?.toLowerCase()
        );
        return activeMaterials?.length > 0 ? !isMaterialFound : false;
    };

    const handleLensMererialChange = (e) => {
        let currentValue = "";
        if (isLenseTitle(e.target.value)) {
            currentValue = e.target.value;
            handleChange(e);
        } else {
            const selectedMaterial = calculatorObj["lens_material"]?.find(
                (item) => item?.lens_material_title === e?.target?.value
            );
            setFieldValue(
                "lensMaterial",
                selectedMaterial?.lens_material_title
            );
            currentValue = selectedMaterial?.lens_material_title;
        }

        if (values.isCopayPolycarbonate && e.target.value !== "Polycarbonate") {
            setError("Are you sure you don't want to avail the discount");
        } else if (
            values.isCopayHighIndex &&
            !e.target.value.toLowerCase().includes("Hi Index".toLowerCase())
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

    const getMaterialName = (material) => {
        if (!!material?.display_name) {
            return material?.display_name;
        } else {
            return material?.lens_material_title;
        }
    };

    return (
        <>
            {lensMaterialVisibility ? (
                <Row className={classes["container"]}>
                    {showModal && (
                        <EyePrescriptionModal
                            onClose={handleCloseModal}
                            onOpen={showModal}
                        />
                    )}
                    <Col sx={0} sm={0} md={5}>
                        <QuestionIcon
                            icon={icon}
                            active={values?.lensMaterial}
                        />
                    </Col>
                    <Col sx={24} sm={24} md={19}>
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title="Lens Material?"
                                active={values?.lensMaterial}
                            />
                            <Radio.Group
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
                                                label={getMaterialName(
                                                    lensName
                                                )}
                                                value={
                                                    lensName?.lens_material_title
                                                }
                                                headClass={classes["radio"]}
                                                active={
                                                    values?.lensMaterial ===
                                                    lensName?.lens_material_title
                                                }
                                                disabled={getActiveMaterials(
                                                    lensName?.lens_material_title
                                                )}
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
                                    to input Rx to determine optimal lens
                                    material for your patient's glasses
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            ) : null}
        </>
    );
};

export default LensMeterials;
const isLenseTitle = (value) => {
    switch (value) {
        case "CR39":
        case "Polycarbonate":
        case "Trivex":
        case "Hi Index 1.67":
        case "Hi Index 1.70 & Above":
        case "Hi Index 1.60":
            return true;

        default:
            return false;
    }
};
