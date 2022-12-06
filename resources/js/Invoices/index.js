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
    const handleSearchValidation = async (formProps) => {
        const { values, setFieldError, setTouched } = formProps;

        if (values.firstName) {
            await setFieldError("firstName", "");
            await setFieldError("lastName", "");
            await setFieldError("dob", "");
            await setFieldError("email", "");
            await setFieldError("phoneNo", "");
            await setTouched(
                { firstName, lastName, dob, phoneNo, email },
                false
            );
            return true;
        } else if (values.phoneNo) {
            await setFieldError("firstName", "");
            await setFieldError("lastName", "");
            await setFieldError("dob", "");
            await setFieldError("email", "");
            await setFieldError("phoneNo", "");
            await setTouched(
                { firstName, lastName, dob, phoneNo, email },
                false
            );
            return true;
        } else if (values.email) {
            await setFieldError("firstName", "");
            await setFieldError("lastName", "");
            await setFieldError("dob", "");
            await setFieldError("email", "");
            await setFieldError("phoneNo", "");
            await setTouched(
                { firstName, lastName, dob, phoneNo, email },
                false
            );
            return true;
        } else if (values.dob) {
            await setFieldError("firstName", "");
            await setFieldError("lastName", "");
            await setFieldError("dob", "");
            await setFieldError("email", "");
            await setFieldError("phoneNo", "");
            await setTouched(
                { firstName, lastName, dob, phoneNo, email },
                false
            );
            return true;
        } else if (values.lastName) {
            await setFieldError("firstName", "");
            await setFieldError("lastName", "");
            await setFieldError("dob", "");
            await setFieldError("email", "");
            await setFieldError("phoneNo", "");
            await setTouched(
                { firstName, lastName, dob, phoneNo, email },
                false
            );
            return true;
        } else {
            return false;
        }
    };
    const handleSearch = async (formProps) => {
        const { values, setFieldError, setTouched } = formProps;
        let clientId = userId;
        if (userRole === "staff") {
            clientId = clientUserId;
        }
        try {
            const isError = await handleSearchValidation(formProps);
            if (!isError) {
                await setFieldError(
                    "firstName",
                    "Please provide a valid First Name"
                );
                await setTouched({ firstName }, true);

                return;
            }
            const invoiceObject = {
                firstName: values?.firstName,
                lastName: values?.lastName,
                userId: clientId,
                email: values?.email,
                phoneNo: values?.phoneNo,
                dob: values?.dob,
            };

            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/search-invoices`,
                invoiceObject
            );
            setTableData(res?.data?.data);
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: "custom-postion",
            });
            setButtonLoader(false);
        } catch (err) {
            console.log("error while search", err);
            if (err.response.data.message == "Validation Errors") {
                await setFieldError(
                    "firstName",
                    "One of the field is required"
                );
                await setTouched({}, true);
            } else {
                messageApi.open({
                    type: "error",
                    content: err.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
            }
            setButtonLoader(false);
        }
    };
    const isSubmitCase = (formProps) => {
        const { values } = formProps;

        if (
            values?.firstName &&
            values?.lastName &&
            values?.dob &&
            values?.email
        ) {
            return true;
        }
        return false;
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
