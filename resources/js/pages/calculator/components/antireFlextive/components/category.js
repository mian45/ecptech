import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../components/customRadio";
import { CompareStrings, groupBy } from "../../../../../utils/utils";
import { FormikError } from "../../selectVisionPlan";
import { getAddonsList } from "../helpers/addonsHelper";
import classes from "../styles.module.scss";
import * as Yup from "yup";

const AntiReflectiveCategory = ({
    language,
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
}) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;

    const handleAntireflectiveCategoryChange = (e) => {
        handleChange(e);
        const validations = {};
        if (
            CompareStrings(
                e?.target?.value,
                "Non - Formulary anti-reflective coatings"
            ) &&
            CompareStrings(values?.visionPlan, "Spectra")
        ) {
            validations.antireflectiveValue =
                Yup.string().required("Price is required");
        } else {
            validations.antireflectiveType =
                Yup.string().required("Option is required");
        }
        setCalValidations({
            ...calValidations,
            ...validations,
        });
    };
    const getAntiReflectiveCategoryList = () => {
        if (CompareStrings(values?.visionPlan, "VBA")) {
            const addons = getAddonsList(
                calculatorObj,
                "VBA",
                "Anti-Reflective Coatings"
            );
            const groupByAddons = groupBy("category", addons);
            return Object.keys(groupByAddons) || [];
        } else if (CompareStrings(values?.visionPlan, "Spectra")) {
            const addons = getAddonsList(
                calculatorObj,
                "Spectra",
                "Anti-Reflective"
            );
            const groupByAddons = groupBy("category", addons);
            const categoriesList = Object.keys(groupByAddons) || [];
            if (CompareStrings(values?.isLensBenifit, "Yes")) {
                return [
                    ...categoriesList,
                    "Non - Formulary anti-reflective coatings",
                ];
            }
            return [...categoriesList];
        }
    };

    return (
        <>
            {(CompareStrings(values?.visionPlan, "VBA") ||
                CompareStrings(values?.visionPlan, "Spectra")) &&
                CompareStrings(values?.isAntireflective, "Yes") && (
                    <>
                        <div className={classes["label"]}>
                            Select Anti-Reflective Category
                        </div>
                        <Radio.Group
                            onChange={handleAntireflectiveCategoryChange}
                            value={values?.antiReflectiveCategory}
                            id="antiReflectiveCategory"
                            name="antiReflectiveCategory"
                            className={classes["radio-group"]}
                        >
                            {getAntiReflectiveCategoryList()?.map(
                                (category, index) => {
                                    return (
                                        <CustomRadio
                                            key={index}
                                            label={category}
                                            value={category}
                                            headClass={classes["radio"]}
                                            active={
                                                values?.antiReflectiveCategory ===
                                                category
                                            }
                                        />
                                    );
                                }
                            )}
                        </Radio.Group>
                        <FormikError name={"antiReflectiveCategory"} />
                    </>
                )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(AntiReflectiveCategory);
