export const calculatorObject = {
    statusCode: 200,
    message: "Calculater Data",
    data: {
        questions: {
            "VSP Signature": {
                visionPlan: {
                    visibility: true,
                    optional: true,
                },
                frameBenefit: {
                    visibility: true,
                    optional: true,
                },
                lensBenefit: {
                    visibility: true,
                    optional: true,
                },
                materialCopay: {
                    visibility: true,
                    optional: true,
                },
                frameOrder: {
                    visibility: true,
                    optional: true,
                },
                copayDollarAmount: {
                    visibility: true,
                    optional: true,
                },
                lensType: {
                    visibility: true,
                    optional: true,
                },
                lensMaterial: {
                    visibility: true,
                    optional: true,
                },
                photochromics: {
                    visibility: true,
                    optional: true,
                },
                sunglassLens: {
                    visibility: true,
                    optional: true,
                },
                antireflective: {
                    visibility: true,
                    optional: true,
                },
                protectionPlan: {
                    visibility: true,
                    optional: true,
                },
                shipping: {
                    visibility: true,
                    optional: true,
                },
            },
        },
        lens_types: {
            "Single Vision": [
                {
                    id: 17,
                    title: "NeuroLens SV",
                    brand_id: 10,
                    created_at: "2022-09-26T19:10:07.000000Z",
                    updated_at: "2022-09-26T19:10:07.000000Z",
                    created_by: null,
                    updated_by: null,
                    deleted_by: null,
                },
            ],
        },
        lens_material: [
            {
                id: 1,
                title: "CR39",
                deleted_at: null,
                created_at: "2022-09-26T19:10:07.000000Z",
                updated_at: "2022-09-26T19:10:07.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
            {
                id: 2,
                title: "Polycarbonate",
                deleted_at: null,
                created_at: "2022-09-26T19:10:07.000000Z",
                updated_at: "2022-09-26T19:10:07.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
            {
                id: 3,
                title: "Trivex",
                deleted_at: null,
                created_at: "2022-09-26T19:10:07.000000Z",
                updated_at: "2022-09-26T19:10:07.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
            {
                id: 4,
                title: "Hi Index 1.67",
                deleted_at: null,
                created_at: "2022-09-26T19:10:07.000000Z",
                updated_at: "2022-09-26T19:10:07.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
            {
                id: 5,
                title: "Hi index 1.70 and above",
                deleted_at: null,
                created_at: "2022-09-26T19:10:07.000000Z",
                updated_at: "2022-09-26T19:10:07.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
            {
                id: 6,
                title: "Hi index 1.60",
                deleted_at: null,
                created_at: "2022-09-26T19:10:07.000000Z",
                updated_at: "2022-09-26T19:10:07.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
        ],
        sheet_data: {
            "VSP Signature": {
                "Single Vision": {
                    Shamir: {
                        "Shamir Attitude III SV": {
                            "Digital 1.60 High-index Plastic": {
                                "Digital Aspheric - Plastic": {
                                    type: "base",
                                    code: "BA",
                                    price: "40.00",
                                    lens_material: "Hi index 1.60",
                                },
                                "High-index Plastic 1.53-1.60/Trivex": {
                                    type: "base",
                                    code: "BB",
                                    price: "27.00",
                                    lens_material: "Hi index 1.60",
                                },
                            },
                            "Digital 1.60 High-index Plastic Transitions Signature GEN 8 / XTRActive":
                                {
                                    "Digital Aspheric - Plastic": {
                                        type: "base",
                                        code: "BA",
                                        price: "40.00",
                                        lens_material: "Hi index 1.60",
                                    },
                                    "High-index Plastic 1.53-1.60/Trivex": {
                                        type: "base",
                                        code: "BB",
                                        price: "27.00",
                                        lens_material: "Hi index 1.60",
                                    },
                                    "Photochromic-Plastic": {
                                        type: "addon",
                                        code: "PR",
                                        price: "70.00",
                                        lens_material: "Hi index 1.60",
                                    },
                                },
                            "Digital 1.60 High-index Plastic Polarized": {
                                "Digital Aspheric - Plastic": {
                                    type: "base",
                                    code: "BA",
                                    price: "40.00",
                                    lens_material: "Hi index 1.60",
                                },
                                "Polarized - Plastic": {
                                    type: "base",
                                    code: "DA",
                                    price: "53.00",
                                    lens_material: "Hi index 1.60",
                                },
                                "High-index Plastic 1.53-1.60/Trivex": {
                                    type: "base",
                                    code: "DB",
                                    price: "70.00",
                                    lens_material: "Hi index 1.60",
                                },
                            },
                            "Digital 1.50 Plastic": {
                                "Digital Aspheric - Plastic": {
                                    type: "base",
                                    code: "BA",
                                    price: "40.00",
                                    lens_material: "CR39",
                                },
                            },
                            "Digital 1.67 High-index Plastic": {
                                "Digital Aspheric - Plastic": {
                                    type: "base",
                                    code: "BA",
                                    price: "40.00",
                                    lens_material: "Hi Index 1.67",
                                },
                                "High-index Plastic 1.66/1.67": {
                                    type: "base",
                                    code: "BH",
                                    price: "56.00",
                                    lens_material: "Hi Index 1.67",
                                },
                                " Digital Aspheric - Plastic": {
                                    type: "base",
                                    code: "BA",
                                    price: "40.00",
                                    lens_material: "Hi Index 1.67",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
