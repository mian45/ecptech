import React, { useEffect, useState } from "react";
import { CollectionSlot } from "../lensesType";
import classes from "./styles.module.scss";
import Axios from "../../../../../../Http";
import { connect } from "react-redux";
import { Row, Col, message } from "antd";
const MaterialSettings = ({ userId,plan }) => {
    const [lensesMaterialApi, lensesMaterialHolder] = message.useMessage();
    const [isChange, setIsChange] = useState(false);
    let [materials, setMaterials] = useState([]);
    useEffect(() => {
        if (userId == null) return;
        getMaterialSettings();
    }, [userId,plan]);
    const getMaterialSettings = async () => {
        try {
            const res = await Axios.get(
                `${process.env.MIX_REACT_APP_URL}/api/lense-material-settings`,
                {
                    params: { userId: userId,plan:plan },
                }
            );

            setMaterials(res.data.data[plan] || []);
        } catch (err) {
            console.log("error while get lenses", err);
            lensesMaterialApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
            });
        }
    };
    const handleCheckbox = (value, collection) => {
        setIsChange(true);
        const newData = materials.map((item, index) => {
            if (item.id === collection.id) {
                return { ...item, status: value ? "active" : "inactive" };
            } else {
                return item;
            }
        });
        setMaterials(newData);
    };
    const handleDisplayNameChange = (value, collection) => {
        setIsChange(true);
        const newData = materials.map((item, index) => {
            if (item.id === collection.id) {
                return { ...item, display_name: value };
            } else {
                return item;
            }
        });
        setMaterials(newData);
    };
    const handleAmountNameChange = (value, collection) => {
        setIsChange(true);
        const newData = materials.map((item, index) => {
            if (item.id === collection.id) {
                return { ...item, price: value };
            } else {
                return item;
            }
        });
        setMaterials(newData);
    };
    const submitMaterialSettings = async () => {
        setIsChange(false);
        try {
            const payload = {
                data:{
                    [`${plan}`]: [...materials]
                },
            };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/add-lense-material-setting`,
                payload
            );
            message.destroy();
            lensesMaterialApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: "custom-postion",
            });
        } catch (err) {
            console.log("error while update lenses");
            message.destroy();
            lensesMaterialHolder.open({
                type: err.message,
                content: err,
                duration: 5,
                className: "custom-postion-error",
            });
        }
    };
    return (
        <>
            <Row
                className={classes["container"]}
                justify="center"
                align="middle"
            >
                <div>{lensesMaterialHolder}</div>
                <Col xs={24} md={16} className={classes["sub-container"]}>
                    <Row justify="center" align="middle">
                        <Col
                            xs={21}
                            md={21}
                            className={classes["material-label"]}
                        >
                            Lens Material
                        </Col>
                        {materials?.map((item, index) => {
                            return (
                                <CollectionSlot
                                    key={index}
                                    id={index}
                                    handleCheckbox={handleCheckbox}
                                    handleDisplayNameChange={
                                        handleDisplayNameChange
                                    }
                                    handleAmountNameChange={
                                        handleAmountNameChange
                                    }
                                    collection={{
                                        ...item,
                                        custom_price: item?.price,
                                        title: item?.lens_material_title,
                                    }}
                                    prompt="Click to edit name of lens material that calculator displays"
                                />
                            );
                        })}
                    </Row>
                </Col>
            </Row>
            <Row className={classes["save-button-wrapper"]}>
                <Col xs={24}>
                    <button
                        className={classes["save-button"]}
                        onClick={submitMaterialSettings}
                        disabled={!isChange}
                    >
                        Save
                    </button>
                </Col>
            </Row>
        </>
    );
};
const mapStateToProps = (state) => ({
    userId: state.Auth?.user?.id,
});
export default connect(mapStateToProps)(MaterialSettings);
