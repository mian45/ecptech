const benifitsOptions = {
    yes: "Yes",
    no: "Only multiple pair benefit only at this time",
};
const yesNoOptions = {
    yes: "Yes",
    no: "No",
};

export const PLANS = {
    en: {
        "VSP Signature": {
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
                            options: yesNoOptions,
                        },
                    },
                    ownFrame: { question: "Patient Own Frame" },
                },
            },
            tracingFee: {
                question: "Tracing Fee?",
                options: yesNoOptions,
            },
        },

        "VSP Choice": {
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
                            options: yesNoOptions,
                        },
                    },
                    ownFrame: { question: "Patient Own Frame" },
                },
            },
            tracingFee: {
                question: "Tracing Fee?",
                options: yesNoOptions,
            },
        },
        "VSP Advantage": {
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
                            options: yesNoOptions,
                        },
                    },
                    ownFrame: { question: "Patient Own Frame" },
                },
            },
            tracingFee: {
                question: "Tracing Fee?",
                options: yesNoOptions,
            },
        },
        Eyemed: {
            visionPlan: { question: "Select Vision Plan" },
            frameBenifit: {
                question: "Frame Benefit Available?",
                options: benifitsOptions,
            },
            lensBenifit: {
                question: "Lens Benefit Available?",
                options: benifitsOptions,
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
                            options: yesNoOptions,
                        },
                    },
                    ownFrame: { question: "Patient Own Frame" },
                },
            },
            lensType: { question: "Lens Type?", subQuestion: "Please Choose" },
            lensMaterial: { question: "Lens Material?" },
            photochromics: {
                question: "Photochromics?",
                options: yesNoOptions,
                subQuestion: { question: "Select Photochromics" },
            },
            sunglasses: {
                question: "Sunglass Lens?",
                options: yesNoOptions,
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
                        options: yesNoOptions,
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
                question: "Antireflective Properties?",
                options: yesNoOptions,
                subQuestion: { question: "Select Properties" },
            },
            additionalLens: {
                question: "Additional Lens Treatments?",
                options: yesNoOptions,
                subQuestion: {
                    slabOff: {
                        question: "Slab Off?",
                        options: yesNoOptions,
                    },
                    specialtyLens: {
                        question: "Specialty Lens?",
                        options: yesNoOptions,
                    },
                    polish: {
                        question: "Polish?",
                        options: yesNoOptions,
                        subQuestion: { question: "Select Polish Type" },
                    },
                },
            },
            tracingFee: {
                question: "Tracing Fee?",
                options: yesNoOptions,
            },
        },
        "Davis Vision": {
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
                            question: "Rimless Drill?",
                            options: yesNoOptions,
                        },
                    },
                    ownFrame: { question: "Patient Own Frame" },
                },
            },
            tracingFee: {
                question: "Tracing Fee?",
                options: yesNoOptions,
            },
        },
        "Private Pay": {
            materialCopay: { question: "Material Copay?" },
            tracingFee: {
                question: "Tracing Fee?",
                options: yesNoOptions,
            },
        },
    },
};
