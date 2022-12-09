import React from "react";
import { Col, Radio, Row } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import frameIcon from "../../../../../images/calculator/frame-glass.svg";
import { DrillMountTypeEnum, FrameOrderTypeEnum } from "../../data/enums";
import * as Yup from "yup";
import { AllPlans } from "../../data/plansList";
import { connect } from "react-redux";
import { PLANS } from "../../data/plansJson";
import CalculatorInput from "./components/calculatorInput/calculatorInput";

const FrameOrder = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    isFrame,
    language,
}) => {
    const { values, handleChange } = formProps;
    const frameOrderVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Frame Order"
        )?.visibility;

    const eyemedPlan = AllPlans[language]?.eyemed;
    const frameBenifitYes =
        PLANS[language][values?.visionPlan]?.frameBenifit?.options?.yes;
    const drillMountYes =
        PLANS[language][values?.visionPlan]?.frameOrder?.options?.newFrame
            ?.subQuestion?.options?.yes;
    const drillMountTitle =
        PLANS[language][values?.visionPlan]?.frameOrder?.options?.newFrame
            ?.subQuestion?.question;

    const handleInputChange = (e) => {
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value)) {
            handleChange(e);
        } else if (e.target.value == "") {
            handleChange(e);
        }
    };
    const handleDrillMountChange = (e) => {
        handleChange(e);

        if (
            values?.visionPlan === eyemedPlan &&
            e?.target?.value === drillMountYes
        ) {
            const validationObject = {
                drillMountValue: Yup.string().required(
                    "Drill mount is required"
                ),
            };
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else {
            const validations = { ...calValidations };
            delete validations.drillMountValue;
            setCalValidations({
                ...validations,
            });
        }
    };

    const frameDetails = () => {
        return (
            <>
                <Row className={classes["amount-container"]}>
                    <Col
                        className={classes["amount-sub-container"]}
                        style={{ marginRight: "50px" }}
                    >
                        <div className={classes["sub-label"]}>
                            Retail fee of frame?
                        </div>
                        <div className={classes["input-container"]}>
                            <div className={classes["input-label"]}>$</div>
                            <input
                                className={classes["input"]}
                                type={"text"}
                                onChange={handleInputChange}
                                value={values?.frameRetailFee}
                                id="frameRetailFee"
                                name="frameRetailFee"
                            />
                        </div>
                        <FormikError name={"frameRetailFee"} />
                    </Col>
                    {values?.visionPlan !== "Private Pay" && (
                        <>
                            {!isFrame && (
                                <Col
                                    className={classes["amount-sub-container"]}
                                >
                                    <div className={classes["sub-label"]}>
                                        Frame Contribution?
                                    </div>
                                    <div className={classes["input-container"]}>
                                        <div className={classes["input-label"]}>
                                            $
                                        </div>
                                        <input
                                            className={classes["input"]}
                                            type={"text"}
                                            onChange={handleInputChange}
                                            value={values?.frameContribution}
                                            id="frameContribution"
                                            name="frameContribution"
                                        />
                                    </div>
                                    <FormikError name={"frameContribution"} />
                                </Col>
                            )}{" "}
                        </>
                    )}
                </Row>
                <div className={classes["frame-sub-container"]}>
                    <CalculatorHeading title={drillMountTitle} />
                    <Radio.Group
                        onChange={handleDrillMountChange}
                        value={values?.drillMount}
                        id="drillMount"
                        name="drillMount"
                        className={classes["radio-group"]}
                    >
                        <CustomRadio
                            label={DrillMountTypeEnum.yes}
                            value={DrillMountTypeEnum.yes}
                            active={
                                values?.drillMount === DrillMountTypeEnum.yes
                            }
                        />

                        <CustomRadio
                            label={DrillMountTypeEnum.no}
                            value={DrillMountTypeEnum.no}
                            active={
                                values?.drillMount === DrillMountTypeEnum.no
                            }
                        />
                    </Radio.Group>
                    <FormikError name={"drillMount"} />
                </div>
                {values?.visionPlan === eyemedPlan &&
                    values?.isFrameBenifit === frameBenifitYes &&
                    values?.drillMount === drillMountYes && (
                        <CalculatorInput
                            onChange={handleInputChange}
                            value={values?.drillMountValue}
                            name={"drillMountValue"}
                        />
                    )}
            </>
        );
    };

    const handleActiveIcons = () => {
        if (values?.frameOrderType === FrameOrderTypeEnum.patientOwnFrame) {
            return true;
        } else if (
            values?.frameOrderType === FrameOrderTypeEnum.newFramePurchase
        ) {
            if (
                values?.frameRetailFee &&
                values?.frameContribution &&
                values?.drillMount
            ) {
                return values.visionPlan !== eyemedPlan ||
                    (values.visionPlan === eyemedPlan &&
                        values?.drillMountValue)
                    ? true
                    : false;
            }
            return false;
        }
        return false;
    };

    const handleFrameOrderChange = (e) => {
        handleChange(e);
        if (e?.target?.value === "New Frame Purchase") {
            const validationObject = {
                frameRetailFee: Yup.string().required("Retail fee is required"),
                frameContribution: Yup.string().required(
                    "Contribution is required"
                ),
                drillMount: Yup.string().required("Drill mount is required"),
                drillMountValue: Yup.string().required(
                    "Drill mount is required"
                ),
            };
            if (
                values?.visionPlan === eyemedPlan &&
                values?.drillMount !== drillMountYes
            ) {
                delete validationObject.drillMountValue;
            }
            if (isFrame || values.visionPlan === "Private Pay") {
                delete validationObject.frameContribution;
            }
            delete calValidations.tracingFee;
            delete calValidations.tracingPrice;
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else if (e?.target?.value === "Patient Own Frame") {
            const validations = { ...calValidations };
            delete validations.frameRetailFee;
            delete validations.frameContribution;
            delete validations.drillMount;
            delete validations.drillMountValue;
            validations.tracingFee = Yup.string().required(
                "Tracing Fee is required"
            );
            setCalValidations({
                ...validations,
            });
        }
    };

    return (
        <>
            {frameOrderVisibility ? (
                <Row className={classes["container"]}>
                    <Col sx={0} sm={0} md={5}>
                        <QuestionIcon
                            icon={frameIcon}
                            active={handleActiveIcons()}
                        />
                    </Col>
                    <Col sx={24} sm={24} md={19}>
                        <div className={classes["frame-container"]}>
                            <CalculatorHeading
                                title="Frame Order?"
                                active={handleActiveIcons()}
                            />
                            <Radio.Group
                                onChange={handleFrameOrderChange}
                                value={values?.frameOrderType}
                                id="frameOrderType"
                                name="frameOrderType"
                                className={classes["radio-group"]}
                            >
                                <CustomRadio
                                    label={FrameOrderTypeEnum.newFramePurchase}
                                    value={FrameOrderTypeEnum.newFramePurchase}
                                    active={
                                        values?.frameOrderType ===
                                        FrameOrderTypeEnum.newFramePurchase
                                    }
                                />

                                <CustomRadio
                                    label={FrameOrderTypeEnum.patientOwnFrame}
                                    value={FrameOrderTypeEnum.patientOwnFrame}
                                    active={
                                        values?.frameOrderType ===
                                        FrameOrderTypeEnum.patientOwnFrame
                                    }
                                />
                            </Radio.Group>
                            <FormikError name={"frameOrderType"} />
                            {values?.frameOrderType ===
                                FrameOrderTypeEnum.newFramePurchase &&
                                frameDetails()}
                        </div>
                    </Col>
                </Row>
            ) : null}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(FrameOrder);
