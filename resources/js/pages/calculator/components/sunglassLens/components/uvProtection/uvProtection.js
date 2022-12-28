import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./uvProtection.module.scss";

const UVProtection = ({ formProps, language }) => {
    const { values, handleChange } = formProps;
    return (
        <>
            {CompareStrings(values?.visionPlan, "VBA") &&
                CompareStrings(values?.isSunglasses, "Yes") && (
                    <>
                        <div className={classes["label"]}>
                            UV 400 Protection
                        </div>
                        <Radio.Group
                            onChange={handleChange}
                            value={values?.uvProtection}
                            id="uvProtection"
                            name="uvProtection"
                            className={classes["radio-group"]}
                        >
                            <CustomRadio
                                label={"Yes"}
                                value={"Yes"}
                                headClass={classes["radio"]}
                                active={values?.uvProtection === "Yes"}
                            />
                            <CustomRadio
                                label={"No"}
                                value={"No"}
                                headClass={classes["radio"]}
                                active={values?.uvProtection === "No"}
                            />
                        </Radio.Group>
                        <FormikError name={"uvProtection"} />
                    </>
                )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(UVProtection);
