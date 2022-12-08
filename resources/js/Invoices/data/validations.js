import * as Yup from "yup";

const InvoiceValidation = Yup.object().shape({
    email: Yup.string().email().required("Please provide a valid Email."),
    dob: Yup.string().required(" Please provide valid Date of Birth."),
    lastName: Yup.string()
        .required("Please provide a valid Last Name.")
        .min(3, "The last name must be at least 3 characters."),
    firstName: Yup.string()
        .required("Please provide a valid First Name.")
        .min(3, "The first name must be at least 3 characters."),
});
export default InvoiceValidation;
