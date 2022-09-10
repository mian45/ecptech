import React, { useEffect, useState } from "react";
import InvoicesForm from "../components/invoiceForm";
import classes from "./styles.module.scss";
import { Formik } from "formik";
import { InvoiceInitialValues } from "./data/initialValues";
import InvoiceValidation from "./data/validations";
import InvoicesTable from "../components/invoiceTable";
import axios from "axios";
import { connect } from "react-redux";
import { getMonth, getYear, getDate } from "date-fns";

const Invoices = ({ userId }) => {
    const [isSearched, setIsSearched] = useState(false);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const getAllInvoices = async () => {
            const res = await axios.get("/api/get_invoices", {
                params: { user_id: userId },
            });
            mapInvoicesData(res.data?.data);
        };
        getAllInvoices();
    }, []);

    const handleClick = (values) => {
        console.log("values", values);
    };
    const handleSearch = async (values) => {
        try {
            setIsSearched(true);
            const invoiceObject = {
                first_name: values?.firstName,
                last_name: values?.lastName,
                user_id: userId,
                email: values?.email,
                phone_number: values?.phoneNo,
                dob: values?.dob,
            };

            const res = await axios.post("/api/search_invoices", invoiceObject);
            mapInvoicesData(res.data?.data);
        } catch (err) {
            setIsSearched(false);
            console.log("error while search", err);
        }
    };
    const mapInvoicesData = (data) => {
        const mappedInvoices = data?.map((invoice) => {
            const createdDate = new Date(invoice?.created_at);
            const date = `${getYear(createdDate)}-${
                getMonth(createdDate) + 1
            }-${getDate(createdDate)}`;
            return {
                invoice: invoice?.name,
                customerName: invoice?.customer_name,
                email: invoice?.customer_email,
                date: date,
                price: invoice?.amount,
                status: invoice?.status,
            };
        });
        setTableData([...mappedInvoices]);
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
            <InvoicesTable data={tableData} />
        </div>
    );
};
const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
});
export default connect(mapStateToProps)(Invoices);
