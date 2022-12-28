import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings, groupBy } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import { getPhotochromicsAddons } from "../../helpers/helpers";
import classes from "../../styles.module.scss";
import * as Yup from "yup";

const PhotochromicsCategory = ({
    language,
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
}) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;

    const handlePhotochromicsCategoryChange = (e) => {
        handleChange(e);
        const photochromicsType = Yup.string().required("Option is required");
        setCalValidations({
            ...calValidations,
            photochromicsType,
        });
    };
    const getPhotochromicsCategoryList = () => {
        const addons = getPhotochromicsAddons(
            calculatorObj,
            "VBA",
            "Photochromics"
        );
        const groupByAddons = groupBy("category", addons);
        return Object.keys(groupByAddons) || [];
    };
    return (
        <>
            {CompareStrings(values?.visionPlan, "VBA") &&
                CompareStrings(values?.isPhotochromics, "Yes") && (
                    <>
                        <div className={classes["label"]}>
                            Select Photochromics Category
                        </div>
                        <Radio.Group
                            onChange={handlePhotochromicsCategoryChange}
                            value={values?.photochromicsCategory}
                            id="photochromicsCategory"
                            name="photochromicsCategory"
                            className={classes["radio-group"]}
                        >
                            {getPhotochromicsCategoryList()?.map(
                                (category, index) => {
                                    return (
                                        <CustomRadio
                                            key={index}
                                            label={category}
                                            value={category}
                                            headClass={classes["radio"]}
                                            active={
                                                values?.photochromicsCategory ===
                                                category
                                            }
                                        />
                                    );
                                }
                            )}
                        </Radio.Group>
                        <FormikError name={"photochromicsCategory"} />
                    </>
                )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(PhotochromicsCategory);
