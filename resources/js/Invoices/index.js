import React, { useState } from "react";
import InvoicesForm from "../components/invoiceForm";
import classes from "./styles.module.scss";
import { Formik } from "formik";
import { InvoiceInitialValues } from "./data/initialValues";
import InvoiceValidation from "./data/validations";
import InvoicesTable from "../components/invoiceTable";

const Invoices = () => {
    const [isSearched, setIsSearched] = useState(false);
    const handleClick = (values) => {
        console.log("values", values);
    };
    const handleSearch = (values) => {
        try {
            setIsSearched(true);
            console.log("searched values", values);
        } catch (err) {
            setIsSearched(false);
            console.log("error while search", err);
        }
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["title"]}>Invoices</div>
            <Formik
                initialValues={InvoiceInitialValues}
                validationSchema={InvoiceValidation}
                onSubmit={handleClick}
            >
                {(formProps) => {
                    return (
                        <form
                            onSubmit={formProps.handleSubmit}
                            autoComplete="off"
                        >
                            <InvoicesForm
                                handleSearch={handleSearch}
                                formProps={formProps}
                                isSearched={isSearched}
                            />
                        </form>
                    );
                }}
            </Formik>
            <InvoicesTable />
        </div>
    );
};
export default Invoices;
