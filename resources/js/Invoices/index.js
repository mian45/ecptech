import React, { useEffect, useState } from "react";
import InvoicesForm from "../components/invoiceForm";
import classes from "./styles.module.scss";
import { Formik } from "formik";
import { InvoiceInitialValues } from "./data/initialValues";
import InvoiceValidation from "./data/validations";
import InvoicesTable from "../components/invoiceTable";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Axios from "../Http";
import { CREATE_INVOICE_ROUTE } from "../appRoutes/routeConstants";

const Invoices = ({ userId }) => {
    const [isSearched, setIsSearched] = useState(false);
    const [tableData, setTableData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (!userId) return;
        const getAllInvoices = async () => {
            const res = await Axios.get("/api/get-invoices", {
                params: { userId: userId },
            });
            setTableData(res?.data?.data);
        };
        getAllInvoices();
    }, [userId]);

    const handleClick = (values) => {
        history.push({
            pathname: CREATE_INVOICE_ROUTE,
            state: { user: values },
        });
    };
    const handleSearch = async (values) => {
        try {
            setIsSearched(true);
            const invoiceObject = {
                fname: values?.firstName,
                lname: values?.lastName,
                userId: userId,
                email: values?.email,
                phone: values?.phoneNo,
                dob: values?.dob,
            };

            const res = await Axios.post("/api/search-invoices", invoiceObject);
            setTableData(res?.data?.data);
        } catch (err) {
            setIsSearched(false);
            console.log("error while search", err);
        }
    };

    return (
        <div className={classes["root-container"]}>
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
                <div className={classes["table-container"]}>
                    <InvoicesTable data={tableData} />
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    userId: state.Auth?.user?.id,
});
export default connect(mapStateToProps)(Invoices);
