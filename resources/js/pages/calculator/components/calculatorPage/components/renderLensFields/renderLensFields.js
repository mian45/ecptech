import React from "react";
import AdditionalLensTreatment from "../../../additionalLensTreatment/additionalLensTreatment";
import AntireFlextive from "../../../antireFlextive";
import BlueLightFiltering from "../../../blueLightFiltering/blueLightFiltering";
import LensType from "../../../lensType";
import Photochromics from "../../../photochromics";
import SunglassLens from "../../../sunglassLens";
import LensMeterials from "../../../lensMeterial";
import Aspheric from "../../../aspheric/aspheric";
import BlueProtection from "../../../blueProtection/blueProtection";
import RollAndPolish from "../../../rollAndPolish/rollAndPolish";
import LicensedSpeciality from "../../../licensedSpeciality/licensedSpeciality";
import ScratchRisistanceCoating from "../../../scratchRisistanceCoating/scratchRisistanceCoating";

const RenderLensFields = ({
    formProps,
    calculatorObj,
    setCalculatorObj,
    setCalValidations,
    calValidations,
    getBaseValues,
}) => {
    return (
        <>
            <LensType
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalculatorObj={setCalculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
                getBaseValues={getBaseValues}
            />
            <LensMeterials
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                getBaseValues={getBaseValues}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
            />
            <Photochromics
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
                data={
                    calculatorObj?.questions?.find(
                        (item) => item.title === formProps?.values?.visionPlan
                    )?.question_permissions
                }
            />
            <SunglassLens
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
                data={
                    calculatorObj?.questions?.find(
                        (item) => item.title === formProps?.values?.visionPlan
                    )?.question_permissions
                }
            />
            <AntireFlextive
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
                data={
                    calculatorObj?.questions?.find(
                        (item) => item.title === formProps?.values?.visionPlan
                    )?.question_permissions
                }
            />
            <BlueLightFiltering
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
                data={
                    calculatorObj?.questions?.find(
                        (item) => item?.title === formProps?.values?.visionPlan
                    )?.question_permissions
                }
            />
            <AdditionalLensTreatment
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
                data={
                    calculatorObj?.questions?.find(
                        (item) => item?.title === formProps?.values?.visionPlan
                    )?.question_permissions
                }
            />
            <Aspheric
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
            />
            <BlueProtection
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
            />
            <RollAndPolish
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
            />
            <LicensedSpeciality
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
            />
            <ScratchRisistanceCoating
                formProps={formProps}
                calculatorObj={calculatorObj && calculatorObj}
                setCalValidations={setCalValidations}
                calValidations={calValidations}
            />
        </>
    );
};

export default RenderLensFields;
