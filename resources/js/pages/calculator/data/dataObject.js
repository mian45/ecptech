export const calculatorObject = {
    statusCode: 200,
    message: "Calculater Data",
    data: {
        shipping: "",
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
                    optional: false,
                },
                materialCopay: {
                    visibility: true,
                    optional: true,
                },
                frameOrder: {
                    visibility: true,
                    optional: false,
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
                    optional: false,
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
        lens_types: [
            {
                id: 1,
                title: "Single Vision",
                vision_plan_id: 1,
                deleted_at: null,
                created_at: "2022-09-28T05:16:11.000000Z",
                updated_at: "2022-09-28T05:16:11.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
                brands: [
                    {
                        id: 1,
                        title: "No Brand",
                        lens_type_id: 1,
                        created_at: "2022-09-28T05:16:11.000000Z",
                        updated_at: "2022-09-28T05:16:11.000000Z",
                        created_by: null,
                        updated_by: null,
                        deleted_by: null,
                        collections: [
                            {
                                id: 1,
                                title: "Single Vision Digital Aspheric",
                                brand_id: 1,
                                created_at: "2022-09-28T05:16:11.000000Z",
                                updated_at: "2022-09-28T05:16:11.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: "Shamir",
                        lens_type_id: 1,
                        created_at: "2022-09-28T05:16:11.000000Z",
                        updated_at: "2022-09-28T05:16:11.000000Z",
                        created_by: null,
                        updated_by: null,
                        deleted_by: null,
                        collections: [
                            {
                                id: 2,
                                title: "Autograph III SV",
                                brand_id: 2,
                                created_at: "2022-09-28T05:16:11.000000Z",
                                updated_at: "2022-09-28T05:16:11.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                            {
                                id: 3,
                                title: "Attitude III SV",
                                brand_id: 2,
                                created_at: "2022-09-28T05:16:11.000000Z",
                                updated_at: "2022-09-28T05:16:11.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                            {
                                id: 4,
                                title: "Shamir Relax 50/65/80",
                                brand_id: 2,
                                created_at: "2022-09-28T05:25:36.000000Z",
                                updated_at: "2022-09-28T05:25:36.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                        ],
                    },
                    {
                        id: 3,
                        title: "Essilor",
                        lens_type_id: 1,
                        created_at: "2022-09-28T05:25:36.000000Z",
                        updated_at: "2022-09-28T05:25:36.000000Z",
                        created_by: null,
                        updated_by: null,
                        deleted_by: null,
                        collections: [
                            {
                                id: 5,
                                title: "Essilor Single Vision 360",
                                brand_id: 3,
                                created_at: "2022-09-28T05:25:36.000000Z",
                                updated_at: "2022-09-28T05:25:36.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                            {
                                id: 6,
                                title: "Eyezen+ 0",
                                brand_id: 3,
                                created_at: "2022-09-28T05:25:36.000000Z",
                                updated_at: "2022-09-28T05:25:36.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                            {
                                id: 7,
                                title: "Eyezen+ 1, 2, 3, 4",
                                brand_id: 3,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                        ],
                    },
                    {
                        id: 4,
                        title: "Hoya",
                        lens_type_id: 1,
                        created_at: "2022-09-28T05:25:37.000000Z",
                        updated_at: "2022-09-28T05:25:37.000000Z",
                        created_by: null,
                        updated_by: null,
                        deleted_by: null,
                        collections: [
                            {
                                id: 8,
                                title: "Hoyalux iD SV",
                                brand_id: 4,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                            {
                                id: 9,
                                title: "Hoya Sync III",
                                brand_id: 4,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                        ],
                    },
                    {
                        id: 5,
                        title: "Signet \nArmorlite",
                        lens_type_id: 1,
                        created_at: "2022-09-28T05:25:37.000000Z",
                        updated_at: "2022-09-28T05:25:37.000000Z",
                        created_by: null,
                        updated_by: null,
                        deleted_by: null,
                        collections: [
                            {
                                id: 10,
                                title: "Kodak Digital Single \nVision",
                                brand_id: 5,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                            {
                                id: 11,
                                title: "KODAK PowerUp \n.40/.66",
                                brand_id: 5,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                        ],
                    },
                    {
                        id: 6,
                        title: "Maui Jim",
                        lens_type_id: 1,
                        created_at: "2022-09-28T05:25:37.000000Z",
                        updated_at: "2022-09-28T05:25:37.000000Z",
                        created_by: null,
                        updated_by: null,
                        deleted_by: null,
                        collections: [
                            {
                                id: 12,
                                title: "Maui Jim Ophthalmic \nSingle Vision w/ \nMaui Jim AR",
                                brand_id: 6,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                        ],
                    },
                    {
                        id: 7,
                        title: "Seiko",
                        lens_type_id: 1,
                        created_at: "2022-09-28T05:25:37.000000Z",
                        updated_at: "2022-09-28T05:25:37.000000Z",
                        created_by: null,
                        updated_by: null,
                        deleted_by: null,
                        collections: [
                            {
                                id: 13,
                                title: "Superior SV",
                                brand_id: 7,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                        ],
                    },
                    {
                        id: 8,
                        title: "Carl Zeiss Vision",
                        lens_type_id: 1,
                        created_at: "2022-09-28T05:25:37.000000Z",
                        updated_at: "2022-09-28T05:25:37.000000Z",
                        created_by: null,
                        updated_by: null,
                        deleted_by: null,
                        collections: [
                            {
                                id: 14,
                                title: "Synchrony HDC SV",
                                brand_id: 8,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                        ],
                    },
                    {
                        id: 9,
                        title: "VSP",
                        lens_type_id: 1,
                        created_at: "2022-09-28T05:25:37.000000Z",
                        updated_at: "2022-09-28T05:25:37.000000Z",
                        created_by: null,
                        updated_by: null,
                        deleted_by: null,
                        collections: [
                            {
                                id: 15,
                                title: "Unity Relieve 50/70",
                                brand_id: 9,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                            {
                                id: 16,
                                title: "UNITY SVx",
                                brand_id: 9,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                            },
                        ],
                    },
                    {
                        id: 10,
                        title: "NeuroLens SV",
                        lens_type_id: 1,
                        created_at: "2022-09-28T05:25:38.000000Z",
                        updated_at: "2022-09-28T05:25:38.000000Z",
                        created_by: null,
                        updated_by: null,
                        deleted_by: null,
                        collections: [],
                    },
                ],
            },
        ],
        lens_material: [
            {
                id: 1,
                lens_material_title: "Hi index 1.70 and above",
                deleted_at: null,
                created_at: "2022-09-28T05:16:11.000000Z",
                updated_at: "2022-09-28T05:16:11.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
            {
                id: 2,
                lens_material_title: "CR39",
                deleted_at: null,
                created_at: "2022-09-28T05:16:11.000000Z",
                updated_at: "2022-09-28T05:16:11.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
            {
                id: 3,
                lens_material_title: "Hi index 1.60",
                deleted_at: null,
                created_at: "2022-09-28T05:16:11.000000Z",
                updated_at: "2022-09-28T05:16:11.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
            {
                id: 4,
                lens_material_title: "Hi Index 1.67",
                deleted_at: null,
                created_at: "2022-09-28T05:16:11.000000Z",
                updated_at: "2022-09-28T05:16:11.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
            {
                id: 5,
                lens_material_title: "Polycarbonate",
                deleted_at: null,
                created_at: "2022-09-28T05:16:11.000000Z",
                updated_at: "2022-09-28T05:16:11.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
            {
                id: 6,
                lens_material_title: "Trivex",
                deleted_at: null,
                created_at: "2022-09-28T05:25:36.000000Z",
                updated_at: "2022-09-28T05:25:36.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
            },
        ],
        sheet_data: [
            {
                id: 1,
                title: "VSP Signature",
                deleted_at: null,
                created_at: "2022-09-28T05:16:11.000000Z",
                updated_at: "2022-09-28T05:16:11.000000Z",
                created_by: null,
                updated_by: null,
                deleted_by: null,
                lensetypes: [
                    {
                        id: 1,
                        title: "Single Vision",
                        vision_plan_id: 1,
                        deleted_at: null,
                        created_at: "2022-09-28T05:16:11.000000Z",
                        updated_at: "2022-09-28T05:16:11.000000Z",
                        created_by: null,
                        updated_by: null,
                        deleted_by: null,
                        brands: [
                            {
                                id: 1,
                                title: "No Brand",
                                lens_type_id: 1,
                                created_at: "2022-09-28T05:16:11.000000Z",
                                updated_at: "2022-09-28T05:16:11.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                                collections: [
                                    {
                                        id: 1,
                                        title: "Single Vision Digital Aspheric",
                                        brand_id: 1,
                                        created_at:
                                            "2022-09-28T05:16:11.000000Z",
                                        updated_at:
                                            "2022-09-28T05:16:11.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [],
                                    },
                                ],
                            },
                            {
                                id: 2,
                                title: "Shamir",
                                lens_type_id: 1,
                                created_at: "2022-09-28T05:16:11.000000Z",
                                updated_at: "2022-09-28T05:16:11.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                                collections: [
                                    {
                                        id: 2,
                                        title: "Autograph III SV",
                                        brand_id: 2,
                                        created_at:
                                            "2022-09-28T05:16:11.000000Z",
                                        updated_at:
                                            "2022-09-28T05:16:11.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic",
                                                collection_id: 2,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic Transitions Signature GEN 8",
                                                collection_id: 2,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 3,
                                        title: "Attitude III SV",
                                        brand_id: 2,
                                        created_at:
                                            "2022-09-28T05:16:11.000000Z",
                                        updated_at:
                                            "2022-09-28T05:16:11.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic",
                                                collection_id: 3,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic Transitions Signature \nGEN 8 / XTRActive",
                                                collection_id: 3,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic",
                                                collection_id: 3,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Transitions\nSignature GEN 8 / XTRActive",
                                                collection_id: 3,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Polarized",
                                                collection_id: 3,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic",
                                                collection_id: 3,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions\nSignature GEN 8 / XTRActive",
                                                collection_id: 3,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Polarized",
                                                collection_id: 3,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 3,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions\nSignature GEN 8 / XTRActive",
                                                collection_id: 3,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions\nDriveWear",
                                                collection_id: 3,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Polarized",
                                                collection_id: 3,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex",
                                                collection_id: 3,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Transitions Signature GEN 8\n/ XTRActive",
                                                collection_id: 3,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Polarized",
                                                collection_id: 3,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 4,
                                        title: "Shamir Relax 50/65/80",
                                        brand_id: 2,
                                        created_at:
                                            "2022-09-28T05:25:36.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:36.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic",
                                                collection_id: 4,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic Transitions Signature GEN 8",
                                                collection_id: 4,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic",
                                                collection_id: 4,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic",
                                                collection_id: 4,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Polarized",
                                                collection_id: 4,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Transitions Signature GEN 8 / XTRActive",
                                                collection_id: 4,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic",
                                                collection_id: 4,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Polarized",
                                                collection_id: 4,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions Signature GEN 8 / XTRActive",
                                                collection_id: 4,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic SunSync / SunSync Drive XT",
                                                collection_id: 4,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic SunSync Elite / SunSync Elite XT",
                                                collection_id: 4,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 4,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Polarized",
                                                collection_id: 4,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions Signature GEN 8 / XTRActive",
                                                collection_id: 4,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate SunSync / SunSync Drive XT",
                                                collection_id: 4,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate DriveWear",
                                                collection_id: 4,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate BluTech Indoor w/Lab Choice AR Category D",
                                                collection_id: 4,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex",
                                                collection_id: 4,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Polarized",
                                                collection_id: 4,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Transitions Signature GEN 8 / XTRActive",
                                                collection_id: 4,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex SunSync / SunSync Drive XT",
                                                collection_id: 4,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: 3,
                                title: "Essilor",
                                lens_type_id: 1,
                                created_at: "2022-09-28T05:25:36.000000Z",
                                updated_at: "2022-09-28T05:25:36.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                                collections: [
                                    {
                                        id: 5,
                                        title: "Essilor Single Vision 360",
                                        brand_id: 3,
                                        created_at:
                                            "2022-09-28T05:25:36.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:36.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic",
                                                collection_id: 5,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic",
                                                collection_id: 5,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions Signature",
                                                collection_id: 5,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 5,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions",
                                                collection_id: 5,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 6,
                                        title: "Eyezen+ 0",
                                        brand_id: 3,
                                        created_at:
                                            "2022-09-28T05:25:36.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:36.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic",
                                                collection_id: 6,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic Transitions Signature GEN 8 w/ applicable AR",
                                                collection_id: 6,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic",
                                                collection_id: 6,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic Transitions Signature GEN 8 / XTRActive",
                                                collection_id: 6,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic",
                                                collection_id: 6,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Transitions Signature GEN 8",
                                                collection_id: 6,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 Plastic High-index",
                                                collection_id: 6,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions Signature GEN 8 / XTRActive",
                                                collection_id: 6,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions XTRActive Polarized",
                                                collection_id: 6,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Polarized",
                                                collection_id: 6,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 6,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions Signature GEN 8 / XTRActive",
                                                collection_id: 6,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions XTRActive Polarized",
                                                collection_id: 6,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Polarized",
                                                collection_id: 6,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex",
                                                collection_id: 6,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Transitions Signature GEN 8 / XTRActive",
                                                collection_id: 6,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 7,
                                        title: "Eyezen+ 1, 2, 3, 4",
                                        brand_id: 3,
                                        created_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic",
                                                collection_id: 7,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Transitions\nSignature GEN 8",
                                                collection_id: 7,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic",
                                                collection_id: 7,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic",
                                                collection_id: 7,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic \nTransitionsSignature GEN 8",
                                                collection_id: 7,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 Plastic High-index",
                                                collection_id: 7,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic \nTransitions GEN 8 / XTRActive",
                                                collection_id: 7,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic \nTransitions XTRActive Polarized",
                                                collection_id: 7,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic \nPolarized",
                                                collection_id: 7,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 7,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions\nSignature GEN 8 / XTRActive",
                                                collection_id: 7,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions\nXTRActive Polarized",
                                                collection_id: 7,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Polarized",
                                                collection_id: 7,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex",
                                                collection_id: 7,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Transitions Signature \nGEN 8 / XTRActive",
                                                collection_id: 7,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: 4,
                                title: "Hoya",
                                lens_type_id: 1,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                                collections: [
                                    {
                                        id: 8,
                                        title: "Hoyalux iD SV",
                                        brand_id: 4,
                                        created_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 Plastic High Index",
                                                collection_id: 8,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 Plastic High Index\nSensity/Sensity Dark",
                                                collection_id: 8,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 Plastic High Index",
                                                collection_id: 8,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 Plastic High Index\nSensity/Sensity Dark",
                                                collection_id: 8,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 9,
                                        title: "Hoya Sync III",
                                        brand_id: 4,
                                        created_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic",
                                                collection_id: 9,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic",
                                                collection_id: 9,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic",
                                                collection_id: 9,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Sensity / \nSensity Dark",
                                                collection_id: 9,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic",
                                                collection_id: 9,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Sensity /\nSensity Dark / Sensity Fast",
                                                collection_id: 9,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions\nSignature GEN 8 / XTRActive",
                                                collection_id: 9,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions\nXTRActive Polarized",
                                                collection_id: 9,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Polarized",
                                                collection_id: 9,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 9,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions\nSignature GEN 8 / XTRActive",
                                                collection_id: 9,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions\nXTRActive Polarized",
                                                collection_id: 9,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Sensity / Sensity \nDark / Sensity Fast",
                                                collection_id: 9,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Polarized",
                                                collection_id: 9,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex",
                                                collection_id: 9,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Sensity / Sensity Dark /\nSensity Fast",
                                                collection_id: 9,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Transitions Signature \nGEN 8 / XTRActive",
                                                collection_id: 9,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Polarized",
                                                collection_id: 9,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: 5,
                                title: "Signet \nArmorlite",
                                lens_type_id: 1,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                                collections: [
                                    {
                                        id: 10,
                                        title: "Kodak Digital Single \nVision",
                                        brand_id: 5,
                                        created_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic",
                                                collection_id: 10,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 1,
                                                title: "1.74 High-index Plastic Transitions\nSignature",
                                                collection_id: 10,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic",
                                                collection_id: 10,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic Photochromic",
                                                collection_id: 10,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic",
                                                collection_id: 10,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Transitions \nSignature",
                                                collection_id: 10,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Polarized",
                                                collection_id: 10,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic",
                                                collection_id: 10,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions\nSignature / XTRActive",
                                                collection_id: 10,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Polarized",
                                                collection_id: 10,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 10,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Photochromic",
                                                collection_id: 10,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions /\nXTRActive",
                                                collection_id: 10,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Polarized",
                                                collection_id: 10,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex",
                                                collection_id: 10,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Transitions Signature /\nXTRActive",
                                                collection_id: 10,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Polarized",
                                                collection_id: 10,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 11,
                                        title: "KODAK PowerUp \n.40/.66",
                                        brand_id: 5,
                                        created_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic",
                                                collection_id: 11,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Polarized\nw/Total Blue AR",
                                                collection_id: 11,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 11,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate w/Total Blue",
                                                collection_id: 11,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions \nSignature GEN 8",
                                                collection_id: 11,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Polarized",
                                                collection_id: 11,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: 6,
                                title: "Maui Jim",
                                lens_type_id: 1,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                                collections: [
                                    {
                                        id: 12,
                                        title: "Maui Jim Ophthalmic \nSingle Vision w/ \nMaui Jim AR",
                                        brand_id: 6,
                                        created_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic",
                                                collection_id: 12,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic",
                                                collection_id: 12,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 12,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex",
                                                collection_id: 12,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: 7,
                                title: "Seiko",
                                lens_type_id: 1,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                                collections: [
                                    {
                                        id: 13,
                                        title: "Superior SV",
                                        brand_id: 7,
                                        created_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic",
                                                collection_id: 13,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic Transitions\nSignature",
                                                collection_id: 13,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic",
                                                collection_id: 13,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic Polarized",
                                                collection_id: 13,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic",
                                                collection_id: 13,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Transitions\nSignature",
                                                collection_id: 13,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic",
                                                collection_id: 13,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Sensity",
                                                collection_id: 13,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Polarized",
                                                collection_id: 13,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions\nSignature / XTRActive",
                                                collection_id: 13,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 13,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Polarized",
                                                collection_id: 13,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Sensity",
                                                collection_id: 13,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions\nSignature / XTRActive",
                                                collection_id: 13,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex",
                                                collection_id: 13,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Transitions Signature /\nXTRActive",
                                                collection_id: 13,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Sensity",
                                                collection_id: 13,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Polarized",
                                                collection_id: 13,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: 8,
                                title: "Carl Zeiss Vision",
                                lens_type_id: 1,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                                collections: [
                                    {
                                        id: 14,
                                        title: "Synchrony HDC SV",
                                        brand_id: 8,
                                        created_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic w/ Lab \nChoice AR Category D",
                                                collection_id: 14,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic",
                                                collection_id: 14,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic PhotoFusion",
                                                collection_id: 14,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic",
                                                collection_id: 14,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic\nPhotoFusion",
                                                collection_id: 14,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Transitions\nSignature",
                                                collection_id: 14,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic",
                                                collection_id: 14,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic\nPhotochromic",
                                                collection_id: 14,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions\nSignature / XTRActive",
                                                collection_id: 14,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Polarized",
                                                collection_id: 14,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 14,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate PhotoFusion",
                                                collection_id: 14,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions /\nXTRActive",
                                                collection_id: 14,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Polarized",
                                                collection_id: 14,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex",
                                                collection_id: 14,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Polarized",
                                                collection_id: 14,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Photochromic",
                                                collection_id: 14,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Polarized Photochromic",
                                                collection_id: 14,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: 9,
                                title: "VSP",
                                lens_type_id: 1,
                                created_at: "2022-09-28T05:25:37.000000Z",
                                updated_at: "2022-09-28T05:25:37.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                                collections: [
                                    {
                                        id: 15,
                                        title: "Unity Relieve 50/70",
                                        brand_id: 9,
                                        created_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic",
                                                collection_id: 15,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic",
                                                collection_id: 15,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic",
                                                collection_id: 15,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Polarized",
                                                collection_id: 15,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic:",
                                                collection_id: 15,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Polarized",
                                                collection_id: 15,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic SunSync /\nSunSync Drive XT",
                                                collection_id: 15,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic SunSync\nElite / SunSync Elite XT",
                                                collection_id: 15,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 15,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Polarized",
                                                collection_id: 15,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate SunSync / SunSync\nDrive XT",
                                                collection_id: 15,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate SunSync Elite /\nSunSync Elite XT",
                                                collection_id: 15,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex",
                                                collection_id: 15,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex SunSync / SunSync Drive \nXT / SunSync Elite / SunSync Elite XT",
                                                collection_id: 15,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 16,
                                        title: "UNITY SVx",
                                        brand_id: 9,
                                        created_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        updated_at:
                                            "2022-09-28T05:25:37.000000Z",
                                        created_by: null,
                                        updated_by: null,
                                        deleted_by: null,
                                        lenses: [
                                            {
                                                id: 1,
                                                title: "Digital 1.74 High-index Plastic",
                                                collection_id: 16,
                                                lens_material_id: 1,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.70 and above",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 1,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic",
                                                collection_id: 16,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                title: "Digital 1.50 Plastic Polarized",
                                                collection_id: 16,
                                                lens_material_id: 2,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "CR39",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 2,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 2,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic",
                                                collection_id: 16,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Polarized",
                                                collection_id: 16,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                title: "Digital 1.60 High-index Plastic Transitions\nSignature Gen 8",
                                                collection_id: 16,
                                                lens_material_id: 3,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi index 1.60",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 3,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic,1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 3,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic",
                                                collection_id: 16,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Polarized",
                                                collection_id: 16,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions\nXTRActive Polarized",
                                                collection_id: 16,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic SunSync /\nSunSync Drive XT",
                                                collection_id: 16,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic SunSync\nElite / SunSync Elite XT",
                                                collection_id: 16,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Transitions\nSignature GEN 8 / XTRActive",
                                                collection_id: 16,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic\nPhotoFusion",
                                                collection_id: 16,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 4,
                                                title: "Digital 1.67 High-index Plastic Sensity",
                                                collection_id: 16,
                                                lens_material_id: 4,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Hi Index 1.67",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 4,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.56 Digital Aspheric Mid-index Plastic",
                                                        lense_id: 4,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 17,
                                                        title: "BluTech Indoor",
                                                        lense_id: 4,
                                                        code_id: 17,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "MN",
                                                        price: "13.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate",
                                                collection_id: 16,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Polarized",
                                                collection_id: 16,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate SunSync / SunSync\nDrive XT",
                                                collection_id: 16,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate SunSync Elite /\nSunSync Elite XT",
                                                collection_id: 16,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions \nSignature GEN 8 / XTRActive",
                                                collection_id: 16,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Transitions\nDriveWear / XTRActive Polarized",
                                                collection_id: 16,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate PhotoFusion",
                                                collection_id: 16,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 5,
                                                title: "Digital Polycarbonate Sensity",
                                                collection_id: 16,
                                                lens_material_id: 5,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:16:11.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title:
                                                    "Polycarbonate",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 5,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 8,
                                                        title: "1.60 Digital Aspheric High-index Plastic, Trivex",
                                                        lense_id: 5,
                                                        code_id: 8,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BB",
                                                        price: "27.00",
                                                    },
                                                    {
                                                        id: 23,
                                                        title: "Photochromic",
                                                        lense_id: 5,
                                                        code_id: 23,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "add-on",
                                                        name: "PR",
                                                        price: "70.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex",
                                                collection_id: 16,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Polarized",
                                                collection_id: 16,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex SunSync / SunSync Drive \nXT / SunSync Elite / SunSync Elite XT",
                                                collection_id: 16,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Transitions Signature GEN 8\n/ XTRActive",
                                                collection_id: 16,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Transitions Vantage",
                                                collection_id: 16,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                            {
                                                id: 6,
                                                title: "Digital Trivex Sensity",
                                                collection_id: 16,
                                                lens_material_id: 6,
                                                deleted_at: null,
                                                created_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                updated_at:
                                                    "2022-09-28T05:25:36.000000Z",
                                                created_by: null,
                                                updated_by: null,
                                                deleted_by: null,
                                                lens_material_title: "Trivex",
                                                characteristics: [
                                                    {
                                                        id: 7,
                                                        title: "Digital Aspheric Plastic",
                                                        lense_id: 6,
                                                        code_id: 7,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BA",
                                                        price: "40.00",
                                                    },
                                                    {
                                                        id: 9,
                                                        title: "1.67 Digital Aspheric High-index Plastic",
                                                        lense_id: 6,
                                                        code_id: 9,
                                                        deleted_at: null,
                                                        created_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        updated_at:
                                                            "2022-09-28T05:15:13.000000Z",
                                                        created_by: null,
                                                        updated_by: null,
                                                        deleted_by: null,
                                                        type: "base",
                                                        name: "BH",
                                                        price: "56.00",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: 10,
                                title: "NeuroLens SV",
                                lens_type_id: 1,
                                created_at: "2022-09-28T05:25:38.000000Z",
                                updated_at: "2022-09-28T05:25:38.000000Z",
                                created_by: null,
                                updated_by: null,
                                deleted_by: null,
                                collections: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
};

// export const calculatorObject = {
//     statusCode: 200,
//     message: "Calculater Data",
//     data: {
//         questions: {
//             "VSP Signature": {
//                 visionPlan: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 frameBenefit: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 lensBenefit: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 materialCopay: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 frameOrder: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 copayDollarAmount: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 lensType: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 lensMaterial: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 photochromics: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 sunglassLens: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 antireflective: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 protectionPlan: {
//                     visibility: true,
//                     optional: true,
//                 },
//                 shipping: {
//                     visibility: true,
//                     optional: true,
//                 },
//             },
//         },
//         lens_types: {
//             "Single Vision": [
//                 {
//                     id: 17,
//                     title: "NeuroLens SV",
//                     brand_id: 10,
//                     created_at: "2022-09-26T19:10:07.000000Z",
//                     updated_at: "2022-09-26T19:10:07.000000Z",
//                     created_by: null,
//                     updated_by: null,
//                     deleted_by: null,
//                 },
//             ],
//         },
//         lens_material: [
//             {
//                 id: 1,
//                 title: "CR39",
//                 deleted_at: null,
//                 created_at: "2022-09-26T19:10:07.000000Z",
//                 updated_at: "2022-09-26T19:10:07.000000Z",
//                 created_by: null,
//                 updated_by: null,
//                 deleted_by: null,
//             },
//             {
//                 id: 2,
//                 title: "Polycarbonate",
//                 deleted_at: null,
//                 created_at: "2022-09-26T19:10:07.000000Z",
//                 updated_at: "2022-09-26T19:10:07.000000Z",
//                 created_by: null,
//                 updated_by: null,
//                 deleted_by: null,
//             },
//             {
//                 id: 3,
//                 title: "Trivex",
//                 deleted_at: null,
//                 created_at: "2022-09-26T19:10:07.000000Z",
//                 updated_at: "2022-09-26T19:10:07.000000Z",
//                 created_by: null,
//                 updated_by: null,
//                 deleted_by: null,
//             },
//             {
//                 id: 4,
//                 title: "Hi Index 1.67",
//                 deleted_at: null,
//                 created_at: "2022-09-26T19:10:07.000000Z",
//                 updated_at: "2022-09-26T19:10:07.000000Z",
//                 created_by: null,
//                 updated_by: null,
//                 deleted_by: null,
//             },
//             {
//                 id: 5,
//                 title: "Hi index 1.70 and above",
//                 deleted_at: null,
//                 created_at: "2022-09-26T19:10:07.000000Z",
//                 updated_at: "2022-09-26T19:10:07.000000Z",
//                 created_by: null,
//                 updated_by: null,
//                 deleted_by: null,
//             },
//             {
//                 id: 6,
//                 title: "Hi index 1.60",
//                 deleted_at: null,
//                 created_at: "2022-09-26T19:10:07.000000Z",
//                 updated_at: "2022-09-26T19:10:07.000000Z",
//                 created_by: null,
//                 updated_by: null,
//                 deleted_by: null,
//             },
//         ],
//         sheet_data: {
//             "VSP Signature": {
//                 "Single Vision": {
//                     Shamir: {
//                         "Shamir Attitude III SV": {
//                             "Digital 1.60 High-index Plastic": {
//                                 "Digital Aspheric - Plastic": {
//                                     type: "base",
//                                     code: "BA",
//                                     price: "40.00",
//                                     lens_material: "Hi index 1.60",
//                                 },
//                                 "High-index Plastic 1.53-1.60/Trivex": {
//                                     type: "base",
//                                     code: "BB",
//                                     price: "27.00",
//                                     lens_material: "Hi index 1.60",
//                                 },
//                             },
//                             "Digital 1.60 High-index Plastic Transitions Signature GEN 8 / XTRActive":
//                                 {
//                                     "Digital Aspheric - Plastic": {
//                                         type: "base",
//                                         code: "BA",
//                                         price: "40.00",
//                                         lens_material: "Hi index 1.60",
//                                     },
//                                     "High-index Plastic 1.53-1.60/Trivex": {
//                                         type: "base",
//                                         code: "BB",
//                                         price: "27.00",
//                                         lens_material: "Hi index 1.60",
//                                     },
//                                     "Photochromic-Plastic": {
//                                         type: "addon",
//                                         code: "PR",
//                                         price: "70.00",
//                                         lens_material: "Hi index 1.60",
//                                     },
//                                 },
//                             "Digital 1.60 High-index Plastic Polarized": {
//                                 "Digital Aspheric - Plastic": {
//                                     type: "base",
//                                     code: "BA",
//                                     price: "40.00",
//                                     lens_material: "Hi index 1.60",
//                                 },
//                                 "Polarized - Plastic": {
//                                     type: "base",
//                                     code: "DA",
//                                     price: "53.00",
//                                     lens_material: "Hi index 1.60",
//                                 },
//                                 "High-index Plastic 1.53-1.60/Trivex": {
//                                     type: "base",
//                                     code: "DB",
//                                     price: "70.00",
//                                     lens_material: "Hi index 1.60",
//                                 },
//                             },
//                             "Digital 1.50 Plastic": {
//                                 "Digital Aspheric - Plastic": {
//                                     type: "base",
//                                     code: "BA",
//                                     price: "40.00",
//                                     lens_material: "CR39",
//                                 },
//                             },
//                             "Digital 1.67 High-index Plastic": {
//                                 "Digital Aspheric - Plastic": {
//                                     type: "base",
//                                     code: "BA",
//                                     price: "40.00",
//                                     lens_material: "Hi Index 1.67",
//                                 },
//                                 "High-index Plastic 1.66/1.67": {
//                                     type: "base",
//                                     code: "BH",
//                                     price: "56.00",
//                                     lens_material: "Hi Index 1.67",
//                                 },
//                                 " Digital Aspheric - Plastic": {
//                                     type: "base",
//                                     code: "BA",
//                                     price: "40.00",
//                                     lens_material: "Hi Index 1.67",
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//         },
//     },
// };
