import React from "react";
import { Col, Radio, Row } from "antd";
import QuestionIcon from "../questionIcon";
import classes from "./styles.module.scss";
import tickIcon from "../../../../../images/tick-green.svg";
import CustomRadio from "../../../../components/customRadio";
import visionIcon from "../../../../../images/calculator/vision.svg";
import { ErrorMessage } from "formik";
import { BenifitTypeEnums } from "../../data/initialValues";
import * as Yup from "yup";
import Axios from "../../../../Http";
import { CreateCalculatorValidations } from "../../data/validationHelper";
import { useDispatch } from "react-redux";
import * as action from "../../../../store/actions";
const SelectVisionPlan = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    setCalculatorObj,
    setCalculatorState,
    setValidationsList,
    validationsList,
    setDefaultValues,
    defaultValues,
    setDavisMaterials,
}) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const plansList = calculatorObj?.questions?.map((plan) => plan?.title);
    const dispatch= useDispatch()
    const handlePlanClick = async (value) => {
        try {
            const currentPlan = calculatorObj?.questions?.find(
                (item) => item?.title === value.target?.value || ""
            );
            console.log('currentPlan',currentPlan)
            dispatch(action.calculatorPopUp(currentPlan))
            const res = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/get-collections",
                { vision_plan_id: currentPlan?.id }
            );
            calculatorObj.lens_types = res?.data?.data?.collection;
            calculatorObj.additional_lense_setting = [];
            if (
                value.target?.value === "Eyemed" ||
                value.target?.value === "Davis Vision"
            ) {
                calculatorObj.additional_lense_setting =
                    res?.data?.data?.additional_lense_setting;
            }
            setDavisMaterials(res?.data?.data?.lense_materials || []);
            setCalculatorObj(calculatorObj);
        } catch (err) {
            console.log("error while get collections....");
        }
    };
    const handlePlanChange = async (event) => {
        await handlePlanClick(event);

        await setValidationsList({
            ...validationsList,
            [values.visionPlan]: { ...calValidations },
        });
        await setDefaultValues({
            ...defaultValues,
            [values.visionPlan]: { ...values },
        });
        await setCalculatorState(defaultValues[event?.target?.value]);
        await setCalValidations({ ...validationsList[event?.target?.value] });
    };

    const visionPlan = () => {
        return (
            <Row className={classes["container"]}>
                <Col xs={24} sm={24} md={5} lg={5}>
                    <QuestionIcon
                        icon={visionIcon}
                        active={values?.visionPlan}
                    />
                </Col>

                <Col xs={24} sm={24} md={19} lg={19}>
                    <div className={classes["vision-container"]}>
                        <CalculatorHeading
                            title="Select Vision Plan"
                            active={values?.visionPlan}
                        />
                        <Radio.Group
                            onChange={handlePlanChange}
                            value={values?.visionPlan}
                            className={classes["radio-group"]}
                            id="visionPlan"
                            name="visionPlan"
                        >
                            {plansList?.map((plan, index) => {
                                return (
                                    <CustomRadio
                                        headClass={classes["radio"]}
                                        key={index}
                                        label={plan}
                                        value={plan}
                                        active={values?.visionPlan === plan}
                                    />
                                );
                            })}
                        </Radio.Group>
                        <FormikError name={"visionPlan"} />
                    </div>
                </Col>
            </Row>
        );
    };
    const renderVisionPlan = () => {
        const permission = calculatorObj?.questions
            ?.find((item) => item.title === values?.visionPlan)
            ?.question_permissions?.find(
                (ques) => ques.question === "Select Vision Plan"
            )?.visibility;
        if (permission) return visionPlan();
        else {
            return null;
        }
    };
    return renderVisionPlan();
};

export default SelectVisionPlan;

export const CalculatorHeading = ({ title, active }) => {
    return (
        <div className={classes["heading"]}>
            <span>{title}</span>{" "}
            {active && (
                <img
                    src={tickIcon}
                    alt="icon"
                    className={classes["green-icon"]}
                />
            )}
        </div>
    );
};

export const FormikError = ({ name }) => {
    return (
        <ErrorMessage
            name={name}
            component="div"
            className={classes["error"]}
        />
    );
};
