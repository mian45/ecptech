import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import AutoCompleteSelect from "../../../../components/autoCompleteSelect";
import { FormikError } from "../selectVisionPlan";
import Axios from "../../../../Http";
import { connect } from "react-redux";

const InvoiceInfo = ({ formProps, userId }) => {
    const { values, setFieldValue, handleBlur } = formProps;
    const [staff, setStaff] = useState([]);
    const [staffData, setStaffData] = useState([]);

    useEffect(() => {
        const getStaffList = async () => {
            try {
                const res = await Axios.post("/api/getStaff", {
                    userId: userId,
                });
                const resData = res?.data?.data;
                setStaff(resData);
                const mappedData = resData.map((value) => {
                    return { value: value?.name };
                });
                setStaffData([...mappedData]);
            } catch (err) {
                console.log("error while getting staff");
            }
        };
        getStaffList();
    }, []);

    const handleStaffChange = (value) => {
        const selectedStaff = staff.find((ele) => ele.name === value);
        setFieldValue("staffName", value);
        setFieldValue("staffId", selectedStaff?.id);
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["info-section"]}>
                <div className={classes["label"]}>Invoice Name</div>
                <AutoCompleteSelect
                    placeholder="John Doe Sunglasses"
                    options={[]}
                    className={classes["dropdown-styles"]}
                    onBlur={handleBlur}
                    onChange={(value) => setFieldValue("invoiceName", value)}
                    value={values?.invoiceName}
                    id="invoiceName"
                    name="invoiceName"
                />
                <FormikError name={"invoiceName"} />
            </div>
            <div className={classes["info-section"]}>
                <div className={classes["label"]}>Staff Name</div>
                <AutoCompleteSelect
                    options={staffData}
                    placeholder="Select Staff Name"
                    className={classes["dropdown-styles"]}
                    onBlur={handleBlur}
                    onChange={handleStaffChange}
                    value={values?.staffName}
                    id="staffName"
                    name="staffName"
                />
                <FormikError name={"staffName"} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
});
export default connect(mapStateToProps)(InvoiceInfo);

const NAME_OPTIONS = [{ value: "John Doe" }, { value: "David Joe" }];
const INVOICE_NAME_OPTIONS = [
    { value: "John Doe Lens" },
    { value: "David Joe Frame" },
    { value: "John Doe Lens 1" },
    { value: "David Joe Frame 1" },
    { value: "John Doe Lens 2" },
    { value: "David Joe Frame 2" },
    { value: "John Doe Lens 3" },
    { value: "David Joe Frame 3" },
    { value: "John Doe Lens4" },
    { value: "David Joe Frame 4" },
];
