import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import AutoCompleteSelect from "../../../../components/autoCompleteSelect";
import { FormikError } from "../selectVisionPlan";
import Axios from "../../../../Http";
import { connect } from "react-redux";
import Select from "react-select";
import downArrow from "../../../../../images/down-arrow.png";
import { Col, Row } from "antd";

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
        if (userId == null) return;
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

    const handleStaffChange = async (value) => {
        const selectedStaff = staff.find((ele) => ele.name === value.value);
        await setFieldValue("staffName", value.value);
        await setFieldValue("staffId", selectedStaff?.id);
    };
    return (
        <Row className={`${classes["container"]} invoice-container`}>
            <Col className={classes["info-section"]} xs={24} md={24} lg={12}>
                <Row className={classes["row-width"]}>
                    <Col xs={24} className={classes["label"]}>
                        Invoice Name
                    </Col>
                    <Col xs={24}>
                        <AutoCompleteSelect
                            placeholder="John Doe Sunglasses"
                            options={getOptions(userInfo)}
                            className={classes["dropdown-styles"]}
                            onChange={(value) =>
                                setFieldValue("invoiceName", value)
                            }
                            value={values?.invoiceName}
                            id="invoiceName"
                            name="invoiceName"
                        />
                    </Col>
                    <Col xs={24}>
                        <FormikError name={"invoiceName"} />
                    </Col>
                </Row>
            </Col>
            <Col className={classes["info-section-1"]} xs={24} md={24} lg={12}>
                <div className={classes["label"]}>Staff Name</div>
                <Select
                    options={staffData}
                    placeholder="Select Staff Name"
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
                        DropdownIndicator: (props) => (
                            <img
                                src={downArrow}
                                className={
                                    props.selectProps.menuIsOpen
                                        ? classes["up-down-icon"]
                                        : classes["down-icon"]
                                }
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
                            width: "98%",
                        }),
                        indicatorSeparator: () => ({ display: "none" }),
                        placeholder: (defaultStyles) => {
                            return {
                                ...defaultStyles,
                                color: "#C7C7C7",
                            };
                        },
                        input: (provided) => ({
                            ...provided,
                            "& :nth-child(1)": {
                                outline: "none !important",
                                border: "none !important",
                            },
                        }),
                    }}
                />
                <FormikError name={"staffName"} />
            </Col>
        </Row>
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
