import { Col, Radio, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import classes from "./oneYearWarrenty.module.scss";
import icon from "../../../../../images/calculator/scratchWarrenty.svg";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import QuestionIcon from "../questionIcon";

const OneYearWarrenty = ({ formProps, calculatorObj, language }) => {
    const { values, handleChange } = formProps;
    const warrentyVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "One Year Scratch Warranty"
        )?.visibility;

    const handleActiveFields = () => {
        return values?.isScratchWarrenty ? true : false;
    };

    return (
        <>
            {warrentyVisibility &&
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
                                    title={"One Year Scratch Warranty ?"}
                                    active={handleActiveFields()}
                                />
                                <Radio.Group
                                    onChange={handleChange}
                                    value={values?.isScratchWarrenty}
                                    id="isScratchWarrenty"
                                    name="isScratchWarrenty"
                                    className={classes["custom-radio"]}
                                >
                                    <CustomRadio
                                        label={"Yes"}
                                        value={"Yes"}
                                        active={CompareStrings(
                                            values?.isScratchWarrenty,
                                            "Yes"
                                        )}
                                    />
                                    <CustomRadio
                                        label={"No"}
                                        value={"No"}
                                        active={CompareStrings(
                                            values?.isScratchWarrenty,
                                            "No"
                                        )}
                                    />
                                </Radio.Group>
                                <FormikError name={"isScratchWarrenty"} />
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

export default connect(mapStateToProps)(OneYearWarrenty);
