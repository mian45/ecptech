import React from "react";
import { connect } from "react-redux";
import classes from "./blueProtectionCategory.module.scss";
import * as Yup from "yup";
import { Radio } from "antd";
import { CompareStrings, groupBy } from "../../../../../../utils/utils";
import { getAddonsList } from "../../../antireFlextive/helpers/addonsHelper";
import CustomRadio from "../../../../../../components/customRadio";
import { FormikError } from "../../../selectVisionPlan";

const BlueProtectionCategory = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange, setFieldValue } = formProps;

    const handleBlueProtectionCategory = async (e) => {
        handleChange(e);
        const validationsObj = {};
        validationsObj.blueProtectionType = Yup.string().required(
            "Blue protection type is required"
        );
        setCalValidations({
            ...calValidations,
            ...validationsObj,
        });
        await setFieldValue("blueProtectionType", "");
    };

    const getBlueProtectionCategories = () => {
        const addons = getAddonsList(calculatorObj, "VBA", "Blue Protection");
        const groupByAddons = groupBy("category", addons);
        return Object.keys(groupByAddons) || [];
    };

    return (
        <>
            {CompareStrings(values?.isBlueProtection, "Yes") && (
                <>
                    <div className={classes["label"]}>Please Choose</div>
                    <Radio.Group
                        onChange={handleBlueProtectionCategory}
                        value={values?.blueProtectionCategory}
                        id="blueProtectionCategory"
                        name="blueProtectionCategory"
                        className={classes["radio-group"]}
                    >
                        {getBlueProtectionCategories()?.map((value, index) => {
                            return (
                                <CustomRadio
                                    key={index}
                                    label={value}
                                    value={value}
                                    headClass={classes["radio"]}
                                    active={
                                        values?.blueProtectionCategory === value
                                    }
                                />
                            );
                        })}
                    </Radio.Group>
                    <FormikError name={"blueProtectionCategory"} />
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(BlueProtectionCategory);
