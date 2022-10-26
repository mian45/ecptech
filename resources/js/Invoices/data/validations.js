import * as Yup from "yup";

const InvoiceValidation = Yup.object().shape({
    firstName: Yup.string()
        .min(3, "Please provide a valid First Name.")
        .required("Please provide a valid First Name."),
    lastName: Yup.string()
        .min(3, "Please provide a valid Last Name.")
        .required("Please provide a valid Last Name."),
    dob: Yup.string().required(" Please provide valid Date of Birth."),
    email: Yup.string().email().required("Please provide a valid Email."),
});
export default InvoiceValidation;
