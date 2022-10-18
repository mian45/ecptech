import React from "react";
import { InvoiceBoldSlot, InvoiceSlot } from "..";
import classes from "../styles.module.scss";

const InPackPrices = ({ receipt, calculatorObj, lensPrices }) => {
    const getLensRetailFee = () => {
        let price = 0;
        price =
            price +
            parseFloat(
                getPrivatePayLensPices(calculatorObj, receipt, lensPrices)
            );
        price =
            price +
            parseFloat(
                getPrivatePayMaterialPices(calculatorObj, receipt, lensPrices)
            );
        return (price || 0).toFixed(2);
    };
    return (
        <>
            <div className={classes["page-label"]}>Retail Fees</div>
            <InvoiceSlot
                title={"Retail fee of frame"}
                subTitle={`$${receipt?.values?.frameOrder?.retailFee || 0}`}
            />
            <InvoiceSlot
                title={"Lenses retail fee"}
                subTitle={`$${getLensRetailFee() || 0}`}
            />
            <InvoiceBoldSlot
                title={"Total"}
                subTitle={`$${
                    receipt?.values?.frameOrder?.retailFee +
                    (getLensRetailFee() || 0)
                }`}
            />
        </>
    );
};

export default InPackPrices;
