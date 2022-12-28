import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CalculatorHeading, FormikError } from "../../../selectVisionPlan";
import classes from "../../styles.module.scss";
import PlanTitles from "../../../../data/plansTitles/planTitles";
import { AllPlans } from "../../../../data/plansList";
import { CompareStrings } from "../../../../../../utils/utils";

const VBADrillMountOptions = ({ language, formProps }) => {
    const { values, handleChange } = formProps;
    const {
        drillOptionsTitle,
        drillRimlessMounting,
        drillDrillRimlessMounting,
        drillDrillAndNotchRimlessMounting,
    } = PlanTitles(language, values?.visionPlan);
    const allPlans = AllPlans[language];

    return (
        <>
            {CompareStrings(values?.visionPlan, allPlans?.vba) && (
                <div className={classes["frame-sub-container"]}>
                    <CalculatorHeading title={drillOptionsTitle} />
                    <Radio.Group
                        onChange={handleChange}
                        value={values?.drillMountOptions}
                        id="drillMountOptions"
                        name="drillMountOptions"
                        className={classes["radio-group"]}
                    >
                        <CustomRadio
                            label={drillRimlessMounting}
                            value={drillRimlessMounting}
                            active={
                                values?.drillMountOptions ===
                                drillRimlessMounting
                            }
                        />

                        <CustomRadio
                            label={drillDrillRimlessMounting}
                            value={drillDrillRimlessMounting}
                            active={
                                values?.drillMountOptions ===
                                drillDrillRimlessMounting
                            }
                        />
                        <CustomRadio
                            label={drillDrillAndNotchRimlessMounting}
                            value={drillDrillAndNotchRimlessMounting}
                            active={
                                values?.drillMountOptions ===
                                drillDrillAndNotchRimlessMounting
                            }
                        />
                    </Radio.Group>
                    <FormikError name={"drillMountOptions"} />
                </div>
            )}
        </>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(VBADrillMountOptions);
