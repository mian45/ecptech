import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./centerThickness.module.scss";

const CenterThickness = ({ formProps, language }) => {
    const { values, handleChange } = formProps;
    return (
        <>
            {CompareStrings(values?.visionPlan, "VBA") &&
                values?.lensMaterial && (
                    <>
                        <div className={classes["label"]}>
                            Are you gonna avail 1MM centre thickness
                        </div>
                        <Radio.Group
                            onChange={handleChange}
                            value={values?.centerThickness}
                            id="centerThickness"
                            name="centerThickness"
                            className={classes["radio-group"]}
                        >
                            <CustomRadio
                                label={"Yes"}
                                value={"Yes"}
                                headClass={classes["radio"]}
                                active={values?.centerThickness === "Yes"}
                            />
                            <CustomRadio
                                label={"No"}
                                value={"No"}
                                headClass={classes["radio"]}
                                active={values?.centerThickness === "No"}
                            />
                        </Radio.Group>
                        <FormikError name={"centerThickness"} />
                    </>
                )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(CenterThickness);
