import React from "react";
import { Radio } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/sunglasses.svg";
import * as Yup from "yup";

const SunglassLens = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
}) => {
    const { values, handleChange, handleBlur } = formProps;

    const sunglassLensVisibility = calculatorObj?.questions
        ?.find((item) => item.title === "VSP Signature")
        ?.question_permissions?.find(
            (ques) => ques.question === "Sunglass Lens"
        )?.visibility;

    const handleIsSunglassesLensChange = (e) => {
        handleChange(e);
        if (
            e?.target?.value === "Yes" &&
            !data?.find((ques) => ques.question === "Sunglass Lens")?.optional
        ) {
            const sunglassesType = Yup.string().required("Option is required");
            setCalValidations({
                ...calValidations,
                sunglassesType,
            });
        } else if (e?.target?.value === "No") {
            const validations = { ...calValidations };
            delete validations.sunglassesType;
            delete validations.tintType;
            delete validations.isMirrorCoating;
            delete validations.mirrorCoatingType;
            setCalValidations({
                ...validations,
            });
        }
    };
    const handleSunGlassesLensTypeChange = (e) => {
        handleChange(e);
        if (
            e?.target?.value === "Polarized" &&
            !data?.find((ques) => ques.question === "Sunglass Lens")?.optional
        ) {
            const validations = { ...calValidations };
            delete validations.tintType;
            const isMirrorCoating = Yup.string().required("Option is required");
            setCalValidations({
                ...validations,
                isMirrorCoating,
            });
        } else if (
            e?.target?.value === "Tint" &&
            !data?.find((ques) => ques.question === "Sunglass Lens")?.optional
        ) {
            const validationObj = {
                tintType: Yup.string().required("Option is required"),
                isMirrorCoating: Yup.string().required("Option is required"),
            };
            setCalValidations({
                ...calValidations,
                ...validationObj,
            });
        }
    };

    const handleMirrirCoatingChange = (e) => {
        handleChange(e);
        if (
            e?.target?.value === "Yes" &&
            !data?.find((ques) => ques.question === "Sunglass Lens")?.optional
        ) {
            const mirrorCoatingType =
                Yup.string().required("Option is required");
            setCalValidations({
                ...calValidations,
                mirrorCoatingType,
            });
        } else if (e?.target?.value === "No") {
            const validations = { ...calValidations };
            delete validations.mirrorCoatingType;
            setCalValidations({
                ...validations,
            });
        }
    };

    const handleActiveState = () => {
        if (values?.isSunglasses === "No") {
            return true;
        } else {
            if (values?.sunglassesType) {
                if (values?.sunglassesType === "Polarized") {
                    if (values?.isMirrorCoating === "No") {
                        return true;
                    } else {
                        if (values?.mirrorCoatingType) {
                            return true;
                        }
                        return false;
                    }
                } else {
                    if (values?.sunglassesType === "Tint") {
                        if (
                            values?.isMirrorCoating === "No" &&
                            values?.tintType
                        ) {
                            return true;
                        } else {
                            if (values?.mirrorCoatingType && values?.tintType) {
                                return true;
                            }
                            return false;
                        }
                    }
                    return false;
                }
                return false;
            }
            return false;
        }
    };

    const renderSunGlassLens = () => {
        return (
            <>
                <div className={classes["label"]}>Select Sunglass Lens</div>
                <Radio.Group
                    onBlur={handleBlur}
                    onChange={handleSunGlassesLensTypeChange}
                    value={values?.sunglassesType}
                    id="sunglassesType"
                    name="sunglassesType"
                    className={classes["radio-group"]}
                    headClass={classes["margin"]}
                >
                    <CustomRadio
                        label={"Polarized"}
                        value={"Polarized"}
                        active={values?.sunglassesType === "Polarized"}
                    />

                    <CustomRadio
                        label={"Tint"}
                        value={"Tint"}
                        active={values?.sunglassesType === "Tint"}
                    />
                </Radio.Group>
                <FormikError name={"sunglassesType"} />
            </>
        );
    };
    const renderTintLens = () => {
        return (
            <>
                <div className={classes["label"]}>Select Tint Lens</div>
                <Radio.Group
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.tintType}
                    id="tintType"
                    name="tintType"
                    className={classes["radio-group"]}
                    headClass={classes["margin"]}
                >
                    <CustomRadio
                        label={"Solid Tint"}
                        value={"Solid Tint"}
                        active={values?.tintType === "Solid Tint"}
                    />

                    <CustomRadio
                        label={"Gradient Tint"}
                        value={"Gradient Tint"}
                        active={values?.tintType === "Gradient Tint"}
                    />
                </Radio.Group>
                <FormikError name={"tintType"} />
            </>
        );
    };
    const renderMirrorCoating = () => {
        return (
            <>
                <CalculatorHeading title="Mirror Coating?" />
                <Radio.Group
                    onBlur={handleBlur}
                    onChange={handleMirrirCoatingChange}
                    value={values?.isMirrorCoating}
                    id="isMirrorCoating"
                    name="isMirrorCoating"
                    className={classes["radio-group"]}
                >
                    <CustomRadio
                        label={"Yes"}
                        value={"Yes"}
                        active={values?.isMirrorCoating === "Yes"}
                    />

                    <CustomRadio
                        label={"No"}
                        value={"No"}
                        active={values?.isMirrorCoating === "No"}
                    />
                </Radio.Group>
                <FormikError name={"isMirrorCoating"} />
            </>
        );
    };
    const renderMirrorType = () => {
        return (
            <>
                <div className={classes["label"]}>Please Select</div>
                <Radio.Group
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.mirrorCoatingType}
                    id="mirrorCoatingType"
                    name="mirrorCoatingType"
                    className={classes["radio-group"]}
                    headClass={classes["margin"]}
                >
                    <CustomRadio
                        label={"Ski Type Mirror"}
                        value={"Ski Type Mirror"}
                        active={values?.mirrorCoatingType === "Ski Type Mirror"}
                    />

                    <CustomRadio
                        label={"Solid/Single Gradient"}
                        value={"Solid/Single Gradient"}
                        active={
                            values?.mirrorCoatingType ===
                            "Solid/Single Gradient"
                        }
                    />
                </Radio.Group>
                <FormikError name={"mirrorCoatingType"} />
            </>
        );
    };
    return (
        <>
            {sunglassLensVisibility ? (
                <div className={classes["container"]}>
                    <QuestionIcon icon={icon} active={handleActiveState()} />
                    <div className={classes["vision-container"]}>
                        <CalculatorHeading
                            title="Sunglass Lens?"
                            active={handleActiveState()}
                        />
                        <Radio.Group
                            onBlur={handleBlur}
                            onChange={handleIsSunglassesLensChange}
                            value={values?.isSunglasses}
                            id="isSunglasses"
                            name="isSunglasses"
                            className={classes["radio-group"]}
                        >
                            <CustomRadio
                                label={"Yes"}
                                value={"Yes"}
                                active={values?.isSunglasses === "Yes"}
                            />

                            <CustomRadio
                                label={"No"}
                                value={"No"}
                                active={values?.isSunglasses === "No"}
                            />
                        </Radio.Group>
                        <FormikError name={"isSunglasses"} />
                        {values?.isSunglasses === "Yes" && (
                            <>
                                {renderSunGlassLens()}
                                {values?.sunglassesType && (
                                    <>
                                        {values?.sunglassesType === "Tint" &&
                                            renderTintLens()}
                                        {renderMirrorCoating()}
                                        {values?.isMirrorCoating === "Yes" && (
                                            <>{renderMirrorType()}</>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default SunglassLens;
