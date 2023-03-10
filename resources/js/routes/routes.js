import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Archive from "../pages/Archive";
import NoMatch from "../pages/NoMatch";
import SideBar from "../Side-bar";

const routes = [
    {
        path: "/",
        exact: true,
        auth: true,
        component: SideBar,
        fallback: SideBar,
    },
    {
        path: "/login",
        exact: true,
        auth: false,
        component: Login,
    },
    {
        path: "/register",
        exact: true,
        auth: false,
        component: Register,
    },
    {
        path: "/forgot-password",
        exact: true,
        auth: false,
        component: ForgotPassword,
    },
    {
        path: "/reset-password",
        exact: true,
        auth: false,
        component: ResetPassword,
    },
    {
        path: "/archive",
        exact: true,
        auth: true,
        component: Archive,
    },
    {
        path: "",
        exact: false,
        auth: false,
        component: NoMatch,
    },
];

export default routes;
