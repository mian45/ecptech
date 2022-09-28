import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import lensIcon from "../../../../../images/calculator/lens.svg";

const LensType = ({ formProps, calculatorObj }) => {
    const { values, handleChange, handleBlur } = formProps;
    const lensTypeVisibility =
        calculatorObj?.questions &&
        calculatorObj?.questions["VSP Signature"]?.lensType?.visibility;
    const showActiveState = () => {
        if (values?.lensType && values?.lensTypeValue) {
            return true;
        }
        return false;
    };
    const lensTypeValues = () => {
        return calculatorObj["lens_types"]?.map((value) => value?.title);
    };
    const getLensSubValues = () => {
        const selectedLensType = calculatorObj["lens_types"]?.find(
            (value) => value?.title === values.lensType
        );
        let lenses = [];
        selectedLensType?.brands?.forEach((element) => {
            element?.collections?.forEach((lens) => {
                lenses.push(lens?.title);
            });
        });
        return lenses;
    };
    return (
        <>
            {lensTypeVisibility ? (
                <div className={classes["container"]}>
                    <div className={classes["sub-container"]}>
                        <QuestionIcon
                            icon={lensIcon}
                            active={showActiveState()}
                        />
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title="Lens Type?"
                                active={showActiveState()}
                            />
                            <Radio.Group
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values?.lensType}
                                id="lensType"
                                name="lensType"
                                className={classes["radio-group"]}
                            >
                                {lensTypeValues()?.map((lens, index) => {
                                    return (
                                        <CustomRadio
                                            key={index}
                                            label={lens}
                                            value={lens}
                                            active={values?.lensType === lens}
                                        />
                                    );
                                })}
                            </Radio.Group>
                            <FormikError name={"lensType"} />
                            {values?.lensType && (
                                <>
                                    <div className={classes["choose-label"]}>
                                        Please Choose
                                    </div>
                                    <Radio.Group
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values?.lensTypeValue}
                                        id="lensTypeValue"
                                        name="lensTypeValue"
                                        className={classes["radio-group"]}
                                    >
                                        {getLensSubValues()?.map(
                                            (lens, index) => {
                                                return (
                                                    <CustomRadio
                                                        headClass={
                                                            classes[
                                                                "radio-margin"
                                                            ]
                                                        }
                                                        key={index}
                                                        label={lens}
                                                        value={lens}
                                                        active={
                                                            values?.lensTypeValue ===
                                                            lens
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </Radio.Group>
                                    <FormikError name={"lensTypeValue"} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default LensType;

const LENS_TYPES = ["Single Vision", "PAL", "NVF", "Bifocal/Trifocal"];

const LENS_VALUES = ["Shamir Autograph 3 SV", "Shamir Relax"];
