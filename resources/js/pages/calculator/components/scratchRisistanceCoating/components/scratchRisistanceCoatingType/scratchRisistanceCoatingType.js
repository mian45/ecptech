import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./scratchRisistanceCoatingType.module.scss";

const ScratchRisistanceCoatingType = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange } = formProps;

    const getScratchRisistanceTypesList = () => {
        return (
            calculatorObj?.addons
                ?.find((plan) => plan?.title === values?.visionPlan)
                ?.addon_types?.find(
                    (item) => item?.title === "Scratch Resistant Coatings"
                )?.addons || []
        );
    };
    return (
        <>
            {CompareStrings(values?.isScratched, "Yes") && (
                <>
                    <div className={classes["label"]}>Please Choose</div>
                    <Radio.Group
                        onChange={handleChange}
                        value={values?.scratchedType}
                        id="scratchedType"
                        name="scratchedType"
                        className={classes["radio-group"]}
                    >
                        {getScratchRisistanceTypesList()?.map(
                            (value, index) => {
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
                                            values?.scratchedType ===
                                            value?.title
                                        }
                                    />
                                );
                            }
                        )}
                    </Radio.Group>
                    <FormikError name={"scratchedType"} />
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(ScratchRisistanceCoatingType);
