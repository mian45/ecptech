import React from "react";
import CustomSelect from "../../../../components/customSelect";
import classes from "./styles.module.scss";

const InvoiceInfo = ({ formProps }) => {
    const { values, handleChange, handleBlur } = formProps;
    return (
        <div className={classes["container"]}>
            <div className={classes["info-section"]}>
                <div className={classes["label"]}>Invoice Name</div>
                <CustomSelect
                    options={INVOICE_NAME_OPTIONS}
                    placeholder="John Doe Sunglasses"
                />
            </div>
            <div className={classes["info-section"]}>
                <div className={classes["label"]}>Staff Name</div>
                <CustomSelect
                    options={NAME_OPTIONS}
                    placeholder="Select Staff Name"
                />
            </div>
        </div>
    );
};

export default InvoiceInfo;

const NAME_OPTIONS = {
    john_doe: "John Doe",
    david_joe: "David Joe",
};
const INVOICE_NAME_OPTIONS = {
    john_doe_lens: "John Doe Lens",
    david_joe_frame: "David Joe Frame",
};
