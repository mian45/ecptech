import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import {
    getVBASingleVisionCategories,
    getVBASingleVisionSubCategories,
} from "../../helpers/helpers";
import classes from "../../styles.module.scss";
import * as Yup from "yup";

const VBACategories = ({
    language,
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
}) => {
    const { values, handleChange, handleBlur, setFieldValue, setFieldError } =
        formProps;

    const getCategoryByLens = async (e) => {
        handleChange(e);
        await setFieldValue("lensSubCategory", "");
        await setFieldValue("lensTypeValue", "");
        const validations = { ...calValidations };
        if (
            CompareStrings(values?.lensType, "Single Vision") &&
            values?.visionPlan === "VBA"
        ) {
            validations.lensSubCategory = Yup.string().required(
                "Sub category is required"
            );
        } else if (
            CompareStrings(values?.lensType, "PAL") &&
            values?.visionPlan === "VBA"
        ) {
            validations.lensTypeValue =
                Yup.string().required("Brand is required");
        } else if (
            values?.lensType === "PAL" &&
            values?.lensCategory === "Non - Formulary progressive lenses" &&
            values?.visionPlan === "Spectra" &&
            values?.isLensBenifit === "Yes"
        ) {
            validations.lensTypeInput =
                Yup.string().required("Price is required");
        }
        setCalValidations({ ...validations });
    };
    const getSubCategoryByLens = async (e) => {
        handleChange(e);
        await setFieldValue("lensTypeValue", "");
        const validations = { ...calValidations };
        validations.lensTypeValue = Yup.string().required("Brand is required");
        setCalValidations({ ...validations });
    };

    const renderVbaCategories = () => {
        return (
            <>
                <div className={classes["choose-label"]}>
                    Please Choose Category
                </div>
                <Radio.Group
                    onChange={getCategoryByLens}
                    value={values?.lensCategory}
                    id="lensCategory"
                    name="lensCategory"
                    className={classes["radio-group"]}
                >
                    {getVBASingleVisionCategories(calculatorObj, values)?.map(
                        (category, index) => {
                            return (
                                <CustomRadio
                                    key={index}
                                    label={category?.title}
                                    value={category?.title}
                                    active={
                                        values?.lensCategory === category?.title
                                    }
                                    headClass={classes["radio-margin"]}
                                />
                            );
                        }
                    )}
                </Radio.Group>
                <FormikError name={"lensCategory"} />
            </>
        );
    };

    const renderVbaSubCategories = () => {
        const subCategoriesList = getVBASingleVisionSubCategories(
            calculatorObj,
            values
        );
        if (!subCategoriesList || subCategoriesList?.length <= 0) return;
        return (
            <>
                <div className={classes["choose-label"]}>Please Choose</div>
                <Radio.Group
                    onChange={getSubCategoryByLens}
                    value={values?.lensSubCategory}
                    id="lensSubCategory"
                    name="lensSubCategory"
                    className={classes["radio-group"]}
                >
                    {subCategoriesList?.map((category, index) => {
                        return (
                            <CustomRadio
                                key={index}
                                label={category?.title}
                                value={category?.title}
                                active={
                                    values?.lensSubCategory === category?.title
                                }
                                headClass={classes["radio-margin"]}
                            />
                        );
                    })}
                </Radio.Group>
                <FormikError name={"lensSubCategory"} />
            </>
        );
    };
    return (
        <>
            {((CompareStrings(values?.visionPlan, "VBA") &&
                (CompareStrings(values?.lensType, "Single Vision") ||
                    CompareStrings(values?.lensType, "PAL"))) ||
                (CompareStrings(values?.visionPlan, "Spectra") &&
                    CompareStrings(values?.lensType, "PAL"))) &&
                renderVbaCategories()}
            {CompareStrings(values?.visionPlan, "VBA") &&
                CompareStrings(values?.lensType, "Single Vision") &&
                values?.lensCategory &&
                renderVbaSubCategories()}
        </>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(VBACategories);
