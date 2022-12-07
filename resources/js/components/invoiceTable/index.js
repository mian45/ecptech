import React from "react";
import InvoicesTableBodySlot from "./components/invoicesTableBody";
import InvoicesTableHeader from "./components/invoicesTableHeader";
import classes from "./styles.module.scss";

const InvoicesTable = ({ data }) => {
    return (
        <>
        <table className={classes["table"]}>
            <thead className={classes["table-header"]}>
                <InvoicesTableHeader />
            </thead>
            <tbody>
                {data?.map((invoice, index) => {
                    return <InvoicesTableBodySlot data={invoice} key={index} />;
                })}
            </tbody>
        </table>
            {
                data?.length <= 0 && <div className="text-center mt-5 fs-4 fw-bold">No Data Found</div>
            }
        </>
    );
};

export default InvoicesTable;
