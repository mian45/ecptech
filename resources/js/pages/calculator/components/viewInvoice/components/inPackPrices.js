import React from "react";
import { InvoiceBoldSlot, InvoiceSlot } from "..";
import classes from "../styles.module.scss";

const InPackPrices = (receipt) => {
    return (
        <>
            <div className={classes["page-label"]}>Retail Fees</div>
            <InvoiceSlot
                title={"Retail fee of frame"}
                subTitle={`$${
                    receipt?.receipt?.values?.frameOrder?.retailFee || 0
                }`}
            />
            <InvoiceSlot title={"Lenses retail fee"} subTitle={"$200.00"} />
            <InvoiceBoldSlot
                title={"Total"}
                subTitle={`$${
                    receipt?.receipt?.values?.frameOrder?.retailFee + 200
                }`}
            />
        </>
    );
};

export default InPackPrices;
