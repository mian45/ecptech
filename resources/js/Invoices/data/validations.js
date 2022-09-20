import * as Yup from "yup";

const InvoiceValidation = Yup.object().shape({
    firstName: Yup.string()
        .min(3, "Must have 3 characters")
        .required("First Name is Required"),
    lastName: Yup.string()
        .min(3, "Must have 3 characters")
        .required("Last Name is Required"),
    dob: Yup.string().required("Date of Birth is Required"),
    email: Yup.string().email().required("Email is Required"),
});
export default InvoiceValidation;
