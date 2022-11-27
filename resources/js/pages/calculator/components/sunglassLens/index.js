import React from "react";
import { Col, Radio, Row } from "antd";
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
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Sunglass Lens"
        )?.visibility;

    const addons = calculatorObj?.addons?.find(
        (item) => item.title === "SunGlasses"
    )?.addons;
    const isPolirizedActive = addons?.some(
        (item) => item?.title === "Polarized"
    );
    const isSolidTintActive = addons?.some(
        (item) => item?.title === "Solid Tint"
    );
    const isGradientTintActive = addons?.some(
        (item) => item?.title === "Gradient Tint"
    );
    const isSkyTypeActive = addons?.some(
        (item) => item?.title === "Ski Type Mirror"
    );
    const isSolidTypeActive = addons?.some(
        (item) => item?.title === "Solid/Single Gradient Mirror"
    );

    const handleIsSunglassesLensChange = (e) => {
        handleChange(e);
        if (
            e?.target?.value === "Yes" &&
            data?.find((ques) => ques.question === "Sunglass Lens")
                ?.optional === "true"
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
            data?.find((ques) => ques.question === "Sunglass Lens")
                ?.optional === "true"
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
            data?.find((ques) => ques.question === "Sunglass Lens")
                ?.optional === "true"
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
            data?.find((ques) => ques.question === "Sunglass Lens")
                ?.optional === "true"
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
    const getPolorized = () => {
        return calculatorObj?.addons
            ?.find((item) => item?.title === "SunGlasses")
            ?.addons?.find((val) => val?.title === "Polarized");
    };

    const renderSunGlassLens = () => {
        return (
            <>
                <div className={classes["label"]}>Select Sunglass Lens</div>
                <Radio.Group
                    onChange={handleSunGlassesLensTypeChange}
                    value={values?.sunglassesType}
                    id="sunglassesType"
                    name="sunglassesType"
                    className={classes["radio-group"]}
                    headClass={classes["margin"]}
                >
                    {isPolirizedActive && (
                        <CustomRadio
                            label={
                                getPolorized()?.display_name
                                    ? getPolorized()?.display_name
                                    : getPolorized()?.title
                            }
                            value={getPolorized()?.title}
                            active={
                                values?.sunglassesType === getPolorized()?.title
                            }
                        />
                    )}

                    {(isSolidTintActive || isGradientTintActive) && (
                        <CustomRadio
                            label={"Tint"}
                            value={"Tint"}
                            active={values?.sunglassesType === "Tint"}
                        />
                    )}
                </Radio.Group>
                <FormikError name={"sunglassesType"} />
            </>
        );
    };
    const renderTintLens = () => {
        const getSolid = () => {
            return calculatorObj?.addons
                ?.find((item) => item?.title === "SunGlasses")
                ?.addons?.find((val) => val?.title === "Solid Tint");
        };
        const getGradient = () => {
            return calculatorObj?.addons
                ?.find((item) => item?.title === "SunGlasses")
                ?.addons?.find((val) => val?.title === "Gradient Tint");
        };
        return (
            <>
                {(isSolidTintActive || isGradientTintActive) && (
                    <>
                        <div className={classes["label"]}>Select Tint Lens</div>
                        <Radio.Group
                            onChange={handleChange}
                            value={values?.tintType}
                            id="tintType"
                            name="tintType"
                            className={classes["radio-group"]}
                            headClass={classes["margin"]}
                        >
                            {isSolidTintActive && (
                                <CustomRadio
                                    label={
                                        getSolid()?.display_name
                                            ? getSolid()?.display_name
                                            : getSolid()?.title
                                    }
                                    value={getSolid()?.title}
                                    active={
                                        values?.tintType === getSolid()?.title
                                    }
                                />
                            )}

                            {isGradientTintActive && (
                                <CustomRadio
                                    label={
                                        getGradient()?.display_name
                                            ? getGradient()?.display_name
                                            : getGradient()?.title
                                    }
                                    value={getGradient()?.title}
                                    active={
                                        values?.tintType ===
                                        getGradient()?.title
                                    }
                                />
                            )}
                        </Radio.Group>
                        <FormikError name={"tintType"} />
                    </>
                )}
            </>
        );
    };
    const renderMirrorCoating = () => {
        return (
            <>
                <CalculatorHeading title="Mirror Coating?" />
                <Radio.Group
                    onChange={handleMirrirCoatingChange}
                    value={values?.isMirrorCoating}
                    id="isMirrorCoating"
                    name="isMirrorCoating"
                    className={classes["radio-group"]}
                >
                    {(isSkyTypeActive || isSolidTypeActive) && (
                        <CustomRadio
                            label={"Yes"}
                            value={"Yes"}
                            active={values?.isMirrorCoating === "Yes"}
                        />
                    )}

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
        const getSkyType = () => {
            return calculatorObj?.addons
                ?.find((item) => item?.title === "SunGlasses")
                ?.addons?.find((val) => val?.title === "Ski Type Mirror");
        };
        const getSolidSingle = () => {
            return calculatorObj?.addons
                ?.find((item) => item?.title === "SunGlasses")
                ?.addons?.find(
                    (val) => val?.title === "Solid/Single Gradient Mirror"
                );
        };
        return (
            <>
                {(isSkyTypeActive || isSolidTypeActive) && (
                    <>
                        <div className={classes["label"]}>Please Select</div>
                        <Radio.Group
                            onChange={handleChange}
                            value={values?.mirrorCoatingType}
                            id="mirrorCoatingType"
                            name="mirrorCoatingType"
                            className={classes["radio-group"]}
                            headClass={classes["margin"]}
                        >
                            {isSkyTypeActive && (
                                <CustomRadio
                                    label={
                                        getSkyType()?.display_name
                                            ? getSkyType()?.display_name
                                            : getSkyType()?.title
                                    }
                                    value={getSkyType()?.title}
                                    active={
                                        values?.mirrorCoatingType ===
                                        getSkyType()?.title
                                    }
                                />
                            )}

                            {isSolidTypeActive && (
                                <CustomRadio
                                    label={
                                        getSolidSingle()?.display_name
                                            ? getSolidSingle()?.display_name
                                            : getSolidSingle()?.title
                                    }
                                    value={getSolidSingle()?.title}
                                    active={
                                        values?.mirrorCoatingType ===
                                        getSolidSingle()?.title
                                    }
                                />
                            )}
                        </Radio.Group>
                        <FormikError name={"mirrorCoatingType"} />
                    </>
                )}
            </>
        );
    };
    return (
        <>
            {sunglassLensVisibility ? (
                <Row className={classes["container"]}>
                    <Col sx={0} sm={0} md={5}>
                        <QuestionIcon
                            icon={icon}
                            active={handleActiveState()}
                        />
                    </Col>
                    <Col sx={24} sm={24} md={19}>
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title="Sunglass Lens?"
                                active={handleActiveState()}
                            />
                            <Radio.Group
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
                                            {values?.sunglassesType ===
                                                "Tint" && renderTintLens()}
                                            <span style={{ marginTop: "20px" }}>
                                                {renderMirrorCoating()}
                                            </span>
                                            {values?.isMirrorCoating ===
                                                "Yes" && (
                                                <>{renderMirrorType()}</>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            ) : null}
        </>
    );
};

export default SunglassLens;
