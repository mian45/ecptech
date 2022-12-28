import { Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../../../components/customRadio";
import { CompareStrings } from "../../../../../../utils/utils";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./licensedSpecialityType.module.scss";

const LicensedSpecialityTypes = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange } = formProps;

    const getLicensedSpecialityTypesList = () => {
        return (
            calculatorObj?.addons
                ?.find((plan) => plan?.title === values?.visionPlan)
                ?.addon_types?.find(
                    (item) => item?.title === "Licensed Specialty Enhancement"
                )?.addons || []
        );
    };
    return (
        <>
            {CompareStrings(values?.isLicensedSpeciality, "Yes") && (
                <>
                    <div className={classes["label"]}>Please Choose</div>
                    <Radio.Group
                        onChange={handleChange}
                        value={values?.licensedSpecialityType}
                        id="licensedSpecialityType"
                        name="licensedSpecialityType"
                        className={classes["radio-group"]}
                    >
                        {getLicensedSpecialityTypesList()?.map(
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
                                            values?.licensedSpecialityType ===
                                            value?.title
                                        }
                                    />
                                );
                            }
                        )}
                    </Radio.Group>
                    <FormikError name={"licensedSpecialityType"} />
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(LicensedSpecialityTypes);
