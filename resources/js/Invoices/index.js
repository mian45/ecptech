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
import CustomLoader from "../../js/components/customLoader/index";
import { message } from "antd";

const Invoices = ({ userId, clientUserId, userRole }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isSearched, setIsSearched] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (userId == null) return;
        const getAllInvoices = async () => {
            setLoading(true);
            let clientId = userId;
            if (userRole === "staff") {
                clientId = clientUserId;
            }
            const res = await Axios.get(
                process.env.MIX_REACT_APP_URL + "/api/get-invoices",
                {
                    params: { userId: clientId },
                }
            );
            setTableData(res?.data?.data);
            setLoading(false);
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
        let clientId = userId;
        if (userRole === "staff") {
            clientId = clientUserId;
        }
        try {
            setIsSearched(true);
            const invoiceObject = {
                fname: values?.firstName,
                lname: values?.lastName,
                userId: clientId,
                email: values?.email,
                phone: values?.phoneNo,
                dob: values?.dob,
            };

            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/search-invoices`,
                invoiceObject
            );
            setTableData(res?.data?.data);
            message.destroy();
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: "custom-postion",
            });
            setButtonLoader(false);
        } catch (err) {
            setIsSearched(false);
            console.log("error while search", err);
            message.destroy();
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
            });
            setButtonLoader(false);
        }
    };

    return loading == true ? (
        <CustomLoader buttonBool={false} />
    ) : (
        <div className={classes["root-container"]}>
            <div className={classes["container"]}>
                <div>{contextHolder}</div>
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
                                    setIsSearched={setIsSearched}
                                />
                            </form>
                        );
                    }}
                </Formik>
                <div className={classes["table-container"]}>
                    {loading == true ? (
                        <CustomLoader buttonBool={false} />
                    ) : (
                        <InvoicesTable data={tableData} />
                    )}
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    userId: state.Auth?.user?.id,
    userRole: state.Auth.userRole?.name,
    clientUserId: state.Auth.clientUser?.id,
});
export default connect(mapStateToProps)(Invoices);
