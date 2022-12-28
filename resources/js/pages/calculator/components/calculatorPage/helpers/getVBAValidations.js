export const GetVBAValidations = (data, validations) => {
    if (
        data?.question_permissions?.find((ques) => ques?.question == "Aspheric")
            ?.optional === "true"
    ) {
        validations.isAspheric = Yup.string().required("Aspheric is required");
    }
    if (
        data?.question_permissions?.find(
            (ques) => ques?.question == "Blue Protection"
        )?.optional === "true"
    ) {
        validations.isBlueProtection = Yup.string().required(
            "Blue Protection is required"
        );
    }
    if (
        data?.question_permissions?.find(
            (ques) => ques?.question == "Roll & Polish"
        )?.optional === "true"
    ) {
        validations.isRollAndPolish = Yup.string().required(
            "Roll & Polish is required"
        );
    }
    if (
        data?.question_permissions?.find(
            (ques) => ques?.question == "Licensed Specialty Enhancement"
        )?.optional === "true"
    ) {
        validations.isLicensedSpeciality = Yup.string().required(
            "Licensed Specialty Enhancement is required"
        );
    }
    if (
        data?.question_permissions?.find(
            (ques) => ques?.question == "Scratch Resistant Coatings"
        )?.optional === "true"
    ) {
        validations.isScratched = Yup.string().required(
            "Scratch Resistant Coatings is required"
        );
    }
};
