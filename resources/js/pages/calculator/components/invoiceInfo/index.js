import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import AutoCompleteSelect from "../../../../components/autoCompleteSelect";
import { FormikError } from "../selectVisionPlan";
import Axios from "../../../../Http";
import { connect } from "react-redux";
import Select from "react-select";
import downArrow from "../../../../../images/down-arrow.png";

const InvoiceInfo = ({
    formProps,
    userId,
    userInfo,
    clientUserId,
    userRole,
}) => {
    const { values, setFieldValue, handleBlur } = formProps;
    const [staff, setStaff] = useState([]);
    const [staffData, setStaffData] = useState([]);
    useEffect(() => {
        if (!userId) return;
        const getStaffList = async () => {
            try {
                let clientId = userId;
                if (userRole === "staff") {
                    clientId = clientUserId;
                }
                const res = await Axios.post(
                    `${process.env.MIX_REACT_APP_URL}/api/getStaff`,
                    {
                        userId: clientId,
                    }
                );
                const resData = res?.data?.data;
                setStaff(resData);
                const mappedData = resData.map((value) => {
                    return { value: value?.name, label: value?.name };
                });
                setStaffData([...mappedData]);
            } catch (err) {
                console.log("error while getting staff");
            }
        };
        getStaffList();
    }, [userId]);

    const handleStaffChange = (value) => {
        const selectedStaff = staff.find((ele) => ele.name === value.value);
        setFieldValue("staffName", value.value);
        setFieldValue("staffId", selectedStaff?.id);
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["info-section"]}>
                <div className={classes["label"]}>Invoice Name</div>
                <AutoCompleteSelect
                    placeholder="John Doe Sunglasses"
                    options={getOptions(userInfo)}
                    className={classes["dropdown-styles"]}
                    onBlur={handleBlur}
                    onChange={(value) => setFieldValue("invoiceName", value)}
                    value={values?.invoiceName}
                    id="invoiceName"
                    name="invoiceName"
                />
                <FormikError name={"invoiceName"} />
            </div>
            <div className={classes["info-section-1"]}>
                <div className={classes["label"]}>Staff Name</div>
                <Select
                    options={staffData}
                    placeholder="Select Staff Name"
                    onBlur={handleBlur}
                    onChange={handleStaffChange}
                    value={
                        values.staffName && {
                            value: values.staffName || "",
                            label: values.staffName || "",
                        }
                    }
                    id="staffName"
                    name="staffName"
                    components={{
                        DropdownIndicator: () => (
                            <img
                                src={downArrow}
                                className={classes["down-icon"]}
                            />
                        ),
                        IndicatorSeparator: () => null,
                    }}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            borderRadius: 23,
                            border: "1px solid #dfdfdf",
                            height: 45,
                            width: 375,
                        }),
                        indicatorSeparator: () => ({ display: "none" }),
                        placeholder: (defaultStyles) => {
                            return {
                                ...defaultStyles,
                                color: "#C7C7C7",
                            };
                        },
                    }}
                />
                <FormikError name={"staffName"} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
    userRole: state.Auth.userRole?.name,
    clientUserId: state.Auth.clientUser?.id,
});
export default connect(mapStateToProps)(InvoiceInfo);

const getOptions = (userInfo) => {
    return [
        {
            value: `${userInfo?.firstName || ""} ${
                userInfo?.lastName || ""
            } Sunglasses`,
        },
        {
            value: `${userInfo?.firstName || ""} ${
                userInfo?.lastName || ""
            }  Lenses`,
        },
        {
            value: `${userInfo?.firstName || ""} ${
                userInfo?.lastName || ""
            } Frame order`,
        },
    ];
};

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
