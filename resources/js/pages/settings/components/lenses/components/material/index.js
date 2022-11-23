import React, { useEffect, useState } from "react";
import { CollectionSlot } from "../lensesType";
import classes from "./styles.module.scss";
import Axios from "../../../../../../Http";
import { connect } from "react-redux";
import { Row, Col } from "antd";
const MaterialSettings = ({ userId }) => {
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
            await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/add-lense-material-setting`,
                payload
            );
        } catch (err) {
            console.log("error while update lenses");
        }
    };
    return (
        <>
            <Row
                className={classes["container"]}
                justify="center"
                align="middle"
            >
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
