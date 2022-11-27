import React, { useEffect, useState } from "react";
import { CollectionSlot } from "../lensesType";
import classes from "./styles.module.scss";
import Axios from "../../../../../../Http";
import { connect } from "react-redux";
import { Row, Col, message } from "antd";
const MaterialSettings = ({ userId }) => {
    const [lensesMaterialApi, lensesMaterialHolder] = message.useMessage();
    let [materials, setMaterials] = useState([]);
    useEffect(() => {
        const getMaterialSettings = async () => {
            try {
                const res = await Axios.get(
                    `${process.env.MIX_REACT_APP_URL}/api/lense-material-settings`,
                    {
                        params: { userId: userId },
                    }
                );

                setMaterials(res.data.data || []);
            } catch (err) {
                console.log("error while get lenses", err);
                lensesMaterialApi.open({
                    type: "error",
                    content: err.message,
                    duration: 5,
                    style: {
                        marginTop: "13.5vh",
                    },
                });
            }
        };
        getMaterialSettings();
    }, [userId]);

    const handleCheckbox = (value, collection) => {
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
        try {
            const payload = {
                data: [...materials],
            };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/add-lense-material-setting`,
                payload
            );
            lensesMaterialApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                style: {
                    marginTop: "13.5vh",
                },
            });
        } catch (err) {
            console.log("error while update lenses");
            lensesMaterialHolder.open({
                type: err.message,
                content: err,
                duration: 5,
                style: {
                    marginTop: "13.5vh",
                },
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
                <Col xs={24} className={classes["sub-container"]}>
                    <Row justify="center" align="middle">
                        <Col xs={24} className={classes["material-label"]}>
                            Lens Material
                        </Col>
                        {materials?.map((item, index) => {
                            return (
                                <CollectionSlot
                                    key={index}
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
