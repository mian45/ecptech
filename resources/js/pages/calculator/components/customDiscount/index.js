import React, { useEffect, useState } from "react";
import QuestionIcon from "../questionIcon";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/discount-icon.png";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { Col, Row } from "antd";

const CustomDiscount = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    calculatorState,
}) => {
    const history = useHistory();
    const [discount, setDiscount] = useState("");
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const editInvoiceState = history?.location?.state?.invoice;

    const getActiveDiscounts = () => {
        return (
            calculatorObj?.discount?.filter(
                (item) => item?.status === "active"
            ) || []
        );
    };
    const isSelected = getActiveDiscounts()?.filter(
        (item) => item.name === values?.discountType
    );
    useEffect(() => {
        if (editInvoiceState?.id) {
            if (values?.discountType === "" && discount === "") {
                setDiscount("");
            } else if (isSelected?.length === 0) {
                setDiscount("other");
            } else {
                setDiscount(isSelected[0]?.id);
            }
        }
    }, [history?.location?.state, isSelected, calculatorObj]);

    const handleValueChange = async (e) => {
        const removeValidations = () => {
            const validations = { ...calValidations };
            delete validations.discountValue;
            delete validations.discountType;
            setCalValidations({
                ...validations,
            });
        };

        if (e === "") {
            await setFieldValue("discountType", "");
            await setFieldValue("discountValue", "");
            removeValidations();
        } else if (e === "other") {
            await setFieldValue("discountType", "");
            await setFieldValue("discountValue", "");
            const discountValue = Yup.string().required("Discount is required");
            const discountType = Yup.string().required(
                "Discount name is required"
            );
            setCalValidations({
                ...calValidations,
                discountValue,
                discountType,
            });
        } else {
            removeValidations();
            const currentDiscount = calculatorObj?.discount?.find(
                (item) => item?.id == e
            );
            await setFieldValue("discountType", currentDiscount?.name);
            await setFieldValue("discountValue", currentDiscount?.value);
        }
    };

    const handleDiscountValueChange = (e) => {
        if (parseInt(e.target.value) > 100 || parseInt(e.target.value) < 0)
            return;
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value)) {
            handleChange(e);
        } else if (e.target.value == "") {
            handleChange(e);
        }
    };
    return (
        <Row className={classes["container"]}>
            {" "}
            <Col sx={0} sm={0} md={5}>
                <QuestionIcon
                    icon={icon}
                    active={values?.discountType && values?.discountValue}
                />{" "}
            </Col>
            <Col
                sx={24}
                sm={24}
                md={19}
                className={classes["vision-container-col"]}
            >
                <div className={classes["vision-container"]}>
                    <CalculatorHeading
                        title="Discount"
                        active={values?.discountType && values?.discountValue}
                    />
                    <select
                        placeholder="Select Discount"
                        value={discount || ""}
                        onChange={(value) => {
                            setDiscount(value.target.value);
                            handleValueChange(value.target.value);
                        }}
                        id="discountTypeDropdown"
                        name="discountTypeDropdown"
                        className={classes["discount-select"]}
                    >
                        <option value={""}>None</option>
                        {getActiveDiscounts()?.map((item, index) => {
                            return (
                                <option key={index} value={item?.id}>
                                    {item?.name || ""}
                                </option>
                            );
                        })}
                        <option value={"other"}>Other</option>
                    </select>
                    {discount === "other" && (
                        <div className={classes["discount-input-container"]}>
                            <div className={classes["discount-input-row"]}>
                                <div className={classes["input-label"]}>
                                    Discount Name
                                </div>
                                <input
                                    className={classes["input"]}
                                    type={"text"}
                                    onChange={handleChange}
                                    value={values?.discountType}
                                    id="discountType"
                                    name="discountType"
                                />

                                <FormikError name={"discountType"} />
                            </div>
                            <div className={classes["discount-input-row"]}>
                                <div className={classes["input-label"]}>
                                    Discount Percentage
                                </div>
                                <input
                                    className={classes["input"]}
                                    type={"text"}
                                    onChange={handleDiscountValueChange}
                                    value={values?.discountValue}
                                    id="discountValue"
                                    name="discountValue"
                                    step={0.01}
                                    min={0.0}
                                    max={100.0}
                                />

                                <FormikError name={"discountValue"} />
                            </div>
                        </div>
                    )}
                </div>
            </Col>
        </Row>
    );
};
export default CustomDiscount;
