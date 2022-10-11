import React from "react";
import {
    CREATE_INVOICE_ROUTE,
    EDIT_INSURANCE_ROUTE,
    HOME_ROUTE,
    INVOICES_ROUTE,
    LOGIN_ROUTE,
    PAYMENT_ROUTE,
    SETTINGS_ROUTE,
} from "./routeConstants";
import { Redirect, Route } from "react-router-dom";
const Home = React.lazy(() => import("../pages/dashboard"));
const signIn = React.lazy(() => import("../pages/auth/signIn"));
const Invoices = React.lazy(() => import("../Invoices"));
const Payment = React.lazy(() => import("../payment"));
const Settings = React.lazy(() => import("../setting-dashboard"));
const CreateInvoice = React.lazy(() => import("../pages/calculator"));
const EditInsurance = React.lazy(() =>
    import("../InsurancePlans/EditInsurance")
);
export const allRoutes = [
    {
        path: "/",
        component: () => <Redirect to={HOME_ROUTE} />,
        exact: true,
        isPrivate: true,
    },
    {
        path: HOME_ROUTE,
        component: Home,
        exact: true,
        isPrivate: true,
    },
    {
        path: INVOICES_ROUTE,
        component: Invoices,
        exact: true,
        isPrivate: true,
    },
    {
        path: EDIT_INSURANCE_ROUTE,
        component: EditInsurance,
        exact: true,
        isPrivate: true,
    },
    {
        path: PAYMENT_ROUTE,
        component: Payment,
        exact: true,
        isPrivate: true,
    },
    {
        path: SETTINGS_ROUTE,
        component: Settings,
        exact: true,
        isPrivate: true,
    },
    {
        path: CREATE_INVOICE_ROUTE,
        component: CreateInvoice,
        exact: true,
        isPrivate: true,
    },
    {
        path: LOGIN_ROUTE,
        component: signIn,
        exact: true,
        isPrivate: false,
    },
];
