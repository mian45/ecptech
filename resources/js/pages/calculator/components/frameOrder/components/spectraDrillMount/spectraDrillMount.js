import React, { useEffect } from "react";
import { connect } from "react-redux";
import classes from "./spectraDrillMount.module.scss";

const SpectraDrillMount = ({ formProps, calculatorObj, language }) => {
    const { values, setFieldValue } = formProps;
    useEffect(() => {
        setFieldValue("drillMountValue", calculatorObj?.drill_amount);
    }, [calculatorObj]);
    return (
        <>
            {values?.drillMount === "Yes" &&
                values?.visionPlan === "Spectra" && (
                    <>
                        <div className={classes["input-container"]}>
                            <div className={classes["input-label"]}>$</div>
                            <div className={classes["input-shipping"]}>
                                {calculatorObj?.drill_amount}
                            </div>
                        </div>
                        {!calculatorObj?.drill_amount && (
                            <div className={classes["error"]}>
                                Please go to settings to add Drill Mount.
                            </div>
                        )}
                    </>
                )}
        </>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(SpectraDrillMount);
