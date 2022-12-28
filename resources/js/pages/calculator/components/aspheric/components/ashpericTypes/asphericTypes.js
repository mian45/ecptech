import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./asphericTypes.module.scss";

const AsphericTypes = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange } = formProps;

    const getAsphericTypesList = () => {
        return (
            calculatorObj?.addons
                ?.find((plan) => plan?.title === values?.visionPlan)
                ?.addon_types?.find((item) => item?.title === "Aspheric")
                ?.addons || []
        );
    };
    return (
        <>
            {CompareStrings(values?.isAspheric, "Yes") && (
                <>
                    <div className={classes["label"]}>Please Choose</div>
                    <Radio.Group
                        onChange={handleChange}
                        value={values?.asphericType}
                        id="asphericType"
                        name="asphericType"
                        className={classes["radio-group"]}
                    >
                        {getAsphericTypesList()?.map((value, index) => {
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
                                        values?.asphericType === value?.title
                                    }
                                />
                            );
                        })}
                    </Radio.Group>
                    <FormikError name={"asphericType"} />
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(AsphericTypes);
