import { benifitsOptions, yesNoOptions } from "../plansJson";

export const VspAdvantageJson = () => {
    return {
        visionPlan: { question: "Select Vision Plan" },
        frameBenifit: {
            question: "Frame Benefit Available?",
            options: benifitsOptions(),
        },
        lensBenifit: {
            question: "Lens Benefit Available?",
            options: benifitsOptions(),
        },
        materialCopay: { question: "Material Copay?" },
        frameOrder: {
            question: "Frame Order?",
            options: {
                newFrame: {
                    question: "New Frame Purchase",
                    subOptions: {
                        retailFee: "Retail fee of frame?",
                        frameContribution: "Frame Contribution?",
                    },
                    subQuestion: {
                        question: "Drill Mount?",
                        options: yesNoOptions(),
                    },
                },
                ownFrame: { question: "Patient Own Frame" },
            },
        },
        lensType: { question: "Lens Type?", subQuestion: "Please Choose" },
        lensMaterial: { question: "Lens Material?" },
        photochromics: {
            question: "Photochromics?",
            options: yesNoOptions(),
            subQuestion: { question: "Select Photochromics" },
        },
        sunglasses: {
            question: "Sunglass Options?",
            options: yesNoOptions(),
            subQuestion: {
                question: "Select Sunglass Lens",
                options: {
                    polarized: { question: "Polarized" },
                    tint: {
                        question: "Tint",
                        subQuestion: {
                            question: "Select Tint Lens",
                            options: {
                                solidTint: "Solid Tint",
                                gradientTint: "Gradient Tint",
                            },
                        },
                    },
                },
                subQuestion: {
                    question: "Mirror Coating?",
                    options: yesNoOptions(),
                    subQuestion: {
                        question: "Please Select",
                        options: {
                            skyTypeMirror: "Ski Type Mirror",
                            solidTypeMirror: "Solid/Single Gradient Mirror",
                        },
                    },
                },
            },
        },
        antireflective: {
            question: "Anti-Reflective Properties?",
            options: yesNoOptions(),
            subQuestion: { question: "Select Properties" },
        },
        tracingFee: {
            question: "Tracing Fee?",
            options: yesNoOptions(),
        },
    };
};
