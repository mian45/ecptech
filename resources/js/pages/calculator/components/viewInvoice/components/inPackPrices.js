import React from "react";
import {
    getPrivatePayGlasses,
    getPrivatePayLensPices,
    getPrivatePayMaterialPices,
    InvoiceBoldSlot,
    InvoiceSlot,
} from "..";
import { BenifitTypeEnums } from "../../../data/initialValues";
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
        if (receipt?.values?.photochromics?.status === "Yes") {
            price =
                price +
                parseFloat(
                    getPrivatePayPhotochromic(
                        receipt?.values?.photochromics?.type,
                        calculatorObj
                    )
                );
        } else {
            price = price + 0;
        }

        if (receipt?.values?.antiReflectiveProperties?.status === "Yes") {
            const total = getPrivatePayAntireflective(
                receipt?.values?.antiReflectiveProperties?.type,
                calculatorObj
            );
            price = price + (total || 0);
        } else {
            price = price + 0;
        }
        price = price + getPrivatePayGlasses(receipt, calculatorObj);

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
                    parseFloat(receipt?.values?.frameOrder?.retailFee || 0) +
                    parseFloat(getLensRetailFee() || 0)
                }`}
            />
        </>
    );
};

export default InPackPrices;
