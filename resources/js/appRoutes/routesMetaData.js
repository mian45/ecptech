import React from "react";
import {
    CREATE_INVOICE_ROUTE,
    HOME_ROUTE,
    INVOICES_ROUTE,
    LOGIN_ROUTE,
    PAYMENT_ROUTE,
    SETTINGS_ROUTE,
} from "./routeConstants";
import { Redirect, Route } from "react-router-dom";
const Home = React.lazy(() => import("../pages/Dashboard"));
const Login = React.lazy(() => import("../pages/Login"));
const Invoices = React.lazy(() => import("../Invoices"));
const Payment = React.lazy(() => import("../payment"));
const Seetings = React.lazy(() => import("../setting-dashboard"));
const CreateInvoice = React.lazy(() => import("../pages/calculator"));

export const allRoutes = [
    {   path: "/",
        component: ()=> <Redirect to={HOME_ROUTE} />,
        exact: true,
        isPrivate: true},
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
        path: PAYMENT_ROUTE,
        component: Payment,
        exact: true,
        isPrivate: true,
    },
    {
        path: SETTINGS_ROUTE,
        component: Seetings,
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
        component: Login,
        exact: true,
        isPrivate: false,
    },
];
