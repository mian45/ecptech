import React, { useEffect, useState } from "react";
import InvoicesForm from "../components/invoiceForm";
import classes from "./styles.module.scss";
import { Formik } from "formik";
import { InvoiceInitialValues } from "./data/initialValues";
import InvoiceValidation from "./data/validations";
import InvoicesTable from "../components/invoiceTable";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { useHistory } from "react-router";
import Axios from "../Http";
import { CREATE_INVOICE_ROUTE } from "../appRoutes/routeConstants";

const Invoices = ({ userId }) => {
    const [isSearched, setIsSearched] = useState(false);
    const [tableData, setTableData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const getAllInvoices = async () => {
            const res = await Axios.get("/api/invoices", {
                params: { user_id: userId },
            });
            mapInvoicesData(res.data?.data);
        };
        getAllInvoices();
    }, []);

    const handleClick = (values) => {
        history.push({
            pathname: CREATE_INVOICE_ROUTE,
            state: values,
        });
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

            const res = await Axios.post("/api/search-invoices", invoiceObject);
            mapInvoicesData(res.data?.data);
        } catch (err) {
            setIsSearched(false);
            console.log("error while search", err);
        }
    };
    const mapInvoicesData = (data) => {
        const mappedInvoices = data?.map((invoice) => {
            const createdDate = new Date(invoice?.created_at);
            const date = `${dayjs(createdDate).get("year")}-${
                dayjs(createdDate).get("month") + 1
            }-${dayjs(createdDate).get("date")}`;
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
    userId: state.Auth.user?.id,
});
export default connect(mapStateToProps)(Invoices);
