import { Col, Radio, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import classes from "./uvCoating.module.scss";
import icon from "../../../../../images/calculator/uvCoating.svg";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import QuestionIcon from "../questionIcon";

const UVCoating = ({ formProps, calculatorObj, language }) => {
    const { values, handleChange } = formProps;
    const uvVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "UV Coating"
        )?.visibility;

    const handleActiveFields = () => {
        return values?.uvCoating ? true : false;
    };

    return (
        <>
            {uvVisibility && CompareStrings(values?.visionPlan, "Spectra") && (
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
                                title={"UV Coating ?"}
                                active={handleActiveFields()}
                            />
                            <Radio.Group
                                onChange={handleChange}
                                value={values?.uvCoating}
                                id="uvCoating"
                                name="uvCoating"
                                className={classes["custom-radio"]}
                            >
                                <CustomRadio
                                    label={"Yes"}
                                    value={"Yes"}
                                    active={CompareStrings(
                                        values?.uvCoating,
                                        "Yes"
                                    )}
                                />
                                <CustomRadio
                                    label={"No"}
                                    value={"No"}
                                    active={CompareStrings(
                                        values?.uvCoating,
                                        "No"
                                    )}
                                />
                            </Radio.Group>
                            <FormikError name={"uvCoating"} />
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

export default connect(mapStateToProps)(UVCoating);
