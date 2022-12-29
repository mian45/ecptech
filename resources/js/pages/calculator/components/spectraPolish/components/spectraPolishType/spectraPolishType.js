import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./spectraPolishType.module.scss";

const SpectraPolishType = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange } = formProps;

    const getPolishTypesList = () => {
        return (
            calculatorObj?.addons
                ?.find((plan) => plan?.title === values?.visionPlan)
                ?.addon_types?.find((item) => item?.title === "Polish")
                ?.addons || []
        );
    };
    return (
        <>
            {CompareStrings(values?.spectraPolish, "Yes") && (
                <>
                    <div className={classes["label"]}>Please Choose</div>
                    <Radio.Group
                        onChange={handleChange}
                        value={values?.spectraPolishType}
                        id="spectraPolishType"
                        name="spectraPolishType"
                        className={classes["radio-group"]}
                    >
                        {getPolishTypesList()?.map((value, index) => {
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
                                        values?.spectraPolishType ===
                                        value?.title
                                    }
                                />
                            );
                        })}
                    </Radio.Group>
                    <FormikError name={"spectraPolishType"} />
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(SpectraPolishType);
