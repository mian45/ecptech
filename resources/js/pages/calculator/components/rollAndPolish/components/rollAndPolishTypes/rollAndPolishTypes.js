import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./rollAndPolishTypes.module.scss";

const RollAndPolishTypes = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange } = formProps;

    const getRollAndPolishTypesList = () => {
        return (
            calculatorObj?.addons
                ?.find((plan) => plan?.title === values?.visionPlan)
                ?.addon_types?.find((item) => item?.title === "Roll & Polish")
                ?.addons || []
        );
    };
    return (
        <>
            {CompareStrings(values?.isRollAndPolish, "Yes") && (
                <>
                    <div className={classes["label"]}>Please Choose</div>
                    <Radio.Group
                        onChange={handleChange}
                        value={values?.rollAndPolishTypes}
                        id="rollAndPolishTypes"
                        name="rollAndPolishTypes"
                        className={classes["radio-group"]}
                    >
                        {getRollAndPolishTypesList()?.map((value, index) => {
                            return (
                                <CustomRadio
                                    key={index}
                                    label={
                                        value?.display_name
                                            ? value?.display_name
                                            : value?.title
                                    }
                                    value={value?.title}
                                    headClass={classes["radio"]}
                                    active={
                                        values?.rollAndPolishTypes ===
                                        value?.title
                                    }
                                />
                            );
                        })}
                    </Radio.Group>
                    <FormikError name={"rollAndPolishTypes"} />
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(RollAndPolishTypes);
