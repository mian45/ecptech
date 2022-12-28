import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings, groupBy } from "../../../../../../utils/utils";
import { getAddonsList } from "../../../antireFlextive/helpers/addonsHelper";
import { FormikError } from "../../../selectVisionPlan";
import classes from "../blueProectionCategory/blueProtectionCategory.module.scss";

const BlueProtectionTypes = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange } = formProps;

    const getBlueProtectionTypes = () => {
        const addons = getAddonsList(calculatorObj, "VBA", "Blue Protection");
        const groupByAddons = groupBy("category", addons);
        return groupByAddons[values?.blueProtectionCategory] || [];
    };
    return (
        <>
            {CompareStrings(values?.isBlueProtection, "Yes") &&
                values?.blueProtectionCategory && (
                    <>
                        <div className={classes["label"]}>Please Choose</div>
                        <Radio.Group
                            onChange={handleChange}
                            value={values?.blueProtectionType}
                            id="blueProtectionType"
                            name="blueProtectionType"
                            className={classes["radio-group"]}
                        >
                            {getBlueProtectionTypes()?.map((value, index) => {
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
                                            values?.blueProtectionType ===
                                            value?.title
                                        }
                                    />
                                );
                            })}
                        </Radio.Group>
                        <FormikError name={"blueProtectionType"} />
                    </>
                )}
        </>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(BlueProtectionTypes);
