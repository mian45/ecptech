import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./vbaTintTypes.module.scss";

const VBATintTypes = ({ formProps, language }) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    return (
        <>
            {CompareStrings(values?.visionPlan, "VBA") &&
                CompareStrings(values?.tintType, "Tint - Solid Pink 1 & 2") && (
                    <>
                        <div className={classes["label"]}>Please Choose</div>
                        <Radio.Group
                            onChange={handleChange}
                            value={values?.tintCategory}
                            id="tintCategory"
                            name="tintCategory"
                            className={classes["radio-group"]}
                        >
                            <CustomRadio
                                label={"Normal Use"}
                                value={"Normal Use"}
                                headClass={classes["radio"]}
                                active={values?.tintCategory === "Normal Use"}
                            />
                            <CustomRadio
                                label={"Therapeutic Use"}
                                value={"Therapeutic Use"}
                                headClass={classes["radio"]}
                                active={
                                    values?.tintCategory === "Therapeutic Use"
                                }
                            />
                        </Radio.Group>
                        <FormikError name={"tintCategory"} />
                    </>
                )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(VBATintTypes);
