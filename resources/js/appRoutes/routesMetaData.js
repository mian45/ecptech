import React from "react";
import {
    CREATE_INVOICE_ROUTE,
    EDIT_INSURANCE_ROUTE,
    HOME_ROUTE,
    INVOICES_ROUTE,
    LOGIN_ROUTE,
    PAYMENT_ROUTE,
    SETTINGS_ROUTE,
    SETTINGS_ROUTE_LENS,
    SETTINGS_ROUTE_DISCOUNT,
    SETTINGS_ROUTE_INSURANCE,
    SETTINGS_ROUTE_GLASSES,
    SETTINGS_ROUTE_MISC,
    SETTINGS_STAFF_SETTING,
} from "./routeConstants";
import { Redirect, Route } from "react-router-dom";
const Home = React.lazy(() => import("../pages/dashboard/index"));
const SignIn = React.lazy(() => import("../pages/auth/signIn"));
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
        path: SETTINGS_ROUTE_GLASSES,
        component: Settings,
        exact: true,
        isPrivate: true,
    },
    {
        path: SETTINGS_ROUTE_INSURANCE,
        component: Settings,
        exact: true,
        isPrivate: true,
    },
    {
        path: SETTINGS_ROUTE_LENS,
        component: Settings,
        exact: true,
        isPrivate: true,
    },
    {
        path: SETTINGS_ROUTE_DISCOUNT,
        component: Settings,
        exact: true,
        isPrivate: true,
    },
    {
        path: SETTINGS_ROUTE_MISC,
        component: Settings,
        exact: true,
        isPrivate: true,
    },
    {
        path: SETTINGS_STAFF_SETTING,
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
        component: (tempSet, templogout) => {
            return (
                <SignIn
                    tempSet={(e) => {
                        tempSet(e);
                    }}
                    templogout={templogout}
                />
            );
        },
        exact: true,
        isPrivate: false,
    },
];
