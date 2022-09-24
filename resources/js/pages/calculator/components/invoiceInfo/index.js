import React from "react";
import classes from "./styles.module.scss";
import AutoCompleteSelect from "../../../../components/autoCompleteSelect";
import { FormikError } from "../selectVisionPlan";

const InvoiceInfo = ({ formProps }) => {
    const { values, setFieldValue, handleBlur } = formProps;
    return (
        <div className={classes["container"]}>
            <div className={classes["info-section"]}>
                <div className={classes["label"]}>Invoice Name</div>
                <AutoCompleteSelect
                    placeholder="John Doe Sunglasses"
                    options={INVOICE_NAME_OPTIONS}
                    className={classes["dropdown-styles"]}
                    onBlur={handleBlur}
                    onChange={(value) => setFieldValue("invoiceName", value)}
                    value={values?.invoiceName}
                    id="invoiceName"
                    name="invoiceName"
                />
                <FormikError name={"invoiceName"} />
            </div>
            <div className={classes["info-section"]}>
                <div className={classes["label"]}>Staff Name</div>
                <AutoCompleteSelect
                    options={NAME_OPTIONS}
                    placeholder="Select Staff Name"
                    className={classes["dropdown-styles"]}
                    onBlur={handleBlur}
                    onChange={(value) => setFieldValue("staffName", value)}
                    value={values?.staffName}
                    id="staffName"
                    name="staffName"
                />
                <FormikError name={"staffName"} />
            </div>
        </div>
    );
};

export default InvoiceInfo;

const NAME_OPTIONS = [{ value: "John Doe" }, { value: "David Joe" }];
const INVOICE_NAME_OPTIONS = [
    { value: "John Doe Lens" },
    { value: "David Joe Frame" },
    { value: "John Doe Lens 1" },
    { value: "David Joe Frame 1" },
    { value: "John Doe Lens 2" },
    { value: "David Joe Frame 2" },
    { value: "John Doe Lens 3" },
    { value: "David Joe Frame 3" },
    { value: "John Doe Lens4" },
    { value: "David Joe Frame 4" },
];
