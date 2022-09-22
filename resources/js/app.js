import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import store from "./store";
import * as action from "./store/actions";
import App from "./AppRoot";

store.dispatch(action.authCheck());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
        ,
    </React.StrictMode>,
    document.getElementById("app")
);
