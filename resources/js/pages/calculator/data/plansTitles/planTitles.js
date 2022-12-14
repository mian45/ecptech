import { Plans } from "../plansJson";

const PlanTitles = (language, currentPlan) => {
    const plan = Plans()[language][currentPlan];
    return {
        //vision plan
        visionPlanTitle: plan?.visionPlan?.question,
        //frame benifits
        frameBenifitTitle: plan?.frameBenifit?.question,
        frameBenifitYes: plan?.frameBenifit?.options?.yes,
        frameBenifitNo: plan?.frameBenifit?.options?.no,
        //lens benifits
        lensBenifitTitle: plan?.lensBenifit?.question,
        lensBenifitYes: plan?.lensBenifit?.options?.yes,
        lensBenifitNo: plan?.lensBenifit?.options?.no,
        //material copay
        materialCopayTitle: plan?.materialCopay?.question,
        //frame order
        frameOrderTitle: plan?.frameOrder?.question,
        newFrameTitle: plan?.frameOrder?.options?.newFrame?.question,
        retailFeeTitle:
            plan?.frameOrder?.options?.newFrame?.subOptions?.retailFee,
        frameContributionTitle:
            plan?.frameOrder?.options?.newFrame?.subOptions?.frameContribution,
        drillMountTitle:
            plan?.frameOrder?.options?.newFrame?.subQuestion?.question,
        drillMountYes:
            plan?.frameOrder?.options?.newFrame?.subQuestion?.options?.yes,
        drillMountNo:
            plan?.frameOrder?.options?.newFrame?.subQuestion?.options?.no,
        ownFrameTitle: plan?.frameOrder?.options?.ownFrame,
        //lens type
        lensTypeTitle: plan?.lensType?.question,
        lensTypeSubtitle: plan?.lensType?.subQuestion,
        //lens material
        lensMaterialTitle: plan?.lensMaterial?.question,
        //photochromics
        photochromicsTitle: plan?.photochromics?.question,
        photochromicsYes: plan?.photochromics?.options?.yes,
        photochromicsNo: plan?.photochromics?.options?.no,
        photochromicsSubtitle: plan?.photochromics?.subQuestion?.question,
        //sunglasses
        sunglassesTitle: plan?.sunglasses?.question,
        sunglassesYes: plan?.sunglasses?.options?.yes,
        sunglassesNo: plan?.sunglasses?.options?.no,
        selectLensTitle: plan?.sunglasses?.subQuestion?.question,
        polarizedTitle:
            plan?.sunglasses?.subQuestion?.options?.polarized?.question,
        tintTitle: plan?.sunglasses?.subQuestion?.options?.tint?.question,
        tintTypeTitle:
            plan?.sunglasses?.subQuestion?.options?.tint?.subQuestion?.question,
        solidTintTitle:
            plan?.sunglasses?.subQuestion?.options?.tint?.subQuestion?.options
                ?.solidTint,
        gradientTintTitle:
            plan?.sunglasses?.subQuestion?.options?.tint?.subQuestion?.options
                ?.gradientTint,
        selectCoatingTitle:
            plan?.sunglasses?.subQuestion?.subQuestion?.question,
        coatingYes: plan?.sunglasses?.subQuestion?.subQuestion?.options?.yes,
        coatingNo: plan?.sunglasses?.subQuestion?.subQuestion?.options?.no,
        coatingTypeTitle:
            plan?.sunglasses?.subQuestion?.subQuestion?.subQuestion?.question,
        skyTypeTitle:
            plan?.sunglasses?.subQuestion?.subQuestion?.subQuestion?.options
                ?.skyTypeMirror,
        solidTypeTitle:
            plan?.sunglasses?.subQuestion?.subQuestion?.subQuestion?.options
                ?.solidTypeMirror,
        //antireflective
        antireflectiveTitle: plan?.antireflective?.question,
        antireflectiveYes: plan?.antireflective?.options?.yes,
        antireflectiveNo: plan?.antireflective?.options?.no,
        antireflectiveTypeTitle: plan?.antireflective?.subQuestion,
        //additional Lens Title
        additionalLensTitle: plan?.additionalLens?.question,
        additionalLensYes: plan?.additionalLens?.options?.yes,
        additionalLensNo: plan?.additionalLens?.options?.no,
        //slaboff
        slabOffTitle: plan?.additionalLens?.subQuestion?.slabOff?.question,
        slabOffYes: plan?.additionalLens?.subQuestion?.slabOff?.options?.yes,
        slabOffNo: plan?.additionalLens?.subQuestion?.slabOff?.options?.no,
        //speciality lens
        specialityLensTitle:
            plan?.additionalLens?.subQuestion?.specialtyLens?.question,
        specialityLensYes:
            plan?.additionalLens?.subQuestion?.specialtyLens?.options?.yes,
        specialityLensNo:
            plan?.additionalLens?.subQuestion?.specialtyLens?.options?.no,
        //polish
        polishTitle: plan?.additionalLens?.subQuestion?.polish?.question,
        polishYes: plan?.additionalLens?.subQuestion?.polish?.options?.yes,
        polishNo: plan?.additionalLens?.subQuestion?.polish?.options?.no,
        polishSubtitle:
            plan?.additionalLens?.subQuestion?.polish?.subQuestion?.question,
        //tracing
        tracingTitle: plan?.tracingFee?.question,
        tracingYes: plan?.tracingFee?.options?.yes,
        tracingNo: plan?.tracingFee?.options?.no,
    };
};
export default PlanTitles;
