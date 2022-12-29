import { Col, Radio, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import classes from "./scratchCoating.module.scss";
import icon from "../../../../../images/calculator/scratchCoating.svg";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import QuestionIcon from "../questionIcon";

const ScratchCoating = ({ formProps, calculatorObj, language }) => {
    const { values, handleChange } = formProps;
    const scratchVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Scratch Coating"
        )?.visibility;

    const handleActiveFields = () => {
        return values?.scratchCoating ? true : false;
    };

    return (
        <>
            {scratchVisibility &&
                CompareStrings(values?.visionPlan, "Spectra") && (
                    <Row className={classes["container"]}>
                        <Col xs={24} sm={24} md={5} lg={5}>
                            <QuestionIcon
                                icon={icon}
                                active={handleActiveFields()}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={19} lg={19}>
                            <div className={classes["vision-container"]}>
                                <CalculatorHeading
                                    title={"Scratch Coating ?"}
                                    active={handleActiveFields()}
                                />
                                <Radio.Group
                                    onChange={handleChange}
                                    value={values?.scratchCoating}
                                    id="scratchCoating"
                                    name="scratchCoating"
                                    className={classes["custom-radio"]}
                                >
                                    <CustomRadio
                                        label={"Yes"}
                                        value={"Yes"}
                                        active={CompareStrings(
                                            values?.scratchCoating,
                                            "Yes"
                                        )}
                                    />
                                    <CustomRadio
                                        label={"No"}
                                        value={"No"}
                                        active={CompareStrings(
                                            values?.scratchCoating,
                                            "No"
                                        )}
                                    />
                                </Radio.Group>
                                <FormikError name={"scratchCoating"} />
                            </div>
                        </Col>
                    </Row>
                )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(ScratchCoating);
