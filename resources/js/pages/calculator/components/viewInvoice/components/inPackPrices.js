import React from "react";
import { InvoiceBoldSlot, InvoiceSlot } from "..";
import classes from "../styles.module.scss";

const InPackPrices = (receipt) => {
    return (
        <>
            <div className={classes["page-label"]}>Retail Fees</div>
            <InvoiceSlot
                title={"Retail fee of frame"}
                subTitle={`${receipt?.values?.frameOrder?.retailFee || 0}`}
            />
            <InvoiceSlot title={"Lenses retail fee"} subTitle={"$902.00"} />
            <InvoiceBoldSlot
                title={"Total"}
                subTitle={`$${
                    (receipt?.values?.frameOrder?.retailFee || 0) + 200
                }`}
            />
        </>
    );
};

export default InPackPrices;
